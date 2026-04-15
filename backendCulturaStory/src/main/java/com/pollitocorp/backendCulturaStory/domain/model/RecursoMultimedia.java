package com.pollitocorp.backendCulturaStory.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecursoMultimedia {
    private UUID id;
    private TipoRecurso tipo;
    private String url;
    private Map<String, Object> metadata;
    private UUID narrativaId;

    public enum TipoRecurso {
        AUDIO_STT,
        AUDIO_TTS,
        STORYBOARD_FRAME,
        ILUSTRACION
    }
}
