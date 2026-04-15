package com.pollitocorp.backendCulturaStory.application.service;

import com.pollitocorp.backendCulturaStory.domain.model.EstadoNarrativa;
import com.pollitocorp.backendCulturaStory.domain.model.NarrativaCultural;
import com.pollitocorp.backendCulturaStory.domain.port.in.RevisionUseCase;
import com.pollitocorp.backendCulturaStory.domain.port.out.NarrativaRepositoryPort;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
public class RevisionService implements RevisionUseCase {

    private final NarrativaRepositoryPort repositoryPort;

    @Override
    public List<NarrativaCultural> obtenerNarrativasPorGradoDocente(String grado) {
        return repositoryPort.findByGrado(grado);
    }

    @Override
    public void aprobarNarrativa(UUID narrativaId, UUID docenteId) {
        repositoryPort.findById(narrativaId).ifPresent(narrativa -> {
            narrativa.setEstado(EstadoNarrativa.PUBLICADA);
            narrativa.setFechaPublicacion(LocalDateTime.now());
            repositoryPort.save(narrativa);
        });
    }

    @Override
    public void rechazarNarrativa(UUID narrativaId, UUID docenteId, String motivo) {
        repositoryPort.findById(narrativaId).ifPresent(narrativa -> {
            narrativa.setEstado(EstadoNarrativa.RECHAZADA);
            // Podríamos loguear el motivo o guardarlo en un campo de comentarios
            repositoryPort.save(narrativa);
        });
    }
}
