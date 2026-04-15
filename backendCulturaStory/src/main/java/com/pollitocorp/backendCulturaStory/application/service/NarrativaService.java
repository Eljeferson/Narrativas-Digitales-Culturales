package com.pollitocorp.backendCulturaStory.application.service;

import com.pollitocorp.backendCulturaStory.domain.model.EstadoNarrativa;
import com.pollitocorp.backendCulturaStory.domain.model.NarrativaCultural;
import com.pollitocorp.backendCulturaStory.domain.port.in.NarrativaUseCase;
import com.pollitocorp.backendCulturaStory.domain.port.out.AIPort;
import com.pollitocorp.backendCulturaStory.domain.port.out.NarrativaRepositoryPort;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
public class NarrativaService implements NarrativaUseCase {

    private final NarrativaRepositoryPort repositoryPort;
    private final AIPort aiPort;

    @Override
    public NarrativaCultural crearNarrativa(NarrativaCultural narrativa) {
        narrativa.setId(UUID.randomUUID());
        narrativa.setEstado(EstadoNarrativa.BORRADOR);
        narrativa.setCreatedAt(LocalDateTime.now());
        narrativa.setUpdatedAt(LocalDateTime.now());
        return repositoryPort.save(narrativa);
    }

    @Override
    public NarrativaCultural guardarNarrativa(NarrativaCultural narrativa) {
        narrativa.setUpdatedAt(LocalDateTime.now());
        return repositoryPort.save(narrativa);
    }

    @Override
    public Optional<NarrativaCultural> obtenerPorId(UUID id) {
        return repositoryPort.findById(id);
    }

    @Override
    public List<NarrativaCultural> obtenerPorAutor(UUID autorId) {
        return repositoryPort.findByAutorId(autorId);
    }

    @Override
    public String generarEsquema(String cultura) {
        // HU-01: Generar esquema narrativo con IA
        String prompt = "Genera un esquema narrativo para una historia de la cultura " + cultura + 
                         ". Incluye personajes, escenarios auténticos y una estructura de inicio, nudo y desenlace.";
        Map<String, Object> params = new HashMap<>();
        params.put("region", cultura);
        return aiPort.generarTexto(prompt, params);
    }
}
