package com.pollitocorp.backendCulturaStory.domain.port.out;

import com.pollitocorp.backendCulturaStory.domain.model.AutorEstudiante;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AutorRepositoryPort {
    AutorEstudiante save(AutorEstudiante autor);
    Optional<AutorEstudiante> findById(UUID id);
    Optional<AutorEstudiante> findByUserId(UUID userId);
    List<AutorEstudiante> findByGrado(String grado);
    List<AutorEstudiante> findAll();
}
