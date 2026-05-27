package com.pollitocorp.backendCulturaStory.application.service;

import com.pollitocorp.backendCulturaStory.domain.model.AutorEstudiante;
import com.pollitocorp.backendCulturaStory.domain.model.NarrativaCultural;
import com.pollitocorp.backendCulturaStory.domain.model.Usuario;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.in.rest.dto.StudentSummaryResponse;
import com.pollitocorp.backendCulturaStory.support.TestDoubles.InMemoryAutorRepository;
import com.pollitocorp.backendCulturaStory.support.TestDoubles.InMemoryNarrativaRepository;
import com.pollitocorp.backendCulturaStory.support.TestDoubles.InMemoryUsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class DocenteServiceTest {

    private InMemoryAutorRepository autorRepository;
    private InMemoryNarrativaRepository narrativaRepository;
    private InMemoryUsuarioRepository usuarioRepository;
    private DocenteService docenteService;

    @BeforeEach
    void setUp() {
        autorRepository = new InMemoryAutorRepository();
        narrativaRepository = new InMemoryNarrativaRepository();
        usuarioRepository = new InMemoryUsuarioRepository();
        docenteService = new DocenteService(autorRepository, narrativaRepository, usuarioRepository);
    }

    @Test
    void listarEstudiantesPorGradoSoloIncluyeUsuariosConRolEstudiante() {
        UUID estudianteUserId = UUID.randomUUID();
        UUID docenteUserId = UUID.randomUUID();
        usuarioRepository.save(Usuario.builder().id(estudianteUserId).email("est@test.com").rol("estudiante").build());
        usuarioRepository.save(Usuario.builder().id(docenteUserId).email("doc@test.com").rol("docente").build());

        autorRepository.save(AutorEstudiante.builder()
                .id(UUID.randomUUID())
                .userId(estudianteUserId)
                .nombreCompleto("Estudiante Uno")
                .grado("5to")
                .institucion("IE 123")
                .build());
        autorRepository.save(AutorEstudiante.builder()
                .id(UUID.randomUUID())
                .userId(docenteUserId)
                .nombreCompleto("No Debe Salir")
                .grado("5to")
                .build());

        List<StudentSummaryResponse> response = docenteService.listarEstudiantesPorGrado("5to");

        assertEquals(1, response.size());
        assertEquals("Estudiante Uno", response.get(0).getNombreCompleto());
        assertEquals("est@test.com", response.get(0).getEmail());
    }

    @Test
    void obtenerNarrativasPorAutorDevuelveNarrativasRegistradas() {
        UUID autorId = UUID.randomUUID();
        narrativaRepository.save(NarrativaCultural.builder()
                .id(UUID.randomUUID())
                .titulo("Relato 1")
                .autor(AutorEstudiante.builder().id(autorId).build())
                .build());

        List<NarrativaCultural> response = docenteService.obtenerNarrativasPorAutor(autorId);

        assertEquals(1, response.size());
        assertEquals("Relato 1", response.get(0).getTitulo());
    }
}
