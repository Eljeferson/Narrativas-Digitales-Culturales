-- ============================================================
--  CulturaStory AI — Stored Procedures, Functions, Triggers y Vistas
--  Alineado con: 21 HUs · 5 Épicas · 3 PMVs
--  Spring Boot Hexagonal · Supabase PostgreSQL
-- ============================================================


-- ============================================================
--  SECCIÓN 1: FUNCIONES UTILITARIAS
-- ============================================================

-- ── fn_set_updated_at ───────────────────────────────────────
--  Uso: trigger genérico para updated_at en cualquier tabla
CREATE OR REPLACE FUNCTION fn_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;
COMMENT ON FUNCTION fn_set_updated_at IS 'Trigger genérico: actualiza updated_at antes de cada UPDATE.';


-- ── fn_narrativas_search_vector ─────────────────────────────
--  HU-14: full-text search en biblioteca pública
--  Pesos: título (A) > región/tipo (B) > contenido (C)
CREATE OR REPLACE FUNCTION fn_narrativas_search_vector()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.search_vector :=
        setweight(to_tsvector('spanish', unaccent(COALESCE(NEW.titulo, ''))),          'A') ||
        setweight(to_tsvector('spanish', unaccent(COALESCE(NEW.region_cultural, ''))), 'B') ||
        setweight(to_tsvector('spanish', unaccent(COALESCE(NEW.tipo_relato, ''))),     'B') ||
        setweight(to_tsvector('spanish', unaccent(COALESCE(NEW.contenido, ''))),       'C');
    RETURN NEW;
END;
$$;
COMMENT ON FUNCTION fn_narrativas_search_vector IS '[HU-14] Mantiene el índice FTS de narrativas_culturales actualizado.';


-- ── fn_publication_approved ─────────────────────────────────
--  HU-12: al aprobar solicitud → cambia estado narrativa a publicada
--  HU-15: incrementa contador narrativas_publicadas del autor
--         y otorga badge "autor_publicado"
CREATE OR REPLACE FUNCTION fn_publication_approved()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    IF NEW.estado = 'aprobada' AND OLD.estado != 'aprobada' THEN

        -- Actualizar narrativa
        UPDATE narrativas_culturales
        SET estado            = 'publicada',
            fecha_publicacion = NOW(),
            aprobada_por      = NEW.aprobada_por
        WHERE id = NEW.narrativa_id;

        -- Incrementar contador del autor
        UPDATE autores_estudiante
        SET narrativas_publicadas = narrativas_publicadas + 1
        WHERE id = NEW.autor_id;

        -- Otorgar badge (ignora si ya existe)
        INSERT INTO badges_estudiante (autor_id, tipo, narrativa_id)
        VALUES (NEW.autor_id, 'autor_publicado', NEW.narrativa_id)
        ON CONFLICT (autor_id, tipo) DO NOTHING;

        -- Notificar al estudiante
        INSERT INTO notificaciones (usuario_id, tipo, titulo, mensaje, referencia_id)
        SELECT u.id, 'publicacion',
               '¡Tu narrativa fue publicada!',
               'Tu historia ha sido aprobada y ya está visible en el repositorio cultural.',
               NEW.narrativa_id
        FROM autores_estudiante ae
        JOIN usuarios u ON u.id = ae.user_id
        WHERE ae.id = NEW.autor_id;

    END IF;

    IF NEW.estado = 'rechazada' AND OLD.estado != 'rechazada' THEN

        -- Revertir estado narrativa
        UPDATE narrativas_culturales
        SET estado = 'en_revision'
        WHERE id = NEW.narrativa_id;

        -- Notificar rechazo al estudiante
        INSERT INTO notificaciones (usuario_id, tipo, titulo, mensaje, referencia_id)
        SELECT u.id, 'rechazo',
               'Tu narrativa necesita ajustes',
               COALESCE('Motivo: ' || NEW.mensaje_docente, 'El docente solicitó revisiones a tu narrativa.'),
               NEW.narrativa_id
        FROM autores_estudiante ae
        JOIN usuarios u ON u.id = ae.user_id
        WHERE ae.id = NEW.autor_id;

    END IF;

    RETURN NEW;
END;
$$;
COMMENT ON FUNCTION fn_publication_approved IS '[HU-12,15] Orquesta aprobación/rechazo: actualiza narrativa, badge y notificación.';


-- ── fn_comentario_notificar ─────────────────────────────────
--  HU-11: notificar al estudiante cuando el docente deja un comentario
CREATE OR REPLACE FUNCTION fn_comentario_notificar()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO notificaciones (usuario_id, tipo, titulo, mensaje, referencia_id)
    SELECT u.id, 'comentario',
           'Tu docente dejó un comentario',
           'Revisa la retroalimentación en tu narrativa.',
           NEW.narrativa_id
    FROM narrativas_culturales nc
    JOIN autores_estudiante ae ON ae.id = nc.autor_id
    JOIN usuarios u ON u.id = ae.user_id
    WHERE nc.id = NEW.narrativa_id;

    RETURN NEW;
END;
$$;
COMMENT ON FUNCTION fn_comentario_notificar IS '[HU-11] Genera notificación al estudiante al insertar comentario docente.';


-- ── fn_badge_auto ───────────────────────────────────────────
--  HU-02: badge "narrador_oral" al completar primera grabación STT
--  HU-05: badge "artista_digital" al completar primer storyboard
--  HU-01: badge "colaborador_ia" al iniciar primera conversación IA
CREATE OR REPLACE FUNCTION fn_badge_audio()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    IF NEW.tipo = 'speech_to_text' THEN
        INSERT INTO badges_estudiante (autor_id, tipo, narrativa_id)
        VALUES (NEW.autor_id, 'narrador_oral', NEW.narrativa_id)
        ON CONFLICT (autor_id, tipo) DO NOTHING;
    END IF;
    RETURN NEW;
END;
$$;
COMMENT ON FUNCTION fn_badge_audio IS '[HU-02] Otorga badge narrador_oral al primer audio STT del estudiante.';

CREATE OR REPLACE FUNCTION fn_badge_storyboard()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
    v_autor_id UUID;
    v_frames   INTEGER;
BEGIN
    -- Verificar que hay al menos 4 frames listos (HU-05 criterio CA1)
    SELECT nc.autor_id,
           COUNT(*) FILTER (WHERE sf.estado_generacion = 'listo')
    INTO v_autor_id, v_frames
    FROM storyboard_frames sf
    JOIN narrativas_culturales nc ON nc.id = sf.narrativa_id
    WHERE sf.narrativa_id = NEW.narrativa_id
    GROUP BY nc.autor_id;

    IF v_frames >= 4 THEN
        INSERT INTO badges_estudiante (autor_id, tipo, narrativa_id)
        VALUES (v_autor_id, 'artista_digital', NEW.narrativa_id)
        ON CONFLICT (autor_id, tipo) DO NOTHING;
    END IF;

    RETURN NEW;
END;
$$;
COMMENT ON FUNCTION fn_badge_storyboard IS '[HU-05] Otorga badge artista_digital al completar 4+ frames del storyboard.';

CREATE OR REPLACE FUNCTION fn_badge_ia()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO badges_estudiante (autor_id, tipo, narrativa_id)
    SELECT nc.autor_id, 'colaborador_ia', NEW.narrativa_id
    FROM narrativas_culturales nc
    WHERE nc.id = NEW.narrativa_id
    ON CONFLICT (autor_id, tipo) DO NOTHING;

    RETURN NEW;
END;
$$;
COMMENT ON FUNCTION fn_badge_ia IS '[HU-01] Otorga badge colaborador_ia al iniciar la primera conversación con IA.';


-- ── fn_log_actividad ────────────────────────────────────────
--  HU-13: registrar actividad en creative_activity_log automáticamente
--  Llamada desde la app (Spring Boot use case) o triggers
CREATE OR REPLACE FUNCTION fn_log_actividad(
    p_autor_id        UUID,
    p_narrativa_id    UUID,
    p_tipo_actividad  TEXT,
    p_duracion_min    INTEGER DEFAULT 0,
    p_metadata        JSONB   DEFAULT NULL
)
RETURNS UUID LANGUAGE plpgsql AS $$
DECLARE
    v_id UUID;
BEGIN
    INSERT INTO creative_activity_log (autor_id, narrativa_id, tipo_actividad, duracion_minutos, metadata)
    VALUES (p_autor_id, p_narrativa_id, p_tipo_actividad, p_duracion_min, p_metadata)
    RETURNING id INTO v_id;

    RETURN v_id;
END;
$$;
COMMENT ON FUNCTION fn_log_actividad IS '[HU-13] Registra una actividad creativa. Llamada desde adaptadores Spring Boot.';


-- ── fn_incrementar_vistas ───────────────────────────────────
--  HU-14/15: contar cuántas veces fue leída una narrativa pública
CREATE OR REPLACE FUNCTION fn_incrementar_vistas(p_narrativa_id UUID)
RETURNS VOID LANGUAGE plpgsql AS $$
BEGIN
    UPDATE narrativas_culturales
    SET veces_vista = veces_vista + 1
    WHERE id = p_narrativa_id AND estado = 'publicada';
END;
$$;
COMMENT ON FUNCTION fn_incrementar_vistas IS '[HU-14,15] Incrementa veces_vista de una narrativa publicada.';


-- ── fn_buscar_narrativas ────────────────────────────────────
--  HU-14: búsqueda full-text + filtros en biblioteca pública
--  Retorna ≤ 2 segundos (índice GIN)
CREATE OR REPLACE FUNCTION fn_buscar_narrativas(
    p_query          TEXT    DEFAULT NULL,
    p_region         TEXT    DEFAULT NULL,
    p_tipo_relato    TEXT    DEFAULT NULL,
    p_limit          INTEGER DEFAULT 20,
    p_offset         INTEGER DEFAULT 0
)
RETURNS TABLE (
    id               UUID,
    titulo           TEXT,
    region_cultural  TEXT,
    tipo_relato      TEXT,
    autor            TEXT,
    grado            TEXT,
    veces_vista      INTEGER,
    fecha_publicacion TIMESTAMPTZ,
    destacada        BOOLEAN,
    rank             REAL
) LANGUAGE plpgsql STABLE AS $$
BEGIN
    RETURN QUERY
    SELECT
        nc.id,
        nc.titulo,
        nc.region_cultural,
        nc.tipo_relato,
        ae.nombre_completo AS autor,
        ae.grado,
        nc.veces_vista,
        nc.fecha_publicacion,
        nc.destacada,
        CASE
            WHEN p_query IS NOT NULL
            THEN ts_rank(nc.search_vector, websearch_to_tsquery('spanish', unaccent(p_query)))
            ELSE 1.0
        END::REAL AS rank
    FROM narrativas_culturales nc
    JOIN autores_estudiante ae ON ae.id = nc.autor_id
    WHERE nc.estado = 'publicada'
      AND (p_region      IS NULL OR nc.region_cultural = p_region)
      AND (p_tipo_relato IS NULL OR nc.tipo_relato     = p_tipo_relato)
      AND (p_query       IS NULL OR nc.search_vector   @@ websearch_to_tsquery('spanish', unaccent(p_query)))
    ORDER BY nc.destacada DESC, rank DESC, nc.fecha_publicacion DESC
    LIMIT p_limit OFFSET p_offset;
END;
$$;
COMMENT ON FUNCTION fn_buscar_narrativas IS '[HU-14] Búsqueda FTS + filtros en repositorio público. Índice GIN garantiza ≤ 2s.';


-- ── fn_exportar_catalogo ────────────────────────────────────
--  HU-16: exportar catálogo cultural con clasificación NLP
--  Retorna JSON completo para que el adapter genere CSV/JSON
CREATE OR REPLACE FUNCTION fn_exportar_catalogo(
    p_region      TEXT DEFAULT NULL,
    p_tipo_relato TEXT DEFAULT NULL
)
RETURNS JSONB LANGUAGE plpgsql STABLE AS $$
DECLARE
    v_resultado JSONB;
BEGIN
    SELECT jsonb_agg(
        jsonb_build_object(
            'id',                  nc.id,
            'titulo',              nc.titulo,
            'region_cultural',     nc.region_cultural,
            'tipo_relato',         nc.tipo_relato,
            'autor',               ae.nombre_completo,
            'grado',               ae.grado,
            'institucion',         ae.institucion,
            'fecha_publicacion',   nc.fecha_publicacion,
            'veces_vista',         nc.veces_vista,
            'palabras_clave',      COALESCE(nlp.palabras_clave, '{}'),
            'temas_principales',   COALESCE(nlp.temas_principales, '{}'),
            'personajes',          COALESCE(nlp.personajes_detectados, '{}'),
            'lugar_paisaje',       COALESCE(nlp.lugar_paisaje, '{}'),
            'confianza_nlp',       nlp.confianza,
            'audio_url',           ar.audio_url
        )
    )
    INTO v_resultado
    FROM narrativas_culturales nc
    JOIN autores_estudiante ae ON ae.id = nc.autor_id
    LEFT JOIN nlp_classifications nlp ON nlp.narrativa_id = nc.id
    LEFT JOIN audio_recordings ar
           ON ar.narrativa_id = nc.id
          AND ar.tipo = 'text_to_speech'
          AND ar.publico = TRUE
    WHERE nc.estado = 'publicada'
      AND (p_region      IS NULL OR nc.region_cultural = p_region)
      AND (p_tipo_relato IS NULL OR nc.tipo_relato     = p_tipo_relato);

    RETURN COALESCE(v_resultado, '[]'::JSONB);
END;
$$;
COMMENT ON FUNCTION fn_exportar_catalogo IS '[HU-16] Retorna catálogo cultural completo como JSONB para exportación CSV/JSON. CA3: ≤ 30s.';


-- ── fn_dashboard_estudiante ─────────────────────────────────
--  HU-13: métricas individuales de un estudiante para el docente
CREATE OR REPLACE FUNCTION fn_dashboard_estudiante(p_autor_id UUID)
RETURNS JSONB LANGUAGE plpgsql STABLE AS $$
DECLARE
    v_resultado JSONB;
BEGIN
    SELECT jsonb_build_object(
        'autor_id',             ae.id,
        'nombre',               ae.nombre_completo,
        'grado',                ae.grado,
        'region_cultural',      ae.region_cultural,
        'total_narrativas',     COUNT(DISTINCT nc.id),
        'narrativas_publicadas',ae.narrativas_publicadas,
        'borradores',           COUNT(DISTINCT nc.id) FILTER (WHERE nc.estado = 'borrador'),
        'en_revision',          COUNT(DISTINCT nc.id) FILTER (WHERE nc.estado = 'en_revision'),
        'minutos_escritura',    COALESCE(SUM(cal.duracion_minutos) FILTER (WHERE cal.tipo_actividad = 'escritura'), 0),
        'minutos_grabacion',    COALESCE(SUM(cal.duracion_minutos) FILTER (WHERE cal.tipo_actividad = 'grabacion'), 0),
        'sesiones_ia',          COUNT(DISTINCT cal.id) FILTER (WHERE cal.tipo_actividad = 'ai_sugerencia'),
        'storyboards',          COUNT(DISTINCT cal.id) FILTER (WHERE cal.tipo_actividad = 'storyboard'),
        'ultima_actividad',     MAX(cal.fecha),
        'badges',               (
                                    SELECT jsonb_agg(tipo)
                                    FROM badges_estudiante
                                    WHERE autor_id = ae.id
                                )
    )
    INTO v_resultado
    FROM autores_estudiante ae
    LEFT JOIN narrativas_culturales nc  ON nc.autor_id  = ae.id
    LEFT JOIN creative_activity_log cal ON cal.autor_id = ae.id
    WHERE ae.id = p_autor_id
    GROUP BY ae.id, ae.nombre_completo, ae.grado, ae.region_cultural, ae.narrativas_publicadas;

    RETURN COALESCE(v_resultado, '{}'::JSONB);
END;
$$;
COMMENT ON FUNCTION fn_dashboard_estudiante IS '[HU-13] Métricas detalladas de un estudiante para el dashboard docente.';


-- ── fn_solicitar_publicacion ────────────────────────────────
--  HU-15: estudiante publica narrativa aprobada con un clic
CREATE OR REPLACE FUNCTION fn_solicitar_publicacion(
    p_narrativa_id      UUID,
    p_autor_id          UUID,
    p_mensaje_estudiante TEXT DEFAULT NULL
)
RETURNS UUID LANGUAGE plpgsql AS $$
DECLARE
    v_solicitud_id UUID;
    v_estado_actual TEXT;
BEGIN
    -- Verificar estado de narrativa
    SELECT estado INTO v_estado_actual
    FROM narrativas_culturales
    WHERE id = p_narrativa_id AND autor_id = p_autor_id;

    IF v_estado_actual IS NULL THEN
        RAISE EXCEPTION 'Narrativa no encontrada o no pertenece al autor.';
    END IF;

    IF v_estado_actual NOT IN ('borrador', 'rechazada') THEN
        RAISE EXCEPTION 'La narrativa ya está en proceso de publicación o publicada. Estado actual: %', v_estado_actual;
    END IF;

    -- Crear solicitud
    INSERT INTO publication_requests (narrativa_id, autor_id, mensaje_estudiante)
    VALUES (p_narrativa_id, p_autor_id, p_mensaje_estudiante)
    RETURNING id INTO v_solicitud_id;

    -- Cambiar estado narrativa
    UPDATE narrativas_culturales
    SET estado = 'en_revision'
    WHERE id = p_narrativa_id;

    -- Notificar al docente
    INSERT INTO notificaciones (usuario_id, tipo, titulo, mensaje, referencia_id)
    SELECT nc.docente_id, 'revision',
           'Nueva narrativa para revisar',
           'Un estudiante solicita publicar su narrativa: ' || nc.titulo,
           p_narrativa_id
    FROM narrativas_culturales nc
    WHERE nc.id = p_narrativa_id AND nc.docente_id IS NOT NULL;

    RETURN v_solicitud_id;
END;
$$;
COMMENT ON FUNCTION fn_solicitar_publicacion IS '[HU-15] Crea solicitud de publicación y notifica al docente. CA1: un clic.';


-- ── fn_resolver_publicacion ─────────────────────────────────
--  HU-12: docente aprueba, rechaza o solicita revisión
CREATE OR REPLACE FUNCTION fn_resolver_publicacion(
    p_solicitud_id    UUID,
    p_docente_id      UUID,
    p_estado          TEXT,   -- 'aprobada' | 'rechazada' | 'revision_solicitada'
    p_mensaje_docente TEXT DEFAULT NULL
)
RETURNS VOID LANGUAGE plpgsql AS $$
BEGIN
    IF p_estado NOT IN ('aprobada', 'rechazada', 'revision_solicitada') THEN
        RAISE EXCEPTION 'Estado inválido: %. Use aprobada | rechazada | revision_solicitada.', p_estado;
    END IF;

    UPDATE publication_requests
    SET estado           = p_estado,
        aprobada_por     = p_docente_id,
        mensaje_docente  = p_mensaje_docente,
        fecha_resolucion = NOW()
    WHERE id = p_solicitud_id;

    -- El trigger fn_publication_approved maneja el resto
END;
$$;
COMMENT ON FUNCTION fn_resolver_publicacion IS '[HU-12] Docente resuelve solicitud. El trigger fn_publication_approved orquesta el resto.';


-- ── fn_cambiar_rol ──────────────────────────────────────────
--  HU-08: cambio de rol con auditoría obligatoria
CREATE OR REPLACE FUNCTION fn_cambiar_rol(
    p_usuario_id   UUID,
    p_rol_nuevo    TEXT,
    p_admin_id     UUID,
    p_motivo       TEXT DEFAULT NULL
)
RETURNS VOID LANGUAGE plpgsql AS $$
DECLARE
    v_rol_anterior TEXT;
BEGIN
    SELECT rol INTO v_rol_anterior FROM usuarios WHERE id = p_usuario_id;

    IF v_rol_anterior IS NULL THEN
        RAISE EXCEPTION 'Usuario no encontrado: %', p_usuario_id;
    END IF;

    IF p_rol_nuevo NOT IN ('estudiante', 'docente', 'comunidad', 'administrador') THEN
        RAISE EXCEPTION 'Rol inválido: %', p_rol_nuevo;
    END IF;

    UPDATE usuarios SET rol = p_rol_nuevo WHERE id = p_usuario_id;

    INSERT INTO rol_change_log (usuario_id, rol_anterior, rol_nuevo, cambiado_por, motivo)
    VALUES (p_usuario_id, v_rol_anterior, p_rol_nuevo, p_admin_id, p_motivo);

    -- Notificar al usuario afectado
    INSERT INTO notificaciones (usuario_id, tipo, titulo, mensaje, referencia_id)
    VALUES (p_usuario_id, 'sistema',
            'Tu rol fue actualizado',
            'Tu nuevo rol en la plataforma es: ' || p_rol_nuevo,
            NULL);
END;
$$;
COMMENT ON FUNCTION fn_cambiar_rol IS '[HU-08] Cambia rol con log de auditoría y notificación. CA2: efecto inmediato. CA3: log registrado.';


-- ── fn_marcar_notificaciones_leidas ─────────────────────────
--  HU-11/12/15: marcar notificaciones como leídas
CREATE OR REPLACE FUNCTION fn_marcar_notificaciones_leidas(
    p_usuario_id UUID,
    p_ids        UUID[] DEFAULT NULL   -- NULL = marcar todas
)
RETURNS INTEGER LANGUAGE plpgsql AS $$
DECLARE
    v_count INTEGER;
BEGIN
    UPDATE notificaciones
    SET leida = TRUE
    WHERE usuario_id = p_usuario_id
      AND leida = FALSE
      AND (p_ids IS NULL OR id = ANY(p_ids))
    ;
    GET DIAGNOSTICS v_count = ROW_COUNT;
    RETURN v_count;
END;
$$;
COMMENT ON FUNCTION fn_marcar_notificaciones_leidas IS '[HU-11,12,15] Marca notificaciones como leídas. Retorna cantidad actualizada.';


-- ── fn_estadisticas_repositorio ─────────────────────────────
--  HU-14: totales para la portada del repositorio
CREATE OR REPLACE FUNCTION fn_estadisticas_repositorio()
RETURNS JSONB LANGUAGE plpgsql STABLE AS $$
BEGIN
    RETURN (
        SELECT jsonb_build_object(
            'total_narrativas',    COUNT(*),
            'total_autores',       COUNT(DISTINCT autor_id),
            'total_vistas',        SUM(veces_vista),
            'regiones',            jsonb_object_agg(region_cultural, conteo)
        )
        FROM (
            SELECT region_cultural, COUNT(*) AS conteo
            FROM narrativas_culturales
            WHERE estado = 'publicada'
            GROUP BY region_cultural
        ) sub,
        (SELECT COUNT(*), COUNT(DISTINCT autor_id), COALESCE(SUM(veces_vista),0)
         FROM narrativas_culturales WHERE estado = 'publicada') totales(cnt, autores, vistas)
    );
END;
$$;
COMMENT ON FUNCTION fn_estadisticas_repositorio IS '[HU-14] Estadísticas globales del repositorio para la portada pública.';


-- ============================================================
--  SECCIÓN 2: TRIGGERS
-- ============================================================

-- ── narrativas_culturales ───────────────────────────────────
CREATE TRIGGER trg_narrativas_updated_at
BEFORE UPDATE ON narrativas_culturales
FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

CREATE TRIGGER trg_narrativas_fts
BEFORE INSERT OR UPDATE ON narrativas_culturales
FOR EACH ROW EXECUTE FUNCTION fn_narrativas_search_vector();

-- ── publication_requests ────────────────────────────────────
CREATE TRIGGER trg_publication_approved
AFTER UPDATE ON publication_requests
FOR EACH ROW EXECUTE FUNCTION fn_publication_approved();

-- ── comentarios_narrativa ───────────────────────────────────
CREATE TRIGGER trg_comentario_notificar
AFTER INSERT ON comentarios_narrativa
FOR EACH ROW EXECUTE FUNCTION fn_comentario_notificar();

-- ── audio_recordings ────────────────────────────────────────
CREATE TRIGGER trg_badge_audio
AFTER INSERT ON audio_recordings
FOR EACH ROW EXECUTE FUNCTION fn_badge_audio();

-- ── storyboard_frames ───────────────────────────────────────
CREATE TRIGGER trg_badge_storyboard
AFTER UPDATE ON storyboard_frames
FOR EACH ROW
WHEN (NEW.estado_generacion = 'listo')
EXECUTE FUNCTION fn_badge_storyboard();

-- ── ai_conversations ────────────────────────────────────────
CREATE TRIGGER trg_badge_ia
AFTER INSERT ON ai_conversations
FOR EACH ROW EXECUTE FUNCTION fn_badge_ia();


-- ============================================================
--  SECCIÓN 3: VISTAS
-- ============================================================

-- ── v_biblioteca_publica ────────────────────────────────────
--  HU-14: explorar biblioteca filtrada (comunidad y estudiantes)
--  HU-17: incluye audio narrado para reproducción
CREATE VIEW v_biblioteca_publica AS
SELECT
    nc.id,
    nc.titulo,
    nc.region_cultural,
    nc.tipo_relato,
    nc.veces_vista,
    nc.fecha_publicacion,
    nc.destacada,
    ae.nombre_completo          AS autor,
    ae.grado,
    ae.institucion,
    nlp.temas_principales,
    nlp.palabras_clave,
    nlp.personajes_detectados,
    nlp.lugar_paisaje,
    nlp.confianza               AS confianza_nlp,
    ar.audio_url                AS audio_narrado_url,
    ar.duracion_segundos        AS audio_duracion_seg
FROM narrativas_culturales nc
JOIN  autores_estudiante ae  ON ae.id  = nc.autor_id
LEFT JOIN nlp_classifications nlp ON nlp.narrativa_id = nc.id
LEFT JOIN audio_recordings ar
       ON ar.narrativa_id = nc.id
      AND ar.tipo    = 'text_to_speech'
      AND ar.publico = TRUE
WHERE nc.estado = 'publicada';

COMMENT ON VIEW v_biblioteca_publica IS '[HU-14,17] Repositorio público con FTS, NLP y audio narrado.';


-- ── v_dashboard_docente ─────────────────────────────────────
--  HU-13: vista resumen por estudiante para el panel docente
CREATE VIEW v_dashboard_docente AS
SELECT
    ae.id                                                          AS autor_id,
    ae.nombre_completo,
    ae.grado,
    ae.institucion,
    ae.region_cultural,
    ae.narrativas_publicadas,
    COUNT(DISTINCT nc.id)                                          AS total_narrativas,
    COUNT(DISTINCT nc.id) FILTER (WHERE nc.estado = 'borrador')    AS borradores,
    COUNT(DISTINCT nc.id) FILTER (WHERE nc.estado = 'en_revision') AS en_revision,
    COUNT(DISTINCT nc.id) FILTER (WHERE nc.estado = 'publicada')   AS publicadas,
    COALESCE(SUM(cal.duracion_minutos), 0)                         AS minutos_totales,
    COALESCE(SUM(cal.duracion_minutos) FILTER (WHERE cal.tipo_actividad = 'escritura'), 0) AS min_escritura,
    COALESCE(SUM(cal.duracion_minutos) FILTER (WHERE cal.tipo_actividad = 'grabacion'), 0) AS min_grabacion,
    COUNT(DISTINCT cal.id) FILTER (WHERE cal.tipo_actividad = 'ai_sugerencia')             AS sesiones_ia,
    MAX(cal.fecha)                                                  AS ultima_actividad,
    (SELECT COUNT(*) FROM badges_estudiante WHERE autor_id = ae.id) AS total_badges
FROM autores_estudiante ae
LEFT JOIN narrativas_culturales nc  ON nc.autor_id  = ae.id
LEFT JOIN creative_activity_log cal ON cal.autor_id = ae.id
GROUP BY ae.id, ae.nombre_completo, ae.grado, ae.institucion,
         ae.region_cultural, ae.narrativas_publicadas;

COMMENT ON VIEW v_dashboard_docente IS '[HU-13] Participación y desarrollo creativo por estudiante. CA2: tiempo real. CA3: exportable.';


-- ── v_narrativas_pendientes_revision ────────────────────────
--  HU-10: docente lista narrativas pendientes de revisar
--  HU-12: vista de solicitudes pendientes
CREATE OR REPLACE VIEW v_narrativas_pendientes_revision AS
SELECT
    pr.id                   AS solicitud_id,
    pr.estado               AS estado_solicitud,
    pr.fecha_solicitud,
    pr.mensaje_estudiante,
    nc.id                   AS narrativa_id,
    nc.titulo,
    nc.region_cultural,
    nc.tipo_relato,
    nc.contenido,
    nc.docente_id,
    ae.nombre_completo      AS autor,
    ae.grado,
    ae.institucion
FROM publication_requests pr
JOIN narrativas_culturales nc ON nc.id = pr.narrativa_id
JOIN autores_estudiante ae    ON ae.id = pr.autor_id
WHERE pr.estado = 'pendiente'
ORDER BY pr.fecha_solicitud ASC;

COMMENT ON VIEW v_narrativas_pendientes_revision IS '[HU-10,12] Lista de narrativas en espera de aprobación docente.';


-- ── v_narrativas_por_docente ────────────────────────────────
--  HU-10: seguimiento pedagógico completo del docente
CREATE OR REPLACE VIEW v_narrativas_por_docente AS
SELECT
    nc.id,
    nc.titulo,
    nc.estado,
    nc.region_cultural,
    nc.tipo_relato,
    nc.created_at,
    nc.updated_at,
    nc.comentario_pedagogico,
    nc.docente_id,
    ae.nombre_completo   AS autor,
    ae.grado,
    ae.institucion,
    (SELECT COUNT(*) FROM comentarios_narrativa cn WHERE cn.narrativa_id = nc.id)     AS total_comentarios,
    (SELECT COUNT(*) FROM comentarios_narrativa cn WHERE cn.narrativa_id = nc.id AND cn.leido = FALSE) AS comentarios_sin_leer,
    (SELECT COUNT(*) FROM storyboard_frames sf WHERE sf.narrativa_id = nc.id)         AS frames_storyboard,
    (SELECT COUNT(*) FROM audio_recordings ar WHERE ar.narrativa_id = nc.id)          AS grabaciones
FROM narrativas_culturales nc
JOIN autores_estudiante ae ON ae.id = nc.autor_id
ORDER BY nc.updated_at DESC;

COMMENT ON VIEW v_narrativas_por_docente IS '[HU-10] Seguimiento pedagógico completo: estado, comentarios, storyboard y audio.';


-- ── v_perfil_autor ──────────────────────────────────────────
--  HU-06/15: perfil público del estudiante-autor en el repositorio
CREATE OR REPLACE VIEW v_perfil_autor AS
SELECT
    ae.id,
    ae.nombre_completo,
    ae.grado,
    ae.institucion,
    ae.region_cultural,
    ae.lengua_materna,
    ae.bio,
    ae.foto_perfil_url,
    ae.narrativas_publicadas,
    ae.created_at,
    (SELECT jsonb_agg(tipo ORDER BY otorgado_en)
     FROM badges_estudiante WHERE autor_id = ae.id)                AS badges,
    (SELECT COUNT(*) FROM narrativas_culturales
     WHERE autor_id = ae.id AND estado = 'publicada')              AS publicadas,
    (SELECT COALESCE(SUM(veces_vista), 0)
     FROM narrativas_culturales
     WHERE autor_id = ae.id AND estado = 'publicada')              AS total_vistas_recibidas
FROM autores_estudiante ae;

COMMENT ON VIEW v_perfil_autor IS '[HU-06,15] Perfil público del autor con badges, narrativas publicadas y vistas totales.';


-- ── v_actividad_reciente ────────────────────────────────────
--  HU-13: últimas actividades para el dashboard (tiempo real)
CREATE OR REPLACE VIEW v_actividad_reciente AS
SELECT
    cal.id,
    cal.tipo_actividad,
    cal.duracion_minutos,
    cal.fecha,
    cal.metadata,
    ae.nombre_completo  AS autor,
    ae.grado,
    nc.titulo           AS narrativa
FROM creative_activity_log cal
JOIN autores_estudiante ae ON ae.id = cal.autor_id
LEFT JOIN narrativas_culturales nc ON nc.id = cal.narrativa_id
ORDER BY cal.fecha DESC, cal.id DESC;

COMMENT ON VIEW v_actividad_reciente IS '[HU-13] Feed de actividad creativa reciente. CA2: datos en tiempo real.';


-- ── v_storyboard_completo ───────────────────────────────────
--  HU-05: vista del storyboard con frames ordenados
CREATE OR REPLACE VIEW v_storyboard_completo AS
SELECT
    sf.narrativa_id,
    nc.titulo           AS narrativa_titulo,
    ae.nombre_completo  AS autor,
    sf.id               AS frame_id,
    sf.orden,
    sf.imagen_url,
    sf.texto_escena,
    sf.prompt_usado,
    sf.estado_generacion,
    sf.created_at,
    (SELECT COUNT(*) FROM storyboard_frames sf2
     WHERE sf2.narrativa_id = sf.narrativa_id
       AND sf2.estado_generacion = 'listo')  AS frames_listos
FROM storyboard_frames sf
JOIN narrativas_culturales nc ON nc.id = sf.narrativa_id
JOIN autores_estudiante ae    ON ae.id = nc.autor_id
ORDER BY sf.narrativa_id, sf.orden;

COMMENT ON VIEW v_storyboard_completo IS '[HU-05] Frames del storyboard ordenados con estado de generación IA.';


-- ── v_conversaciones_ia ─────────────────────────────────────
--  HU-01/03: historial de conversaciones IA por narrativa
CREATE OR REPLACE VIEW v_conversaciones_ia AS
SELECT
    ac.id               AS conversation_id,
    ac.narrativa_id,
    ac.proposito,
    ac.modelo_usado,
    ac.tokens_usados,
    ac.created_at,
    nc.titulo           AS narrativa_titulo,
    ae.nombre_completo  AS autor,
    COUNT(am.id)        AS total_mensajes
FROM ai_conversations ac
JOIN narrativas_culturales nc ON nc.id = ac.narrativa_id
JOIN autores_estudiante ae    ON ae.id = nc.autor_id
LEFT JOIN ai_messages am      ON am.conversation_id = ac.id
GROUP BY ac.id, ac.narrativa_id, ac.proposito, ac.modelo_usado,
         ac.tokens_usados, ac.created_at, nc.titulo, ae.nombre_completo
ORDER BY ac.created_at DESC;

COMMENT ON VIEW v_conversaciones_ia IS '[HU-01,03] Historial de sesiones IA por narrativa para el AI Adapter (OE3).';


-- ── v_metricas_nlp ──────────────────────────────────────────
--  HU-16: estado de clasificación NLP del catálogo
CREATE OR REPLACE VIEW v_metricas_nlp AS
SELECT
    nc.id               AS narrativa_id,
    nc.titulo,
    nc.region_cultural,
    nc.tipo_relato,
    nc.fecha_publicacion,
    nlp.temas_principales,
    nlp.palabras_clave,
    nlp.personajes_detectados,
    nlp.lugar_paisaje,
    nlp.confianza,
    nlp.modelo_nlp,
    nlp.procesada_en,
    CASE WHEN nlp.id IS NULL THEN FALSE ELSE TRUE END AS clasificada
FROM narrativas_culturales nc
LEFT JOIN nlp_classifications nlp ON nlp.narrativa_id = nc.id
WHERE nc.estado = 'publicada'
ORDER BY clasificada ASC, nc.fecha_publicacion DESC;

COMMENT ON VIEW v_metricas_nlp IS '[HU-16] Estado de clasificación NLP del catálogo. Identifica narrativas sin clasificar.';
