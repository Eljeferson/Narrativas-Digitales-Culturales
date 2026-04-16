package com.pollitocorp.backendCulturaStory.application.service;

import com.pollitocorp.backendCulturaStory.domain.model.AutorEstudiante;
import com.pollitocorp.backendCulturaStory.domain.model.EstadoNarrativa;
import com.pollitocorp.backendCulturaStory.domain.model.NarrativaCultural;
import com.pollitocorp.backendCulturaStory.domain.port.in.NarrativaUseCase;
import com.pollitocorp.backendCulturaStory.domain.port.out.AIPort;
import com.pollitocorp.backendCulturaStory.domain.port.out.AutorRepositoryPort;
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
    private final AutorRepositoryPort autorRepositoryPort;
    private final AIPort aiPort;

    @Override
    public NarrativaCultural crearNarrativa(NarrativaCultural narrativa) {
        // Validar y cargar el autor completo desde la BD
        if (narrativa.getAutor() == null || narrativa.getAutor().getId() == null) {
            throw new RuntimeException("Se requiere un autor con un ID válido para crear la narrativa");
        }
        AutorEstudiante autorCompleto = autorRepositoryPort.findById(narrativa.getAutor().getId())
                .orElseThrow(() -> new RuntimeException(
                        "No se encontró el autor con ID: " + narrativa.getAutor().getId() + 
                        ". Asegúrese de que el estudiante esté registrado como autor."));
        narrativa.setAutor(autorCompleto);

        narrativa.setId(UUID.randomUUID());
        narrativa.setEstado(EstadoNarrativa.BORRADOR);
        
        if (narrativa.getDestacada() == null) narrativa.setDestacada(false);
        if (narrativa.getVecesVista() == null) narrativa.setVecesVista(0);
        if (narrativa.getTipoRelato() == null) narrativa.setTipoRelato("leyenda"); // Default cultural type
        
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
