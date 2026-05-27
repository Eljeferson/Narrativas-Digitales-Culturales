package com.pollitocorp.backendCulturaStory.modules.narrativa.domain.port.in;

import com.pollitocorp.backendCulturaStory.modules.narrativa.domain.model.NarrativaCultural;
import com.pollitocorp.backendCulturaStory.modules.narrativa.domain.model.StudentSummary;

import java.util.List;
import java.util.UUID;

public interface DocenteUseCase {
    List<StudentSummary> listarEstudiantesPorGrado(String grado);
    List<NarrativaCultural> obtenerNarrativasPorAutor(UUID autorId);
}
