package com.pollitocorp.backendCulturaStory.domain.port.in;

import com.pollitocorp.backendCulturaStory.domain.model.NarrativaCultural;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface NarrativaUseCase {
    NarrativaCultural crearNarrativa(NarrativaCultural narrativa);
    NarrativaCultural guardarNarrativa(NarrativaCultural narrativa);
    Optional<NarrativaCultural> obtenerPorId(UUID id);
    List<NarrativaCultural> obtenerPorAutor(UUID autorId);
    String generarEsquema(String cultura);
}
