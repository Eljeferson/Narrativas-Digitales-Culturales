-- ============================================================
--  CulturaStory AI — Base de Datos COMPLETA
--  Alineada con: 21 HUs · 5 Épicas · 3 PMVs · 5 OEs
--  Spring Boot (Hexagonal) · Angular · Supabase PostgreSQL
-- ============================================================
--
--  COBERTURA POR HISTORIA DE USUARIO:
--  HU-01  crear narrativa con IA + selector cultura    → narrativas_culturales, ai_conversations, ai_messages
--  HU-02  grabar relato oral + transcripción (STT)    → audio_recordings (tipo=speech_to_text)
--  HU-03  ilustraciones IA por cultura                → storyboard_frames, ai_image_requests
--  HU-04  convertir narrativa a audio (TTS)           → audio_recordings (tipo=text_to_speech)
--  HU-05  storyboard digital exportable               → storyboard_frames, storyboard_exports
--  HU-06  registro y perfil de autor                  → usuarios, autores_estudiante
--  HU-07  login con Supabase Auth                     → usuarios (gestionado por Supabase Auth)
--  HU-08  gestionar usuarios y roles                  → usuarios, rol_change_log
--  HU-09  listado de estudiantes del grado            → usuarios, autores_estudiante
--  HU-10  listar narrativas por docente               → narrativas_culturales, docente_seguimiento
--  HU-11  comentarios y retroalimentación docente     → comentarios_narrativa
--  HU-12  aprobar/rechazar narrativas                 → publication_requests, narrativas_culturales.estado
--  HU-13  dashboard de participación creativa         → creative_activity_log, dashboard_stats (vista)
--  HU-14  explorar biblioteca pública filtrada        → narrativas_culturales (FTS), nlp_classifications
--  HU-15  publicar narrativa + reconocimiento         → publication_requests, badges_estudiante
--  HU-16  exportar catálogo cultural NLP              → nlp_classifications, catalogo_exports
--  HU-17  reproducir audio narrado desde repositorio  → audio_recordings, narrativas_culturales
--  HU-18  arquitectura hexagonal (puertos/adaptadores)→ (documentación técnica, no requiere tabla extra)
--  HU-19  Docker Compose local                        → (infraestructura, no requiere tabla extra)
--  HU-20  pruebas escolares en aula                   → pruebas_piloto, feedback_usuarios
--  HU-21  despliegue con URL pública                  → deployment_log
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "unaccent";  -- para búsqueda sin tildes

-- ============================================================
--  PMV 1 — FUNDAMENTOS DEL DOMINIO CULTURAL
--  OE1: Modelar dominio · OE4: Arquitectura hexagonal
--  Entregables: S2 análisis · S4 modelo DDD · S6 hex arch · S8 CRUD + auth
-- ============================================================

-- ── 1. usuarios ─────────────────────────────────────────────
--  HU-06 (registro/perfil) · HU-07 (login) · HU-08 (gestión roles)
--  Puerto: UsuarioRepositoryPort
CREATE TABLE usuarios (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    email       TEXT        NOT NULL UNIQUE,
    rol         TEXT        NOT NULL CHECK (rol IN ('estudiante', 'docente', 'comunidad', 'administrador')),
    activo      BOOLEAN     NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE  usuarios        IS '[HU-06,07,08] Actores del sistema. id sincronizado con Supabase Auth uid.';
COMMENT ON COLUMN usuarios.rol    IS 'estudiante | docente | comunidad | administrador';
COMMENT ON COLUMN usuarios.activo IS 'Suspender acceso sin eliminar registro (HU-08).';

-- ── 2. autores_estudiante ───────────────────────────────────
--  HU-06 (perfil autor) · HU-09 (listado estudiantes por docente)
--  Entidad DDD: AutorEstudiante (OE1)
--  Puerto: AutorRepositoryPort
CREATE TABLE autores_estudiante (
    id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID        NOT NULL UNIQUE REFERENCES usuarios(id) ON DELETE CASCADE,
    nombre_completo  TEXT        NOT NULL,
    grado            TEXT        NOT NULL,
    institucion      TEXT,                       -- para filtrado docente (HU-09)
    region_cultural  TEXT        NOT NULL,       -- andina | amazónica | afroperuana | costeña
    lengua_materna   TEXT,
    bio              TEXT,
    foto_perfil_url  TEXT,
    narrativas_publicadas INTEGER NOT NULL DEFAULT 0,  -- contador desnormalizado (HU-15)
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE  autores_estudiante                    IS '[HU-06,09,15] Perfil extendido del estudiante-autor. Entidad DDD AutorEstudiante.';
COMMENT ON COLUMN autores_estudiante.region_cultural    IS 'Cultura local principal del autor: andina | amazónica | afroperuana | costeña.';
COMMENT ON COLUMN autores_estudiante.narrativas_publicadas IS '[HU-15] Contador para badge Autor Publicado.';

-- ── 3. narrativas_culturales ────────────────────────────────
--  HU-01 (crear narrativa) · HU-10 (listar por docente) · HU-12 (aprobar/rechazar)
--  HU-14 (explorar biblioteca) · HU-15 (publicar) · HU-17 (audio)
--  Entidad DDD central: NarrativaCultural (OE1) — Puerto: NarrativaRepositoryPort
CREATE TABLE narrativas_culturales (
    id                    UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo                TEXT        NOT NULL,
    contenido             TEXT        NOT NULL DEFAULT '',
    region_cultural       TEXT        NOT NULL,
    tipo_relato           TEXT        NOT NULL CHECK (tipo_relato IN ('leyenda', 'mito', 'cuento', 'testimonio', 'otro')),
    estado                TEXT        NOT NULL DEFAULT 'borrador'
                                      CHECK (estado IN ('borrador', 'en_revision', 'aprobada', 'rechazada', 'publicada')),
    -- Relaciones de dominio
    autor_id              UUID        NOT NULL REFERENCES autores_estudiante(id) ON DELETE CASCADE,
    docente_id            UUID        REFERENCES usuarios(id) ON DELETE SET NULL,
    aprobada_por          UUID        REFERENCES usuarios(id) ON DELETE SET NULL,
    -- Campos culturales (OE1, OE5)
    dedicatoria           TEXT,
    nota_curatorial       TEXT,
    comentario_pedagogico TEXT,       -- visión general del docente (HU-10)
    -- Métricas repositorio (HU-14, HU-15)
    destacada             BOOLEAN     NOT NULL DEFAULT FALSE,
    veces_vista           INTEGER     NOT NULL DEFAULT 0,
    fecha_publicacion     TIMESTAMPTZ,
    -- Full-text search PostgreSQL (HU-14, OE5)
    search_vector         TSVECTOR,
    created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE  narrativas_culturales               IS '[HU-01,10,12,14,15,17] Entidad central. Entidad DDD NarrativaCultural (OE1).';
COMMENT ON COLUMN narrativas_culturales.estado        IS 'Flujo: borrador→en_revision→aprobada/rechazada→publicada (HU-12).';
COMMENT ON COLUMN narrativas_culturales.search_vector IS '[HU-14] Índice FTS actualizado por trigger (título+contenido+región).';

CREATE INDEX idx_narrativas_autor     ON narrativas_culturales(autor_id);
CREATE INDEX idx_narrativas_docente   ON narrativas_culturales(docente_id);
CREATE INDEX idx_narrativas_estado    ON narrativas_culturales(estado);
CREATE INDEX idx_narrativas_region    ON narrativas_culturales(region_cultural);
CREATE INDEX idx_narrativas_tipo      ON narrativas_culturales(tipo_relato);
CREATE INDEX idx_narrativas_fts       ON narrativas_culturales USING GIN(search_vector);

-- Trigger: updated_at automático
CREATE OR REPLACE FUNCTION fn_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;
CREATE TRIGGER trg_narrativas_updated_at
BEFORE UPDATE ON narrativas_culturales
FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

-- Trigger: search_vector (título peso A, contenido peso B, región peso C)
CREATE OR REPLACE FUNCTION fn_narrativas_search_vector()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.search_vector :=
        setweight(to_tsvector('spanish', unaccent(COALESCE(NEW.titulo, ''))), 'A') ||
        setweight(to_tsvector('spanish', unaccent(COALESCE(NEW.region_cultural, ''))), 'B') ||
        setweight(to_tsvector('spanish', unaccent(COALESCE(NEW.tipo_relato, ''))), 'B') ||
        setweight(to_tsvector('spanish', unaccent(COALESCE(NEW.contenido, ''))), 'C');
    RETURN NEW;
END;
$$;
CREATE TRIGGER trg_narrativas_fts
BEFORE INSERT OR UPDATE ON narrativas_culturales
FOR EACH ROW EXECUTE FUNCTION fn_narrativas_search_vector();

-- ── 4. rol_change_log ───────────────────────────────────────
--  HU-08: log de cambios de rol con fecha y responsable
CREATE TABLE rol_change_log (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id      UUID        NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    rol_anterior    TEXT        NOT NULL,
    rol_nuevo       TEXT        NOT NULL,
    cambiado_por    UUID        NOT NULL REFERENCES usuarios(id),
    motivo          TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE rol_change_log IS '[HU-08] Auditoría de cambios de rol por el administrador.';

-- ── 5. comentarios_narrativa ────────────────────────────────
--  HU-11: comentarios del docente con fragmento de texto resaltado
--  Puerto: ComentarioRepositoryPort
CREATE TABLE comentarios_narrativa (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    narrativa_id    UUID        NOT NULL REFERENCES narrativas_culturales(id) ON DELETE CASCADE,
    docente_id      UUID        NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    fragmento       TEXT,                   -- texto seleccionado por el docente
    posicion_inicio INTEGER,               -- offset en el contenido
    posicion_fin    INTEGER,
    comentario      TEXT        NOT NULL,
    leido           BOOLEAN     NOT NULL DEFAULT FALSE,  -- para notificación al estudiante
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE  comentarios_narrativa           IS '[HU-11] Retroalimentación del docente con referencia al fragmento.';
COMMENT ON COLUMN comentarios_narrativa.leido     IS '[HU-11] FALSE = notificación pendiente al estudiante.';

CREATE INDEX idx_comentarios_narrativa ON comentarios_narrativa(narrativa_id);
CREATE INDEX idx_comentarios_leido     ON comentarios_narrativa(leido) WHERE leido = FALSE;

-- ── 6. notificaciones ───────────────────────────────────────
--  HU-11 (nuevo comentario) · HU-12 (resultado aprobación) · HU-15 (publicación)
CREATE TABLE notificaciones (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id      UUID        NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    tipo            TEXT        NOT NULL,   -- 'comentario' | 'aprobacion' | 'rechazo' | 'publicacion' | 'badge'
    titulo          TEXT        NOT NULL,
    mensaje         TEXT        NOT NULL,
    referencia_id   UUID,                  -- id de narrativa, solicitud, etc.
    leida           BOOLEAN     NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE notificaciones IS '[HU-11,12,15] Centro de notificaciones del sistema.';
CREATE INDEX idx_notif_usuario ON notificaciones(usuario_id, leida);


-- ============================================================
--  PMV 2 — ASISTENTE IA CREATIVO + MULTIMEDIA
--  OE2: herramientas narrativa digital · OE3: IA generativa
--  Entregables: S10 AI Adapter · S12 Media Adapter + analítica
--  Puertos hexagonales: AIPort · MediaPort · AnalyticsPort
-- ============================================================

-- ── 7. ai_conversations ─────────────────────────────────────
--  HU-01 (esquema narrativo IA) · HU-03 (personajes/escenarios)
--  Entidad: AIConversation — Puerto: AIPort (OE3, OE4)
CREATE TABLE ai_conversations (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    narrativa_id    UUID        NOT NULL REFERENCES narrativas_culturales(id) ON DELETE CASCADE,
    modelo_usado    TEXT        NOT NULL DEFAULT 'gpt-4o',   -- openai | gemini | open-source
    proposito       TEXT        NOT NULL CHECK (proposito IN (
                        'esquema_narrativo',    -- HU-01: generar esquema inicial
                        'sugerencia_personajes',-- HU-01/03: personajes y escenarios
                        'mejora_texto',         -- asistencia en escritura
                        'clasificacion_nlp'     -- HU-16: NLP automático
                    )),
    tokens_usados   INTEGER,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE  ai_conversations            IS '[HU-01,03,16] Sesión con la API LLM. Adaptador hexagonal: AIAdapter → AIPort (OE3,OE4).';
COMMENT ON COLUMN ai_conversations.proposito  IS 'Diferencia el tipo de llamada IA para métricas y debug.';

-- ── 8. ai_messages ──────────────────────────────────────────
--  Mensajes del hilo de conversación (compatible con OpenAI/Gemini format)
CREATE TABLE ai_messages (
    id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id  UUID        NOT NULL REFERENCES ai_conversations(id) ON DELETE CASCADE,
    rol              TEXT        NOT NULL CHECK (rol IN ('user', 'assistant', 'system')),
    contenido        TEXT        NOT NULL,
    timestamp        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE ai_messages IS '[HU-01,03] Mensajes del pipeline LLM, alineados con formato OpenAI/Gemini.';
CREATE INDEX idx_ai_messages_conv ON ai_messages(conversation_id);

-- ── 9. ai_image_requests ────────────────────────────────────
--  HU-03: ilustraciones generadas por IA por cultura
--  Puerto: AIPort (generación de imagen)
CREATE TABLE ai_image_requests (
    id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    narrativa_id     UUID        NOT NULL REFERENCES narrativas_culturales(id) ON DELETE CASCADE,
    frame_id         UUID        REFERENCES storyboard_frames(id) ON DELETE SET NULL,
    prompt_enviado   TEXT        NOT NULL,
    imagen_url       TEXT,
    estado           TEXT        NOT NULL DEFAULT 'pendiente'
                                 CHECK (estado IN ('pendiente', 'generando', 'listo', 'error')),
    intentos         INTEGER     NOT NULL DEFAULT 0,
    error_mensaje    TEXT,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE ai_image_requests IS '[HU-03,05] Solicitudes de generación de imágenes. Puerto: AIPort (OE3).';

-- ── 10. audio_recordings ────────────────────────────────────
--  HU-02: Speech-to-Text (relato oral → texto)
--  HU-04: Text-to-Speech (narrativa → audio narrado)
--  HU-17: reproducir audio desde repositorio
--  Puerto: MediaPort (OE3, OE4)
CREATE TABLE audio_recordings (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    narrativa_id        UUID        NOT NULL REFERENCES narrativas_culturales(id) ON DELETE CASCADE,
    autor_id            UUID        NOT NULL REFERENCES autores_estudiante(id) ON DELETE CASCADE,
    audio_url           TEXT        NOT NULL,           -- Supabase Storage
    transcripcion       TEXT,                           -- resultado STT (HU-02)
    duracion_segundos   INTEGER,
    tipo                TEXT        NOT NULL CHECK (tipo IN ('speech_to_text', 'text_to_speech')),
    precision_stt       FLOAT,                          -- HU-02: ≥ 80% precisión
    voz_seleccionada    TEXT,                           -- HU-04: masculina | femenina
    publico             BOOLEAN     NOT NULL DEFAULT FALSE,  -- HU-17: visible en repositorio
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE  audio_recordings              IS '[HU-02,04,17] Grabaciones STT y audio TTS. MediaAdapter → MediaPort (OE3).';
COMMENT ON COLUMN audio_recordings.precision_stt IS '[HU-02] Criterio aceptación: ≥ 80% precisión.';
COMMENT ON COLUMN audio_recordings.publico       IS '[HU-17] Habilitar reproducción pública en repositorio.';

CREATE INDEX idx_audio_narrativa ON audio_recordings(narrativa_id);
CREATE INDEX idx_audio_publico   ON audio_recordings(publico) WHERE publico = TRUE;

-- ── 11. storyboard_frames ───────────────────────────────────
--  HU-05: storyboard digital con imágenes IA, exportable como PDF
--  Puerto: MediaPort / AIPort
CREATE TABLE storyboard_frames (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    narrativa_id        UUID        NOT NULL REFERENCES narrativas_culturales(id) ON DELETE CASCADE,
    orden               INTEGER     NOT NULL,
    imagen_url          TEXT,
    prompt_usado        TEXT,
    texto_escena        TEXT,
    estado_generacion   TEXT        NOT NULL DEFAULT 'pendiente'
                                    CHECK (estado_generacion IN ('pendiente', 'generando', 'listo', 'error')),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (narrativa_id, orden)
);
COMMENT ON TABLE  storyboard_frames          IS '[HU-05] Viñetas del storyboard digital. HU-05: mínimo 4 viñetas por narrativa.';
COMMENT ON COLUMN storyboard_frames.orden    IS 'Posición de la viñeta (1-based). La UI Angular permite reordenar.';

-- ── 12. storyboard_exports ──────────────────────────────────
--  HU-05: criterio de aceptación — exportable como PDF
CREATE TABLE storyboard_exports (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    narrativa_id    UUID        NOT NULL REFERENCES narrativas_culturales(id) ON DELETE CASCADE,
    autor_id        UUID        NOT NULL REFERENCES autores_estudiante(id) ON DELETE CASCADE,
    pdf_url         TEXT        NOT NULL,    -- Supabase Storage
    total_frames    INTEGER     NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE storyboard_exports IS '[HU-05] PDF exportado del storyboard. Criterio CA3: exportable como PDF.';

-- ── 13. creative_activity_log ───────────────────────────────
--  HU-13: dashboard docente — participación y desarrollo creativo
--  AnalyticsPort (OE2, OE3)
CREATE TABLE creative_activity_log (
    id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    autor_id          UUID        NOT NULL REFERENCES autores_estudiante(id) ON DELETE CASCADE,
    narrativa_id      UUID        REFERENCES narrativas_culturales(id) ON DELETE SET NULL,
    tipo_actividad    TEXT        NOT NULL CHECK (tipo_actividad IN (
                          'escritura',        -- tiempo en editor
                          'grabacion',        -- uso STT/TTS
                          'storyboard',       -- trabajo en viñetas
                          'ai_sugerencia',    -- llamadas a IA
                          'publicacion',      -- solicitud publicación
                          'lectura'           -- vista de narrativa ajena
                      )),
    duracion_minutos  INTEGER     NOT NULL DEFAULT 0,
    metadata          JSONB,      -- datos extra por tipo de actividad
    fecha             DATE        NOT NULL DEFAULT CURRENT_DATE
);
COMMENT ON TABLE  creative_activity_log             IS '[HU-13] Log de actividad para dashboard docente. AnalyticsPort (OE2).';
COMMENT ON COLUMN creative_activity_log.metadata    IS 'Ej: {"tokens_usados": 350, "imagenes_generadas": 2}';

CREATE INDEX idx_activity_autor  ON creative_activity_log(autor_id);
CREATE INDEX idx_activity_fecha  ON creative_activity_log(fecha);
CREATE INDEX idx_activity_tipo   ON creative_activity_log(tipo_actividad);


-- ============================================================
--  PMV 3 — REPOSITORIO CULTURAL + EXHIBICIÓN DIGITAL
--  OE5: Repositorio digital escolar · Entregables: S13 NLP · S14 pruebas · S15-16 deploy
--  Puerto: RepositorioPort · NLPPort
-- ============================================================

-- ── 14. nlp_classifications ─────────────────────────────────
--  HU-16: exportar catálogo con clasificación NLP automática (OE5)
--  Puerto: NLPPort — Adaptador: NLPAdapter
CREATE TABLE nlp_classifications (
    id                    UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    narrativa_id          UUID        NOT NULL UNIQUE REFERENCES narrativas_culturales(id) ON DELETE CASCADE,
    temas_principales     TEXT[]      NOT NULL DEFAULT '{}',
    personajes_detectados TEXT[]      NOT NULL DEFAULT '{}',
    lugar_paisaje         TEXT[]      NOT NULL DEFAULT '{}',
    palabras_clave        TEXT[]      NOT NULL DEFAULT '{}',   -- HU-16: exportación catálogo
    confianza             FLOAT       CHECK (confianza BETWEEN 0 AND 1),
    modelo_nlp            TEXT        NOT NULL DEFAULT 'spacy-es',
    procesada_en          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE  nlp_classifications              IS '[HU-16] Clasificación automática NLP. NLPAdapter → NLPPort (OE5).';
COMMENT ON COLUMN nlp_classifications.palabras_clave IS '[HU-16] Incluidas en exportación CSV/JSON del catálogo.';

CREATE INDEX idx_nlp_temas      ON nlp_classifications USING GIN(temas_principales);
CREATE INDEX idx_nlp_personajes ON nlp_classifications USING GIN(personajes_detectados);
CREATE INDEX idx_nlp_keywords   ON nlp_classifications USING GIN(palabras_clave);

-- ── 15. publication_requests ────────────────────────────────
--  HU-12 (docente aprueba/rechaza) · HU-15 (estudiante publica con un clic)
CREATE TABLE publication_requests (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    narrativa_id        UUID        NOT NULL REFERENCES narrativas_culturales(id) ON DELETE CASCADE,
    autor_id            UUID        NOT NULL REFERENCES autores_estudiante(id) ON DELETE CASCADE,
    aprobada_por        UUID        REFERENCES usuarios(id) ON DELETE SET NULL,
    estado              TEXT        NOT NULL DEFAULT 'pendiente'
                                    CHECK (estado IN ('pendiente', 'aprobada', 'rechazada', 'revision_solicitada')),
    mensaje_estudiante  TEXT,       -- motivación al enviar (HU-15)
    mensaje_docente     TEXT,       -- motivo aprobación/rechazo (HU-12)
    fecha_solicitud     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    fecha_resolucion    TIMESTAMPTZ
);
COMMENT ON TABLE  publication_requests IS '[HU-12,15] Flujo de publicación en repositorio escolar.';

CREATE INDEX idx_pubreq_estado     ON publication_requests(estado);
CREATE INDEX idx_pubreq_narrativa  ON publication_requests(narrativa_id);

-- Trigger: al aprobar → actualizar estado narrativa + contador autor
CREATE OR REPLACE FUNCTION fn_publication_approved()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    IF NEW.estado = 'aprobada' AND OLD.estado != 'aprobada' THEN
        UPDATE narrativas_culturales
        SET estado = 'publicada', fecha_publicacion = NOW(), aprobada_por = NEW.aprobada_por
        WHERE id = NEW.narrativa_id;

        UPDATE autores_estudiante
        SET narrativas_publicadas = narrativas_publicadas + 1
        WHERE id = NEW.autor_id;
    END IF;
    RETURN NEW;
END;
$$;
CREATE TRIGGER trg_publication_approved
AFTER UPDATE ON publication_requests
FOR EACH ROW EXECUTE FUNCTION fn_publication_approved();

-- ── 16. badges_estudiante ───────────────────────────────────
--  HU-15: badge "Autor Publicado" en el perfil del estudiante
CREATE TABLE badges_estudiante (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    autor_id    UUID        NOT NULL REFERENCES autores_estudiante(id) ON DELETE CASCADE,
    tipo        TEXT        NOT NULL CHECK (tipo IN (
                    'autor_publicado',    -- HU-15: primera narrativa publicada
                    'narrador_oral',      -- HU-02: primera grabación STT
                    'artista_digital',    -- HU-05: primer storyboard completado
                    'colaborador_ia'      -- HU-01: primera sesión con IA
                )),
    narrativa_id UUID       REFERENCES narrativas_culturales(id) ON DELETE SET NULL,
    otorgado_en TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (autor_id, tipo)
);
COMMENT ON TABLE badges_estudiante IS '[HU-15] Sistema de reconocimiento gamificado para el repositorio.';

-- ── 17. catalogo_exports ────────────────────────────────────
--  HU-16: exportar catálogo cultural completo (CSV y JSON)
CREATE TABLE catalogo_exports (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    exportado_por   UUID        NOT NULL REFERENCES usuarios(id),
    formato         TEXT        NOT NULL CHECK (formato IN ('csv', 'json')),
    total_registros INTEGER     NOT NULL,
    archivo_url     TEXT        NOT NULL,    -- Supabase Storage
    filtros_usados  JSONB,                  -- región, tipo_relato, fecha
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE catalogo_exports IS '[HU-16] Exportaciones del catálogo cultural por el administrador. CA2: CSV y JSON.';

-- ── 18. pruebas_piloto ──────────────────────────────────────
--  HU-20: pruebas escolares en aula — al menos 2 aulas (S14)
CREATE TABLE pruebas_piloto (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre_institucion  TEXT        NOT NULL,
    nombre_aula         TEXT        NOT NULL,
    docente_id          UUID        REFERENCES usuarios(id) ON DELETE SET NULL,
    fecha_inicio        DATE        NOT NULL,
    fecha_fin           DATE,
    total_estudiantes   INTEGER,
    tasa_error_pct      FLOAT,              -- HU-20: métrica de usabilidad
    tiempo_promedio_seg FLOAT,             -- HU-20: tiempo por tarea
    observaciones       TEXT,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE pruebas_piloto IS '[HU-20] Registro de pruebas escolares piloto (S14). CA1: ≥ 2 aulas.';

-- ── 19. feedback_usuarios ───────────────────────────────────
--  HU-20: hallazgos documentados y priorizados
CREATE TABLE feedback_usuarios (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    prueba_id       UUID        NOT NULL REFERENCES pruebas_piloto(id) ON DELETE CASCADE,
    usuario_id      UUID        REFERENCES usuarios(id) ON DELETE SET NULL,
    categoria       TEXT        NOT NULL CHECK (categoria IN ('usabilidad', 'contenido', 'rendimiento', 'bug', 'sugerencia')),
    descripcion     TEXT        NOT NULL,
    prioridad       TEXT        NOT NULL DEFAULT 'media' CHECK (prioridad IN ('alta', 'media', 'baja')),
    resuelto        BOOLEAN     NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE feedback_usuarios IS '[HU-20] Hallazgos de pruebas piloto priorizados para ajuste UX (S14).';

-- ── 20. deployment_log ──────────────────────────────────────
--  HU-21: despliegue con URL pública (S15-S16)
CREATE TABLE deployment_log (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    version         TEXT        NOT NULL,
    entorno         TEXT        NOT NULL CHECK (entorno IN ('local', 'staging', 'produccion')),
    url_publica     TEXT,                   -- HU-21: HTTPS con dominio escolar
    desplegado_por  UUID        REFERENCES usuarios(id) ON DELETE SET NULL,
    notas           TEXT,
    tiempo_respuesta_ms FLOAT,             -- HU-21: CA2 ≤ 2s en 4G
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE deployment_log IS '[HU-21] Historial de despliegues. CA1: HTTPS. CA2: ≤ 2000ms. (S15-S16).';


-- ============================================================
--  VISTAS — Dashboard y consultas frecuentes
-- ============================================================

-- Vista: dashboard docente (HU-13)
CREATE OR REPLACE VIEW v_dashboard_docente AS
SELECT
    ae.id              AS autor_id,
    ae.nombre_completo,
    ae.grado,
    ae.region_cultural,
    COUNT(DISTINCT nc.id)                          AS total_narrativas,
    COUNT(DISTINCT nc.id) FILTER (WHERE nc.estado = 'publicada') AS narrativas_publicadas,
    COALESCE(SUM(cal.duracion_minutos), 0)         AS minutos_totales,
    COUNT(DISTINCT cal.id) FILTER (WHERE cal.tipo_actividad = 'ai_sugerencia') AS sesiones_ia,
    MAX(cal.fecha)                                  AS ultima_actividad
FROM autores_estudiante ae
LEFT JOIN narrativas_culturales nc ON nc.autor_id = ae.id
LEFT JOIN creative_activity_log cal ON cal.autor_id = ae.id
GROUP BY ae.id, ae.nombre_completo, ae.grado, ae.region_cultural;

COMMENT ON VIEW v_dashboard_docente IS '[HU-13] Dashboard de participación creativa por estudiante. Exportable en CSV.';

-- Vista: biblioteca pública (HU-14)
CREATE OR REPLACE VIEW v_biblioteca_publica AS
SELECT
    nc.id,
    nc.titulo,
    nc.region_cultural,
    nc.tipo_relato,
    nc.veces_vista,
    nc.fecha_publicacion,
    nc.destacada,
    ae.nombre_completo  AS autor,
    ae.grado,
    nlp.temas_principales,
    nlp.palabras_clave,
    ar.audio_url        AS audio_narrado_url   -- HU-17
FROM narrativas_culturales nc
JOIN autores_estudiante ae ON ae.id = nc.autor_id
LEFT JOIN nlp_classifications nlp ON nlp.narrativa_id = nc.id
LEFT JOIN audio_recordings ar ON ar.narrativa_id = nc.id AND ar.tipo = 'text_to_speech' AND ar.publico = TRUE
WHERE nc.estado = 'publicada';

COMMENT ON VIEW v_biblioteca_publica IS '[HU-14,17] Repositorio público con FTS, filtros y audio. RepositorioPort (OE5).';

-- ============================================================
--  ROW LEVEL SECURITY (RLS) — Supabase Auth
-- ============================================================
ALTER TABLE usuarios               ENABLE ROW LEVEL SECURITY;
ALTER TABLE autores_estudiante     ENABLE ROW LEVEL SECURITY;
ALTER TABLE narrativas_culturales  ENABLE ROW LEVEL SECURITY;
ALTER TABLE comentarios_narrativa  ENABLE ROW LEVEL SECURITY;
ALTER TABLE notificaciones         ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations       ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_messages            ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_image_requests      ENABLE ROW LEVEL SECURITY;
ALTER TABLE audio_recordings       ENABLE ROW LEVEL SECURITY;
ALTER TABLE storyboard_frames      ENABLE ROW LEVEL SECURITY;
ALTER TABLE storyboard_exports     ENABLE ROW LEVEL SECURITY;
ALTER TABLE creative_activity_log  ENABLE ROW LEVEL SECURITY;
ALTER TABLE nlp_classifications    ENABLE ROW LEVEL SECURITY;
ALTER TABLE publication_requests   ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges_estudiante      ENABLE ROW LEVEL SECURITY;
ALTER TABLE catalogo_exports       ENABLE ROW LEVEL SECURITY;
ALTER TABLE pruebas_piloto         ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_usuarios      ENABLE ROW LEVEL SECURITY;
ALTER TABLE deployment_log         ENABLE ROW LEVEL SECURITY;
ALTER TABLE rol_change_log         ENABLE ROW LEVEL SECURITY;

-- Narrativas publicadas: visibles para todos (HU-14)
CREATE POLICY "narrativas_publicas_read"
    ON narrativas_culturales FOR SELECT
    USING (estado = 'publicada');

-- Estudiante gestiona sus propias narrativas
CREATE POLICY "narrativas_propias_all"
    ON narrativas_culturales FOR ALL
    USING (autor_id IN (
        SELECT id FROM autores_estudiante WHERE user_id = auth.uid()
    ));

-- Docente lee narrativas de sus estudiantes
CREATE POLICY "narrativas_docente_read"
    ON narrativas_culturales FOR SELECT
    USING (docente_id = auth.uid());

-- Notificaciones: cada usuario ve solo las suyas
CREATE POLICY "notificaciones_propias"
    ON notificaciones FOR ALL
    USING (usuario_id = auth.uid());

-- Audio público: visible para todos en repositorio (HU-17)
CREATE POLICY "audio_publico_read"
    ON audio_recordings FOR SELECT
    USING (publico = TRUE);

-- ============================================================
--  DATOS SEMILLA — Desarrollo / Docker Compose local (HU-19)
-- ============================================================
INSERT INTO usuarios (id, email, rol) VALUES
    ('00000000-0000-0000-0000-000000000001', 'admin@culturastory.pe',      'administrador'),
    ('00000000-0000-0000-0000-000000000002', 'docente@culturastory.pe',    'docente'),
    ('00000000-0000-0000-0000-000000000003', 'estudiante1@culturastory.pe','estudiante'),
    ('00000000-0000-0000-0000-000000000004', 'estudiante2@culturastory.pe','estudiante'),
    ('00000000-0000-0000-0000-000000000005', 'comunidad@culturastory.pe',  'comunidad');

INSERT INTO autores_estudiante (id, user_id, nombre_completo, grado, institucion, region_cultural, lengua_materna) VALUES
    ('aaaaaaaa-0000-0000-0000-000000000001',
     '00000000-0000-0000-0000-000000000003',
     'María Quispe Huanca', '5to Secundaria', 'IE Señor de los Milagros', 'andina', 'Quechua'),
    ('aaaaaaaa-0000-0000-0000-000000000002',
     '00000000-0000-0000-0000-000000000004',
     'Carlos Mamani Torres', '4to Secundaria', 'IE Señor de los Milagros', 'andina', 'Quechua');

INSERT INTO narrativas_culturales (
    id, titulo, contenido, region_cultural, tipo_relato, estado, autor_id, docente_id
) VALUES
    ('bbbbbbbb-0000-0000-0000-000000000001',
     'El cóndor y la laguna sagrada',
     'En los tiempos en que los apus hablaban con los hombres, existía una laguna...',
     'andina', 'leyenda', 'borrador',
     'aaaaaaaa-0000-0000-0000-000000000001',
     '00000000-0000-0000-0000-000000000002'),
    ('bbbbbbbb-0000-0000-0000-000000000002',
     'La serpiente del río Mantaro',
     'Los antiguos pobladores del valle contaban que en las noches de luna llena...',
     'andina', 'mito', 'publicada',
     'aaaaaaaa-0000-0000-0000-000000000002',
     '00000000-0000-0000-0000-000000000002');
