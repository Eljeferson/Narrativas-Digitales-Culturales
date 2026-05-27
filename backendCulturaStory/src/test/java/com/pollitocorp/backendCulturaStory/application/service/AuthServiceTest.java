package com.pollitocorp.backendCulturaStory.application.service;

import com.pollitocorp.backendCulturaStory.domain.model.AutorEstudiante;
import com.pollitocorp.backendCulturaStory.domain.model.Usuario;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.in.rest.dto.AuthProfileResponse;
import com.pollitocorp.backendCulturaStory.support.TestDoubles.InMemoryAutorRepository;
import com.pollitocorp.backendCulturaStory.support.TestDoubles.InMemoryUsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class AuthServiceTest {

    private InMemoryUsuarioRepository usuarioRepository;
    private InMemoryAutorRepository autorRepository;
    private AuthService authService;

    @BeforeEach
    void setUp() {
        usuarioRepository = new InMemoryUsuarioRepository();
        autorRepository = new InMemoryAutorRepository();
        authService = new AuthService(usuarioRepository, autorRepository);
    }

    @Test
    void registrarUsuarioGuardaPerfilDeEstudianteConPassword() {
        Usuario usuario = Usuario.builder()
                .id(UUID.randomUUID())
                .email("ana@test.com")
                .build();

        AuthProfileResponse response = authService.registrarUsuario(
                usuario,
                "Ana Quispe",
                "5to",
                "Cusco",
                "IE 123",
                "Quechua",
                "Narradora escolar",
                null,
                "secreta123",
                "estudiante"
        );

        assertEquals("estudiante", response.getUsuario().getRol());
        assertTrue(response.getUsuario().isActivo());
        assertNotNull(response.getAutor());
        assertEquals("Ana Quispe", response.getAutor().getNombreCompleto());
        assertEquals("secreta123", response.getAutor().getPassword());
        assertEquals(0, response.getAutor().getNarrativasPublicadas());
    }

    @Test
    void registrarUsuarioAceptaRolDocente() {
        Usuario usuario = Usuario.builder()
                .id(UUID.randomUUID())
                .email("docente@test.com")
                .build();

        AuthProfileResponse response = authService.registrarUsuario(
                usuario,
                "Marta Ramos",
                null,
                null,
                null,
                null,
                null,
                null,
                "clave123",
                "docente"
        );

        assertEquals("docente", response.getUsuario().getRol());
    }

    @Test
    void registrarUsuarioSinPasswordLanzaBadRequest() {
        Usuario usuario = Usuario.builder()
                .id(UUID.randomUUID())
                .email("sinclave@test.com")
                .build();

        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> authService.registrarUsuario(usuario, "Ana", null, null, null, null, null, null, "", "estudiante")
        );

        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
    }

    @Test
    void sincronizarSesionRetornaUsuarioYAutor() {
        Usuario usuario = Usuario.builder()
                .id(UUID.randomUUID())
                .email("perfil@test.com")
                .rol("estudiante")
                .activo(true)
                .build();
        usuarioRepository.save(usuario);
        autorRepository.save(AutorEstudiante.builder()
                .id(UUID.randomUUID())
                .userId(usuario.getId())
                .nombreCompleto("Perfil Test")
                .password("123")
                .build());

        Optional<AuthProfileResponse> response = authService.sincronizarSesion("perfil@test.com");

        assertTrue(response.isPresent());
        assertEquals("perfil@test.com", response.get().getUsuario().getEmail());
        assertEquals("Perfil Test", response.get().getAutor().getNombreCompleto());
    }

    @Test
    void iniciarSesionAdminUsaCredencialesEspeciales() {
        AuthProfileResponse response = authService.iniciarSesion("admin", "admin123", "admin");

        assertEquals("admin", response.getUsuario().getEmail());
        assertEquals("administrador", response.getUsuario().getRol());
        assertNull(response.getAutor());
    }

    @Test
    void iniciarSesionConPasswordIncorrectaLanzaUnauthorized() {
        Usuario usuario = Usuario.builder()
                .id(UUID.randomUUID())
                .email("login@test.com")
                .rol("estudiante")
                .activo(true)
                .build();
        usuarioRepository.save(usuario);
        autorRepository.save(AutorEstudiante.builder()
                .id(UUID.randomUUID())
                .userId(usuario.getId())
                .nombreCompleto("Login Test")
                .password("correcta")
                .build());

        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> authService.iniciarSesion("login@test.com", "incorrecta", "estudiante")
        );

        assertEquals(HttpStatus.UNAUTHORIZED, exception.getStatusCode());
    }

    @Test
    void iniciarSesionConRolDiferenteLanzaUnauthorized() {
        Usuario usuario = Usuario.builder()
                .id(UUID.randomUUID())
                .email("rol@test.com")
                .rol("docente")
                .activo(true)
                .build();
        usuarioRepository.save(usuario);
        autorRepository.save(AutorEstudiante.builder()
                .id(UUID.randomUUID())
                .userId(usuario.getId())
                .nombreCompleto("Rol Test")
                .password("1234")
                .build());

        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> authService.iniciarSesion("rol@test.com", "1234", "estudiante")
        );

        assertEquals(HttpStatus.UNAUTHORIZED, exception.getStatusCode());
    }
}
