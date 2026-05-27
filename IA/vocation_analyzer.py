import re
import unicodedata
from collections import Counter
from math import log, sqrt

try:
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics.pairwise import cosine_similarity
except ModuleNotFoundError:
    TfidfVectorizer = None
    cosine_similarity = None


class SimpleTfidfVectorizer:
    def __init__(self):
        self.vocabulary = set()
        self.idf = {}

    def _tokens(self, text):
        words = re.findall(r"\b\w+\b", text.lower())
        bigrams = [f"{words[i]} {words[i + 1]}" for i in range(len(words) - 1)]
        return words + bigrams

    def fit_transform(self, documents):
        tokenized_documents = [self._tokens(document) for document in documents]
        document_count = len(tokenized_documents)
        document_frequency = Counter()

        for tokens in tokenized_documents:
            document_frequency.update(set(tokens))
            self.vocabulary.update(tokens)

        self.idf = {
            term: log((1 + document_count) / (1 + document_frequency[term])) + 1
            for term in self.vocabulary
        }

        return [self._vectorize_tokens(tokens) for tokens in tokenized_documents]

    def transform(self, documents):
        return [self._vectorize_tokens(self._tokens(document)) for document in documents]

    def _vectorize_tokens(self, tokens):
        counts = Counter(token for token in tokens if token in self.vocabulary)
        total = sum(counts.values()) or 1
        return {
            term: (count / total) * self.idf.get(term, 0.0)
            for term, count in counts.items()
        }


def simple_cosine_similarity(query_vectors, matrix_vectors):
    results = []

    for query_vector in query_vectors:
        query_norm = sqrt(sum(value * value for value in query_vector.values())) or 1.0
        row = []
        for matrix_vector in matrix_vectors:
            matrix_norm = sqrt(sum(value * value for value in matrix_vector.values())) or 1.0
            common_terms = set(query_vector).intersection(matrix_vector)
            dot_product = sum(query_vector[term] * matrix_vector[term] for term in common_terms)
            row.append(dot_product / (query_norm * matrix_norm))
        results.append(row)

    return results


class VocationAnalyzer:
    def __init__(self):
        self.model_version = "CulturaStory-ML-TFIDF-v2"
        self.minimum_score = 0.035
        self.profiles = [
            {
                "id": "ambientalista",
                "name": "Guardián de la Naturaleza",
                "description": "Tienes una conexión profunda con la tierra y el medio ambiente. Te apasiona proteger el equilibrio natural y los recursos de tu comunidad.",
                "keywords": "naturaleza bosque animales río tierra plantas semillas cultivo montaña selva preservar ecología ambiente biodiversidad clima suelo siembra cosecha agua lluvia comunidad territorio chacra",
                "careers": {
                    "professional": ["Ingeniería Ambiental", "Biología Marina", "Ingeniería Agrónoma", "Ingeniería Forestal"],
                    "technical": ["Técnico en Manejo de Suelos", "Técnico Forestal", "Guía de Ecoturismo", "Técnico Agropecuario"],
                    "others": ["Guardaparque", "Agricultor Orgánico", "Gestor de Viveros Comunitarios"],
                },
            },
            {
                "id": "ingeniero",
                "name": "Arquitecto de Soluciones",
                "description": "Tu mente se enfoca en cómo funcionan las cosas, en construir herramientas y resolver problemas técnicos complejos.",
                "keywords": "construir herramientas puentes máquinas tecnología sistema estructura metal piedra ingenio diseño funcional mecánica electricidad software computación resolver problema inventar medir calcular prototipo",
                "careers": {
                    "professional": ["Ingeniería Civil", "Ingeniería Mecánica", "Ingeniería de Sistemas", "Arquitectura"],
                    "technical": ["Técnico en Construcción Civil", "Mecánica Automotriz", "Electricista Industrial", "Programación de Software"],
                    "others": ["Maestro de Obra", "Operador de Maquinaria Pesada", "Artesano Metalúrgico"],
                },
            },
            {
                "id": "lider",
                "name": "Líder Comunitario",
                "description": "Te interesas por la organización de la comunidad y la justicia social. Sabes guiar a los demás hacia un bien común.",
                "keywords": "pueblo comunidad justicia líder asamblea ayudar organización derechos respeto familia tradición guiar política sindicato defensa diálogo acuerdo consejo autoridad comunal bien común participar",
                "careers": {
                    "professional": ["Derecho", "Sociología", "Ciencias Políticas", "Trabajo Social"],
                    "technical": ["Gestión Pública", "Administración de Cooperativas", "Técnico en Seguridad Ciudadana"],
                    "others": ["Dirigente Vecinal", "Mediador Comunitario", "Promotor Social"],
                },
            },
            {
                "id": "artista",
                "name": "Explorador Creativo",
                "description": "Ves el mundo a través de los colores, los sonidos y las emociones. Te apasiona la expresión estética y cultural.",
                "keywords": "música colores pintura danza cantar arte belleza imaginación sueño historia mito fantasía expresión teatro cine diseño visual escultura cajón quena dibujo mural tejido crear escena emoción",
                "careers": {
                    "professional": ["Artes Visuales", "Literatura", "Diseño Gráfico", "Comunicación Audiovisual"],
                    "technical": ["Diseño de Modas", "Producción Musical", "Técnico en Fotografía", "Artesanía Contemporánea"],
                    "others": ["Músico Tradicional", "Pintor Muralista", "Tejedor de Arte Textil", "Danzante"],
                },
            },
            {
                "id": "historiador",
                "name": "Cronista del Tiempo",
                "description": "Amas las raíces, los antepasados y la preservación de la memoria histórica. Eres el puente entre el pasado y el futuro.",
                "keywords": "abuelos pasado historia ancestros reliquia arqueología tiempo memoria raíces origen leyenda tradición archivo museo excavación patrimonio crónica testimonio recordar conservar oralidad identidad",
                "careers": {
                    "professional": ["Antropología", "Arqueología", "Historia", "Museología"],
                    "technical": ["Guía Oficial de Turismo", "Técnico en Conservación de Bienes Muebles", "Gestión Documental"],
                    "others": ["Bibliotecario Comunitario", "Investigador Local", "Protector de Sitios Arqueológicos"],
                },
            },
            {
                "id": "bienestar",
                "name": "Gestor de Bienestar",
                "description": "Tienes una vocación innata para cuidar de los demás, sanar y promover la salud física y mental.",
                "keywords": "salud medicina médico enfermera sanar plantas medicinales cuidado vida bienestar prevención nutrición psicología alivio terapia cuerpo acompañar curar herida familia proteger",
                "careers": {
                    "professional": ["Medicina Humana", "Psicología", "Nutrición", "Enfermería"],
                    "technical": ["Técnico en Enfermería", "Técnico en Laboratorio Clínico", "Fisioterapia y Rehabilitación"],
                    "others": ["Sanador Tradicional", "Promotor de Salud Comunitario", "Partera Tradicional"],
                },
            },
            {
                "id": "emprendedor",
                "name": "Emprendedor de Raíces",
                "description": "Ves oportunidades donde otros ven problemas. Te gusta gestionar proyectos, vender ideas y crear valor económico.",
                "keywords": "negocio vender empresa mercado dinero inversión proyecto gestión cliente producto exportar feria emprendimiento comercio finanzas administrar organizar intercambio turismo producción",
                "careers": {
                    "professional": ["Administración de Empresas", "Economía", "Negocios Internacionales", "Marketing"],
                    "technical": ["Contabilidad", "Administración Bancaria", "Logística", "Gestión de Ventas"],
                    "others": ["Comerciante", "Exportador de Productos Locales", "Gestor de Emprendimientos Rurales"],
                },
            },
            {
                "id": "educador",
                "name": "Maestro del Conocimiento",
                "description": "Te apasiona compartir lo que sabes y ayudar a otros a aprender. Crees en el poder de la educación para transformar vidas.",
                "keywords": "enseñar aprender escuela libros clase conocimiento explicar infancia futuro pedagogía formación lengua lectura investigación maestro estudiante aula compartir orientar sabio amauta",
                "careers": {
                    "professional": ["Educación Primaria", "Educación Secundaria", "Pedagogía", "Ciencias de la Educación"],
                    "technical": ["Auxiliar de Educación", "Técnico en Educación Inicial", "Capacitador Técnico"],
                    "others": ["Instructor de Oficios", "Sabio de la Comunidad (Amauta)", "Alfabetizador"],
                },
            },
        ]

        self.profile_texts = [self._build_profile_text(profile) for profile in self.profiles]
        if TfidfVectorizer:
            self.vectorizer = TfidfVectorizer(
                strip_accents="unicode",
                lowercase=True,
                ngram_range=(1, 2),
                min_df=1,
                sublinear_tf=True,
            )
        else:
            self.vectorizer = SimpleTfidfVectorizer()
        self.tfidf_matrix = self.vectorizer.fit_transform(self.profile_texts)

    def _build_profile_text(self, profile):
        return " ".join(
            [
                profile["name"],
                profile["description"],
                profile["keywords"],
                profile["keywords"],
                " ".join(profile["careers"]["professional"]),
                " ".join(profile["careers"]["technical"]),
                " ".join(profile["careers"]["others"]),
            ]
        )

    def _normalize_text(self, text):
        normalized = unicodedata.normalize("NFKD", text or "")
        normalized = "".join(char for char in normalized if not unicodedata.combining(char))
        normalized = normalized.lower()
        normalized = re.sub(r"[^a-záéíóúñü0-9\s-]", " ", normalized)
        normalized = re.sub(r"\s+", " ", normalized).strip()
        return normalized

    def _extract_matched_terms(self, normalized_text, profile, limit=8):
        profile_terms = self._normalize_text(profile["keywords"]).split()
        seen = set()
        matches = []

        for term in profile_terms:
            if len(term) < 4 or term in seen:
                continue
            if re.search(rf"\b{re.escape(term)}\b", normalized_text):
                seen.add(term)
                matches.append(term)
            if len(matches) >= limit:
                break

        return matches

    def _calculate_metrics(self, similarities):
        sorted_sims = sorted(similarities, reverse=True)
        best_score = float(sorted_sims[0])
        second_best = float(sorted_sims[1]) if len(sorted_sims) > 1 else 0.0
        confidence_margin = max(0.0, best_score - second_best)

        accuracy = min(100.0, (best_score / 0.32) * 100)
        precision = min(100.0, (confidence_margin / 0.18) * 100)

        if best_score >= 0.22 and precision < 45:
            precision = min(100.0, precision + 12)

        return round(accuracy, 2), round(precision, 2), round(confidence_margin, 4)

    def _build_top_matches(self, similarities, normalized_text, limit=3):
        ranked_indexes = sorted(range(len(similarities)), key=lambda index: similarities[index], reverse=True)[:limit]
        matches = []

        for index in ranked_indexes:
            profile = self.profiles[index]
            matches.append(
                {
                    "category_id": profile["id"],
                    "passion": profile["name"],
                    "score": round(float(similarities[index]), 4),
                    "matched_terms": self._extract_matched_terms(normalized_text, profile),
                }
            )

        return matches

    def analyze_story(self, text: str):
        normalized_text = self._normalize_text(text)
        if len(normalized_text) < 10:
            return {
                "error": "El texto es demasiado corto para realizar un análisis preciso.",
                "model_version": self.model_version,
            }

        story_vector = self.vectorizer.transform([normalized_text])
        if cosine_similarity:
            similarities = list(cosine_similarity(story_vector, self.tfidf_matrix)[0])
        else:
            similarities = simple_cosine_similarity(story_vector, self.tfidf_matrix)[0]

        best_match_idx = max(range(len(similarities)), key=lambda index: similarities[index])
        score = float(similarities[best_match_idx])
        accuracy, precision, confidence_margin = self._calculate_metrics(similarities)
        top_matches = self._build_top_matches(similarities, normalized_text)

        if score < self.minimum_score:
            return {
                "passion": "Buscador de Caminos",
                "description": "Aún estás explorando tus intereses. Sigue escribiendo para que el modelo encuentre señales vocacionales más claras.",
                "score": round(score, 4),
                "accuracy": accuracy,
                "precision": precision,
                "confidence_margin": confidence_margin,
                "model_version": self.model_version,
                "explanation": "La narrativa tiene pocas coincidencias fuertes con los perfiles vocacionales configurados.",
                "matched_terms": [],
                "top_matches": top_matches,
                "suggested_careers": {
                    "professional": ["Humanidades", "Estudios Generales"],
                    "technical": ["Asistente Administrativo"],
                    "others": ["Explorador de Opciones"],
                },
            }

        best_profile = self.profiles[best_match_idx]
        matched_terms = self._extract_matched_terms(normalized_text, best_profile)
        explanation = (
            "La predicción se basa en coincidencias semánticas entre la narrativa y el perfil "
            f"{best_profile['name']}."
        )
        if matched_terms:
            explanation += " Términos relevantes detectados: " + ", ".join(matched_terms[:5]) + "."

        return {
            "passion": best_profile["name"],
            "description": best_profile["description"],
            "score": round(score, 4),
            "accuracy": accuracy,
            "precision": precision,
            "confidence_margin": confidence_margin,
            "model_version": self.model_version,
            "explanation": explanation,
            "matched_terms": matched_terms,
            "top_matches": top_matches,
            "suggested_careers": best_profile["careers"],
            "category_id": best_profile["id"],
        }
