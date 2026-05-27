package com.pollitocorp.backendCulturaStory.application.service;

import com.pollitocorp.backendCulturaStory.domain.model.AutorEstudiante;
import com.pollitocorp.backendCulturaStory.domain.model.EstadoNarrativa;
import com.pollitocorp.backendCulturaStory.domain.model.NarrativaCultural;
import com.pollitocorp.backendCulturaStory.support.TestDoubles.InMemoryNarrativaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class RevisionServiceTest {

    private InMemoryNarrativaRepository narrativaRepository;
    private RevisionService revisionService;

    @BeforeEach
    void setUp() {
        narrativaRepository = new InMemoryNarrativaRepository();
        revisionService = new RevisionService(narrativaRepository);
    }

    @Test
    void obtenerNarrativasPorGradoDocenteDevuelveCoincidencias() {
        narrativaRepository.save(NarrativaCultural.builder()
                .id(UUID.randomUUID())
                .titulo("Relato 5to")
                .autor(AutorEstudiante.builder().id(UUID.randomUUID()).grado("5to").build())
                .build());

        List<NarrativaCultural> response = revisionService.obtenerNarrativasPorGradoDocente("5to");

        assertEquals(1, response.size());
    }

    @Test
    void aprobarNarrativaLaPublicaYAsignaFecha() {
        UUID narrativaId = UUID.randomUUID();
        NarrativaCultural narrativa = NarrativaCultural.builder()
                .id(narrativaId)
                .estado(EstadoNarrativa.BORRADOR)
                .autor(AutorEstudiante.builder().id(UUID.randomUUID()).grado("5to").build())
                .build();
        narrativaRepository.save(narrativa);

        revisionService.aprobarNarrativa(narrativaId, UUID.randomUUID());

        NarrativaCultural updated = narrativaRepository.findById(narrativaId).orElseThrow();
        assertEquals(EstadoNarrativa.PUBLICADA, updated.getEstado());
        assertNotNull(updated.getFechaPublicacion());
    }

    @Test
    void rechazarNarrativaLaMarcaComoRechazada() {
        UUID narrativaId = UUID.randomUUID();
        NarrativaCultural narrativa = NarrativaCultural.builder()
                .id(narrativaId)
                .estado(EstadoNarrativa.BORRADOR)
                .autor(AutorEstudiante.builder().id(UUID.randomUUID()).grado("5to").build())
                .build();
        narrativaRepository.save(narrativa);

        revisionService.rechazarNarrativa(narrativaId, UUID.randomUUID(), "Falta correccion");

        NarrativaCultural updated = narrativaRepository.findById(narrativaId).orElseThrow();
        assertEquals(EstadoNarrativa.RECHAZADA, updated.getEstado());
    }
}
