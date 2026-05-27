package com.pollitocorp.backendCulturaStory.application.service;

import com.pollitocorp.backendCulturaStory.domain.model.AutorEstudiante;
import com.pollitocorp.backendCulturaStory.domain.model.EstadoNarrativa;
import com.pollitocorp.backendCulturaStory.domain.model.NarrativaCultural;
import com.pollitocorp.backendCulturaStory.support.TestDoubles.FakeAIPort;
import com.pollitocorp.backendCulturaStory.support.TestDoubles.InMemoryAutorRepository;
import com.pollitocorp.backendCulturaStory.support.TestDoubles.InMemoryNarrativaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class NarrativaServiceTest {

    private InMemoryNarrativaRepository narrativaRepository;
    private InMemoryAutorRepository autorRepository;
    private FakeAIPort aiPort;
    private NarrativaService narrativaService;

    @BeforeEach
    void setUp() {
        narrativaRepository = new InMemoryNarrativaRepository();
        autorRepository = new InMemoryAutorRepository();
        aiPort = new FakeAIPort();
        narrativaService = new NarrativaService(narrativaRepository, autorRepository, aiPort);
    }

    @Test
    void crearNarrativaCompletaDatosPorDefectoYGuardaAutorCompleto() {
        AutorEstudiante autor = AutorEstudiante.builder()
                .id(UUID.randomUUID())
                .userId(UUID.randomUUID())
                .nombreCompleto("Ana")
                .grado("5to")
                .build();
        autorRepository.save(autor);

        NarrativaCultural creada = narrativaService.crearNarrativa(NarrativaCultural.builder()
                .titulo("Mi historia")
                .contenido("Contenido")
                .regionCultural("Cusco")
                .autor(AutorEstudiante.builder().id(autor.getId()).build())
                .build());

        assertNotNull(creada.getId());
        assertEquals(EstadoNarrativa.BORRADOR, creada.getEstado());
        assertFalse(creada.getDestacada());
        assertEquals(0, creada.getVecesVista());
        assertEquals("leyenda", creada.getTipoRelato());
        assertEquals("Ana", creada.getAutor().getNombreCompleto());
        assertNotNull(creada.getCreatedAt());
        assertNotNull(creada.getUpdatedAt());
    }

    @Test
    void crearNarrativaSinAutorValidoLanzaError() {
        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> narrativaService.crearNarrativa(NarrativaCultural.builder()
                        .titulo("Sin autor")
                        .autor(AutorEstudiante.builder().build())
                        .build())
        );

        assertTrue(exception.getMessage().contains("Se requiere un autor"));
    }

    @Test
    void crearNarrativaConAutorInexistenteLanzaError() {
        UUID autorId = UUID.randomUUID();

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> narrativaService.crearNarrativa(NarrativaCultural.builder()
                        .titulo("Autor faltante")
                        .autor(AutorEstudiante.builder().id(autorId).build())
                        .build())
        );

        assertTrue(exception.getMessage().contains(autorId.toString()));
    }

    @Test
    void guardarNarrativaActualizaFechaDeModificacion() {
        NarrativaCultural narrativa = NarrativaCultural.builder()
                .id(UUID.randomUUID())
                .titulo("Editable")
                .autor(AutorEstudiante.builder().id(UUID.randomUUID()).build())
                .build();

        NarrativaCultural saved = narrativaService.guardarNarrativa(narrativa);

        assertNotNull(saved.getUpdatedAt());
    }

    @Test
    void obtenerPorIdYAutorDeleganAlRepositorio() {
        UUID autorId = UUID.randomUUID();
        UUID narrativaId = UUID.randomUUID();
        NarrativaCultural narrativa = NarrativaCultural.builder()
                .id(narrativaId)
                .titulo("Buscada")
                .autor(AutorEstudiante.builder().id(autorId).build())
                .build();
        narrativaRepository.save(narrativa);

        Optional<NarrativaCultural> byId = narrativaService.obtenerPorId(narrativaId);

        assertTrue(byId.isPresent());
        assertEquals(1, narrativaService.obtenerPorAutor(autorId).size());
    }

    @Test
    void generarEsquemaUsaPuertoDeIaConRegion() {
        String response = narrativaService.generarEsquema("Puno");

        assertEquals("Esquema generado para Puno", response);
        assertTrue(aiPort.getLastPrompt().contains("Puno"));
        assertEquals("Puno", aiPort.getLastParams().get("region"));
    }
}
