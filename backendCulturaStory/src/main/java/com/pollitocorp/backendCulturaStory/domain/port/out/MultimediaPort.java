package com.pollitocorp.backendCulturaStory.domain.port.out;

import com.pollitocorp.backendCulturaStory.domain.model.RecursoMultimedia;

import java.util.UUID;

public interface MultimediaPort {
    String subirRecurso(RecursoMultimedia recurso);
    void eliminarRecurso(UUID recursoId);
}
