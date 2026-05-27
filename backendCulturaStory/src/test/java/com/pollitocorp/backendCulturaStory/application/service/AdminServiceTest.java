package com.pollitocorp.backendCulturaStory.application.service;

import com.pollitocorp.backendCulturaStory.domain.model.Usuario;
import com.pollitocorp.backendCulturaStory.support.TestDoubles.InMemoryRolChangeLogRepository;
import com.pollitocorp.backendCulturaStory.support.TestDoubles.InMemoryUsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class AdminServiceTest {

    private InMemoryUsuarioRepository usuarioRepository;
    private InMemoryRolChangeLogRepository logRepository;
    private AdminService adminService;

    @BeforeEach
    void setUp() {
        usuarioRepository = new InMemoryUsuarioRepository();
        logRepository = new InMemoryRolChangeLogRepository();
        adminService = new AdminService(usuarioRepository, logRepository);
    }

    @Test
    void listarUsuariosDevuelveTodosLosUsuarios() {
        usuarioRepository.save(Usuario.builder().id(UUID.randomUUID()).email("uno@test.com").rol("estudiante").build());
        usuarioRepository.save(Usuario.builder().id(UUID.randomUUID()).email("dos@test.com").rol("docente").build());

        assertEquals(2, adminService.listarUsuarios().size());
    }

    @Test
    void cambiarRolActualizaUsuarioYGeneraLog() {
        UUID usuarioId = UUID.randomUUID();
        UUID adminId = UUID.randomUUID();
        usuarioRepository.save(Usuario.builder().id(usuarioId).email("cambio@test.com").rol("estudiante").build());

        Usuario actualizado = adminService.cambiarRol(usuarioId, "docente", adminId, "Promocion academica");

        assertEquals("docente", actualizado.getRol());
        assertEquals(1, logRepository.getLogs().size());
        assertEquals("estudiante", logRepository.getLogs().get(0).getRolAnterior());
        assertEquals("docente", logRepository.getLogs().get(0).getRolNuevo());
        assertEquals(adminId, logRepository.getLogs().get(0).getCambiadoPor());
    }

    @Test
    void cambiarRolLanzaErrorSiUsuarioNoExiste() {
        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> adminService.cambiarRol(UUID.randomUUID(), "docente", UUID.randomUUID(), "Motivo")
        );

        assertEquals("Usuario no encontrado", exception.getMessage());
    }
}
