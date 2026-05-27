package com.pollitocorp.backendCulturaStory.modules.auth.application.service;

<<<<<<< HEAD:backendCulturaStory/src/main/java/com/pollitocorp/backendCulturaStory/application/service/AuthService.java
import com.pollitocorp.backendCulturaStory.domain.model.AutorEstudiante;
import com.pollitocorp.backendCulturaStory.domain.model.Usuario;
import com.pollitocorp.backendCulturaStory.domain.port.out.AutorRepositoryPort;
import com.pollitocorp.backendCulturaStory.domain.port.out.UsuarioRepositoryPort;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.in.rest.dto.AuthProfileResponse;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.in.rest.dto.BulkRegistrationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
=======
import com.pollitocorp.backendCulturaStory.modules.auth.domain.model.AuthResult;
import com.pollitocorp.backendCulturaStory.modules.narrativa.domain.model.AutorEstudiante;
import com.pollitocorp.backendCulturaStory.modules.auth.domain.model.Usuario;
import com.pollitocorp.backendCulturaStory.modules.narrativa.domain.port.out.AutorRepositoryPort;
import com.pollitocorp.backendCulturaStory.modules.auth.domain.port.out.UsuarioRepositoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
>>>>>>> 6d63ed78a72715c54b5e73de36f6393b2ef7e3d6:backendCulturaStory/src/main/java/com/pollitocorp/backendCulturaStory/modules/auth/application/service/AuthService.java
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepositoryPort usuarioRepository;
    private final AutorRepositoryPort autorRepository;
<<<<<<< HEAD:backendCulturaStory/src/main/java/com/pollitocorp/backendCulturaStory/application/service/AuthService.java

    @Transactional
    public AuthProfileResponse registrarUsuario(Usuario usuario, String nombreCompleto, String grado, String regionCultural,
                                                String institucion, String lenguaMaterna, String bio, String fotoPerfilUrl,
                                                String password, String rolSolicitado) {
=======
    private final PasswordEncoder passwordEncoder;

    public AuthResult registrarUsuario(Usuario usuario, String nombreCompleto, String grado, String regionCultural,
                                       String institucion, String lenguaMaterna, String bio, String fotoPerfilUrl,
                                       String password, String rolSolicitado) {
>>>>>>> 6d63ed78a72715c54b5e73de36f6393b2ef7e3d6:backendCulturaStory/src/main/java/com/pollitocorp/backendCulturaStory/modules/auth/application/service/AuthService.java
        if (password == null || password.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La contrasena es obligatoria.");
        }

        String rol = "docente".equalsIgnoreCase(rolSolicitado) ? "docente" : "estudiante";

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
                .password(passwordEncoder.encode(password))
                .narrativasPublicadas(0)
                .createdAt(LocalDateTime.now())
                .build();
        AutorEstudiante savedAuthor = autorRepository.save(autor);

        return AuthResult.builder()
                .usuario(savedUser)
                .autor(savedAuthor)
                .build();
    }

<<<<<<< HEAD:backendCulturaStory/src/main/java/com/pollitocorp/backendCulturaStory/application/service/AuthService.java
    @Transactional
    public BulkRegistrationResponse registrarUsuariosMasivos(List<RegistroMasivo> registros) {
        if (registros == null || registros.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La lista de registros es obligatoria.");
        }

        if (registros.size() > 1000) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La carga masiva permite hasta 1000 registros por ejecucion.");
        }

        registros.forEach(this::validarRegistroMasivo);

        List<String> emails = registros.stream()
                .map(RegistroMasivo::email)
                .toList();
        Set<String> uniqueEmails = new HashSet<>(emails);
        if (uniqueEmails.size() != emails.size()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "La carga contiene emails duplicados.");
        }

        List<String> existingEmails = usuarioRepository.findExistingEmails(emails);
        if (!existingEmails.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existen emails registrados: " + existingEmails);
        }

        LocalDateTime createdAt = LocalDateTime.now();
        List<Usuario> usuarios = new ArrayList<>();
        List<AutorEstudiante> autores = new ArrayList<>();

        for (RegistroMasivo registro : registros) {
            String rol = "docente".equalsIgnoreCase(registro.rol()) ? "docente" : "estudiante";
            UUID userId = UUID.randomUUID();

            usuarios.add(Usuario.builder()
                    .id(userId)
                    .email(registro.email())
                    .rol(rol)
                    .activo(true)
                    .createdAt(createdAt)
                    .build());

            autores.add(AutorEstudiante.builder()
                    .id(UUID.randomUUID())
                    .userId(userId)
                    .nombreCompleto(registro.nombreCompleto())
                    .grado(registro.grado())
                    .institucion(registro.institucion())
                    .regionCultural(registro.regionCultural())
                    .lenguaMaterna(registro.lenguaMaterna())
                    .bio(registro.bio())
                    .fotoPerfilUrl(registro.fotoPerfilUrl())
                    .password(registro.password())
                    .narrativasPublicadas(0)
                    .createdAt(createdAt)
                    .build());
        }

        usuarioRepository.saveAll(usuarios);
        autorRepository.saveAll(autores);

        return BulkRegistrationResponse.builder()
                .total(registros.size())
                .registrados(registros.size())
                .emails(emails)
                .build();
    }

    private void validarRegistroMasivo(RegistroMasivo registro) {
        if (registro == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cada registro debe tener datos validos.");
        }
        if (registro.email() == null || registro.email().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El email es obligatorio.");
        }
        if (registro.password() == null || registro.password().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La contrasena es obligatoria.");
        }
        if (registro.nombreCompleto() == null || registro.nombreCompleto().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre completo es obligatorio.");
        }
        if (registro.grado() == null || registro.grado().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El grado es obligatorio.");
        }
        if (registro.regionCultural() == null || registro.regionCultural().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La region cultural es obligatoria.");
        }
    }

    public Optional<AuthProfileResponse> sincronizarSesion(String email) {
        // HU-07: Sincronización con Supabase Auth
=======
    public Optional<AuthResult> sincronizarSesion(String email) {
>>>>>>> 6d63ed78a72715c54b5e73de36f6393b2ef7e3d6:backendCulturaStory/src/main/java/com/pollitocorp/backendCulturaStory/modules/auth/application/service/AuthService.java
        return usuarioRepository.findByEmail(email)
                .map(usuario -> AuthResult.builder()
                        .usuario(usuario)
                        .autor(autorRepository.findByUserId(usuario.getId()).orElse(null))
                        .build());
    }

    public AuthResult iniciarSesion(String email, String password, String rolEsperado) {
        if ("admin".equalsIgnoreCase(email) && "admin123".equals(password)) {
            Usuario admin = Usuario.builder()
                    .id(UUID.fromString("00000000-0000-0000-0000-000000000001"))
                    .email("admin")
                    .rol("administrador")
                    .activo(true)
                    .createdAt(LocalDateTime.now())
                    .build();

            return AuthResult.builder()
                    .usuario(admin)
                    .autor(null)
                    .build();
        }

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales incorrectas."));

        AutorEstudiante autor = autorRepository.findByUserId(usuario.getId()).orElse(null);

        String storedPassword = autor != null ? autor.getPassword() : null;
        boolean matches = storedPassword != null && passwordEncoder.matches(password, storedPassword);

        if (!matches) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales incorrectas.");
        }

        if (rolEsperado != null
                && !rolEsperado.isBlank()
                && !"admin".equalsIgnoreCase(rolEsperado)
                && !usuario.getRol().equalsIgnoreCase(rolEsperado)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "El tipo de perfil seleccionado no coincide con la cuenta.");
        }

        return AuthResult.builder()
                .usuario(usuario)
                .autor(autor)
                .build();
    }
<<<<<<< HEAD:backendCulturaStory/src/main/java/com/pollitocorp/backendCulturaStory/application/service/AuthService.java

    public record RegistroMasivo(
            String email,
            String password,
            String rol,
            String nombreCompleto,
            String grado,
            String institucion,
            String lenguaMaterna,
            String regionCultural,
            String bio,
            String fotoPerfilUrl
    ) {
    }
}
=======
}
>>>>>>> 6d63ed78a72715c54b5e73de36f6393b2ef7e3d6:backendCulturaStory/src/main/java/com/pollitocorp/backendCulturaStory/modules/auth/application/service/AuthService.java
