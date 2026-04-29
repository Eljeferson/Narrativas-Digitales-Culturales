import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class VocationAnalyzer:
    def __init__(self):
        # Perfiles vocacionales definidos por palabras clave y descripciones
        self.profiles = [
            {
                "id": "ambientalista",
                "name": "Guardián de la Naturaleza",
                "description": "Tienes una conexión profunda con la tierra, las plantas y los animales. Te apasiona proteger el equilibrio natural.",
                "keywords": "naturaleza bosque animales río tierra plantas semillas cultivo montaña selva preservar ecología ambiente",
                "careers": ["Ingeniería Ambiental", "Biología", "Agronomía", "Gestión de Recursos Naturales"]
            },
            {
                "id": "ingeniero",
                "name": "Arquitecto de Soluciones",
                "description": "Tu mente se enfoca en cómo funcionan las cosas, en construir herramientas y resolver problemas técnicos complejos.",
                "keywords": "construir herramientas puentes máquinas tecnología sistema estructura metal piedra ingenio diseño funcional",
                "careers": ["Ingeniería Civil", "Ingeniería Mecánica", "Arquitectura", "Ingeniería de Sistemas"]
            },
            {
                "id": "lider",
                "name": "Líder Comunitario",
                "description": "Te interesas por la gente, la organización de la comunidad y la justicia social. Sabes guiar a los demás hacia un bien común.",
                "keywords": "pueblo comunidad justicia líder asamblea ayudar organización derechos respeto familia tradición guiar",
                "careers": ["Derecho", "Sociología", "Ciencias Políticas", "Trabajo Social"]
            },
            {
                "id": "artista",
                "name": "Explorador Creativo",
                "description": "Ves el mundo a través de los colores, los sonidos y las emociones. Te apasiona la expresión estética y cultural.",
                "keywords": "música colores pintura danza cantar arte belleza imaginación sueño historia mito fantasía expresión",
                "careers": ["Artes Visuales", "Literatura", "Diseño Gráfico", "Gestión Cultural"]
            },
            {
                "id": "historiador",
                "name": "Cronista del Tiempo",
                "description": "Amas las raíces, los antepasados y la preservación de la memoria histórica. Eres el puente entre el pasado y el futuro.",
                "keywords": "abuelos pasado historia ancestros reliquia arqueología tiempo memoria raíces origen leyenda tradición",
                "careers": ["Antropología", "Arqueología", "Historia", "Museología"]
            }
        ]
        
        # Preparar los textos de los perfiles para el vectorizador
        self.profile_texts = [p["keywords"] + " " + p["description"] for p in self.profiles]
        self.vectorizer = TfidfVectorizer(stop_words=None) # Stopwords se manejarán mejor en producción
        self.tfidf_matrix = self.vectorizer.fit_transform(self.profile_texts)

    def analyze_story(self, text: str):
        if not text or len(text.strip()) < 10:
            return {
                "error": "El texto es demasiado corto para realizar un análisis preciso."
            }

        # Vectorizar el texto del alumno
        story_vector = self.vectorizer.transform([text.lower()])
        
        # Calcular similitud de coseno con cada perfil
        similarities = cosine_similarity(story_vector, self.tfidf_matrix)[0]
        
        # Obtener el índice del perfil más similar
        best_match_idx = np.argmax(similarities)
        score = float(similarities[best_match_idx])
        
        # Si la similitud es muy baja, retornar un perfil general
        if score < 0.05:
            return {
                "passion": "Buscador de Caminos",
                "description": "Aún estás explorando tus intereses. ¡Sigue escribiendo para descubrir tu verdadera pasión!",
                "score": score,
                "suggested_careers": ["Humanidades", "Estudios Generales"]
            }

        best_profile = self.profiles[best_match_idx]
        
        return {
            "passion": best_profile["name"],
            "description": best_profile["description"],
            "score": score,
            "suggested_careers": best_profile["careers"],
            "category_id": best_profile["id"]
        }
