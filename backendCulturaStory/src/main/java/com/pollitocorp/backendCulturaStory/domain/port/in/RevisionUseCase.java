package com.pollitocorp.backendCulturaStory.domain.port.in;

import com.pollitocorp.backendCulturaStory.domain.model.NarrativaCultural;

import java.util.List;
import java.util.UUID;

public interface RevisionUseCase {
    List<NarrativaCultural> obtenerNarrativasPorGradoDocente(String grado);
    void aprobarNarrativa(UUID narrativaId, UUID docenteId);
    void rechazarNarrativa(UUID narrativaId, UUID docenteId, String motivo);
}
