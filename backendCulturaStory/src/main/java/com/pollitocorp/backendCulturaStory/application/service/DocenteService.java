package com.pollitocorp.backendCulturaStory.application.service;

import com.pollitocorp.backendCulturaStory.domain.model.AutorEstudiante;
import com.pollitocorp.backendCulturaStory.domain.model.NarrativaCultural;
import com.pollitocorp.backendCulturaStory.domain.port.out.AutorRepositoryPort;
import com.pollitocorp.backendCulturaStory.domain.port.out.NarrativaRepositoryPort;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
public class DocenteService {

    private final AutorRepositoryPort autorRepository;
    private final NarrativaRepositoryPort narrativaRepository;

    public List<AutorEstudiante> listarEstudiantesPorGrado(String grado) {
        // HU-09: Listado de estudiantes del grado
        return autorRepository.findByGrado(grado);
    }

    public List<NarrativaCultural> obtenerNarrativasPorAutor(UUID autorId) {
        // HU-09: Seguimiento personalizado
        return narrativaRepository.findByAutorId(autorId);
    }
}
