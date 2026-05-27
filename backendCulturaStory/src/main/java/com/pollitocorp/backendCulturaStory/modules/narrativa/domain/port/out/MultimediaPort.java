package com.pollitocorp.backendCulturaStory.modules.narrativa.domain.port.out;

import com.pollitocorp.backendCulturaStory.modules.narrativa.domain.model.RecursoMultimedia;

import java.util.UUID;

public interface MultimediaPort {
    String subirRecurso(RecursoMultimedia recurso);
    void eliminarRecurso(UUID recursoId);
}
