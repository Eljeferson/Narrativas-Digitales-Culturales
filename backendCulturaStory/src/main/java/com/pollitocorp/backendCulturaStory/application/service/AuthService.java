package com.pollitocorp.backendCulturaStory.application.service;

import com.pollitocorp.backendCulturaStory.domain.model.AutorEstudiante;
import com.pollitocorp.backendCulturaStory.domain.model.Usuario;
import com.pollitocorp.backendCulturaStory.domain.port.out.AutorRepositoryPort;
import com.pollitocorp.backendCulturaStory.domain.port.out.UsuarioRepositoryPort;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.in.rest.dto.AuthProfileResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepositoryPort usuarioRepository;
    private final AutorRepositoryPort autorRepository;
    public AuthProfileResponse registrarUsuario(Usuario usuario, String nombreCompleto, String grado, String regionCultural,
                                                String institucion, String lenguaMaterna, String bio, String fotoPerfilUrl,
                                                String password, String rolSolicitado) {
        if (password == null || password.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La contrasena es obligatoria.");
        }

        String rol = "docente".equalsIgnoreCase(rolSolicitado) ? "docente" : "estudiante";

        // PMV1: registro publico solo para estudiante/docente. Admin queda fijo.
        usuario.setRol(rol);
        usuario.setActivo(true);
        usuario.setCreatedAt(LocalDateTime.now());
        Usuario savedUser = usuarioRepository.save(usuario);

        AutorEstudiante autor = AutorEstudiante.builder()
                .id(UUID.randomUUID())
                .userId(savedUser.getId())
                .nombreCompleto(nombreCompleto)
                .grado(grado)
                .institucion(institucion)
                .regionCultural(regionCultural)
                .lenguaMaterna(lenguaMaterna)
                .bio(bio)
                .fotoPerfilUrl(fotoPerfilUrl)
                .password(password)
                .narrativasPublicadas(0)
                .createdAt(LocalDateTime.now())
                .build();
        AutorEstudiante savedAuthor = autorRepository.save(autor);

        return AuthProfileResponse.builder()
                .usuario(savedUser)
                .autor(savedAuthor)
                .build();
    }

    public Optional<AuthProfileResponse> sincronizarSesion(String email) {
        // HU-07: Sincronización con Supabase Auth
        return usuarioRepository.findByEmail(email)
                .map(usuario -> AuthProfileResponse.builder()
                        .usuario(usuario)
                        .autor(autorRepository.findByUserId(usuario.getId()).orElse(null))
                        .build());
    }

    public AuthProfileResponse iniciarSesion(String email, String password, String rolEsperado) {
        if ("admin".equalsIgnoreCase(email) && "admin123".equals(password)) {
            Usuario admin = Usuario.builder()
                    .id(UUID.fromString("00000000-0000-0000-0000-000000000001"))
                    .email("admin")
                    .rol("administrador")
                    .activo(true)
                    .createdAt(LocalDateTime.now())
                    .build();

            return AuthProfileResponse.builder()
                    .usuario(admin)
                    .autor(null)
                    .build();
        }

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales incorrectas."));

        AutorEstudiante autor = autorRepository.findByUserId(usuario.getId()).orElse(null);

        String storedPassword = autor != null ? autor.getPassword() : null;
        boolean matches = storedPassword != null && password.equals(storedPassword);

        if (!matches) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales incorrectas.");
        }

        if (rolEsperado != null
                && !rolEsperado.isBlank()
                && !"admin".equalsIgnoreCase(rolEsperado)
                && !usuario.getRol().equalsIgnoreCase(rolEsperado)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "El tipo de perfil seleccionado no coincide con la cuenta.");
        }

        return AuthProfileResponse.builder()
                .usuario(usuario)
                .autor(autor)
                .build();
    }
}
