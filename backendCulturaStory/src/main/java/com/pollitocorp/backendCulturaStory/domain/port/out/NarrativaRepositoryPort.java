package com.pollitocorp.backendCulturaStory.domain.port.out;

import com.pollitocorp.backendCulturaStory.domain.model.NarrativaCultural;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface NarrativaRepositoryPort {
    NarrativaCultural save(NarrativaCultural narrativa);
    Optional<NarrativaCultural> findById(UUID id);
    List<NarrativaCultural> findByAutorId(UUID autorId);
    List<NarrativaCultural> findByGrado(String grado);
}
