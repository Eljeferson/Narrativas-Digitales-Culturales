import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class VocationAnalyzer:
    def __init__(self):
        # Perfiles vocacionales basados en una adaptación del modelo RIASEC para contextos culturales
        self.profiles = [
            {
                "id": "ambientalista",
                "name": "Guardián de la Naturaleza",
                "description": "Tienes una conexión profunda con la tierra y el medio ambiente. Te apasiona proteger el equilibrio natural y los recursos de tu comunidad.",
                "keywords": "naturaleza bosque animales río tierra plantas semillas cultivo montaña selva preservar ecología ambiente biodiversidad clima suelo siembra cosecha",
                "careers": {
                    "professional": ["Ingeniería Ambiental", "Biología Marina", "Ingeniería Agrónoma", "Ingeniería Forestal"],
                    "technical": ["Técnico en Manejo de Suelos", "Técnico Forestal", "Guía de Ecoturismo", "Técnico Agropecuario"],
                    "others": ["Guardaparque", "Agricultor Orgánico", "Gestor de Viveros Comunitarios"]
                }
            },
            {
                "id": "ingeniero",
                "name": "Arquitecto de Soluciones",
                "description": "Tu mente se enfoca en cómo funcionan las cosas, en construir herramientas y resolver problemas técnicos complejos.",
                "keywords": "construir herramientas puentes máquinas tecnología sistema estructura metal piedra ingenio diseño funcional mecánica electricidad software computación",
                "careers": {
                    "professional": ["Ingeniería Civil", "Ingeniería Mecánica", "Ingeniería de Sistemas", "Arquitectura"],
                    "technical": ["Técnico en Construcción Civil", "Mecánica Automotriz", "Electricista Industrial", "Programación de Software"],
                    "others": ["Maestro de Obra", "Operador de Maquinaria Pesada", "Artesano Metalúrgico"]
                }
            },
            {
                "id": "lider",
                "name": "Líder Comunitario",
                "description": "Te interesas por la organización de la comunidad y la justicia social. Sabes guiar a los demás hacia un bien común.",
                "keywords": "pueblo comunidad justicia líder asamblea ayudar organización derechos respeto familia tradición guiar política sindicato defensa diálogo",
                "careers": {
                    "professional": ["Derecho", "Sociología", "Ciencias Políticas", "Trabajo Social"],
                    "technical": ["Gestión Pública", "Administración de Cooperativas", "Técnico en Seguridad Ciudadana"],
                    "others": ["Dirigente Vecinal", "Mediador Comunitario", "Promotor Social"]
                }
            },
            {
                "id": "artista",
                "name": "Explorador Creativo",
                "description": "Ves el mundo a través de los colores, los sonidos y las emociones. Te apasiona la expresión estética y cultural.",
                "keywords": "música colores pintura danza cantar arte belleza imaginación sueño historia mito fantasía expresión teatro cine diseño visual escultura",
                "careers": {
                    "professional": ["Artes Visuales", "Literatura", "Diseño Gráfico", "Comunicación Audiovisual"],
                    "technical": ["Diseño de Modas", "Producción Musical", "Técnico en Fotografía", "Artesanía Contemporánea"],
                    "others": ["Músico Tradicional", "Pintor Muralista", "Tejedor de Arte Textil", "Danzante"]
                }
            },
            {
                "id": "historiador",
                "name": "Cronista del Tiempo",
                "description": "Amas las raíces, los antepasados y la preservación de la memoria histórica. Eres el puente entre el pasado y el futuro.",
                "keywords": "abuelos pasado historia ancestros reliquia arqueología tiempo memoria raíces origen leyenda tradición archivo museo excavación patrimonio",
                "careers": {
                    "professional": ["Antropología", "Arqueología", "Historia", "Museología"],
                    "technical": ["Guía Oficial de Turismo", "Técnico en Conservación de Bienes Muebles", "Gestión Documental"],
                    "others": ["Bibliotecario Comunitario", "Investigador Local", "Protector de Sitios Arqueológicos"]
                }
            },
            {
                "id": "bienestar",
                "name": "Gestor de Bienestar",
                "description": "Tienes una vocación innata para cuidar de los demás, sanar y promover la salud física y mental.",
                "keywords": "salud medicina médico enfermera sanar plantas medicinales cuidado vida bienestar prevención nutrición psicología alivio terapia cuerpo",
                "careers": {
                    "professional": ["Medicina Humana", "Psicología", "Nutrición", "Enfermería"],
                    "technical": ["Técnico en Enfermería", "Técnico en Laboratorio Clínico", "Fisioterapia y Rehabilitación"],
                    "others": ["Sanador Tradicional", "Promotor de Salud Comunitario", "Partera Tradicional"]
                }
            },
            {
                "id": "emprendedor",
                "name": "Emprendedor de Raíces",
                "description": "Ves oportunidades donde otros ven problemas. Te gusta gestionar proyectos, vender ideas y crear valor económico.",
                "keywords": "negocio vender empresa mercado dinero inversión proyecto gestión cliente producto exportar feria emprendimiento comercio finanzas",
                "careers": {
                    "professional": ["Administración de Empresas", "Economía", "Negocios Internacionales", "Marketing"],
                    "technical": ["Contabilidad", "Administración Bancaria", "Logística", "Gestión de Ventas"],
                    "others": ["Comerciante", "Exportador de Productos Locales", "Gestor de Emprendimientos Rurales"]
                }
            },
            {
                "id": "educador",
                "name": "Maestro del Conocimiento",
                "description": "Te apasiona compartir lo que sabes y ayudar a otros a aprender. Crees en el poder de la educación para transformar vidas.",
                "keywords": "enseñar aprender escuela libros clase conocimiento explicar infancia futuro pedagogía formación lengua lectura investigación",
                "careers": {
                    "professional": ["Educación Primaria", "Educación Secundaria", "Pedagogía", "Ciencias de la Educación"],
                    "technical": ["Auxiliar de Educación", "Técnico en Educación Inicial", "Capacitador Técnico"],
                    "others": ["Instructor de Oficios", "Sabio de la Comunidad (Amauta)", "Alfabetizador"]
                }
            }
        ]
        
        # Preparar los textos de los perfiles para el vectorizador
        self.profile_texts = [p["keywords"] + " " + p["description"] for p in self.profiles]
        self.vectorizer = TfidfVectorizer(stop_words=None) 
        self.tfidf_matrix = self.vectorizer.fit_transform(self.profile_texts)

    def calculate_precision_metrics(self, similarities):
        # El nivel de precisión se basa en qué tan dominante es el mejor perfil frente al resto
        sorted_sims = np.sort(similarities)[::-1]
        best_score = sorted_sims[0]
        second_best = sorted_sims[1] if len(sorted_sims) > 1 else 0
        
        # Margen de confianza: diferencia entre el primero y el segundo
        confidence_margin = best_score - second_best
        
        # Exactitud: Basada en el valor absoluto de la similitud
        # Normalizamos a un rango de 0-100%
        accuracy = min(1.0, best_score * 2.5) * 100 # Multiplicador para dar peso a similitudes TF-IDF bajas
        
        # Precisión (Confianza): Qué tan seguro está el modelo de que es ESE perfil y no otro
        precision = min(1.0, confidence_margin * 5) * 100
        
        return round(accuracy, 2), round(precision, 2)

    def analyze_story(self, text: str):
        if not text or len(text.strip()) < 10:
            return {
                "error": "El texto es demasiado corto para realizar un análisis preciso."
            }

        # Vectorizar el texto del alumno
        story_vector = self.vectorizer.transform([text.lower()])
        
        # Calcular similitud de coseno con cada perfil
        similarities = cosine_similarity(story_vector, self.tfidf_matrix)[0]
        
        # Obtener métricas de precisión
        accuracy, precision = self.calculate_precision_metrics(similarities)
        
        # Obtener el índice del perfil más similar
        best_match_idx = np.argmax(similarities)
        score = float(similarities[best_match_idx])
        
        # Si la similitud es muy baja, retornar un perfil general
        if score < 0.04: # Umbral ajustado para mayor cobertura
            return {
                "passion": "Buscador de Caminos",
                "description": "Aún estás explorando tus intereses. ¡Sigue escribiendo para descubrir tu verdadera pasión!",
                "score": score,
                "accuracy": accuracy,
                "precision": precision,
                "suggested_careers": {
                    "professional": ["Humanidades", "Estudios Generales"],
                    "technical": ["Asistente Administrativo"],
                    "others": ["Explorador de Opciones"]
                }
            }

        best_profile = self.profiles[best_match_idx]
        
        return {
            "passion": best_profile["name"],
            "description": best_profile["description"],
            "score": score,
            "accuracy": accuracy,
            "precision": precision,
            "suggested_careers": best_profile["careers"],
            "category_id": best_profile["id"]
        }
