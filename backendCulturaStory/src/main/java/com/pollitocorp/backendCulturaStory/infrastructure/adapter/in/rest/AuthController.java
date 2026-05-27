package com.pollitocorp.backendCulturaStory.infrastructure.adapter.in.rest;

import com.pollitocorp.backendCulturaStory.application.service.AuthService;
import com.pollitocorp.backendCulturaStory.domain.model.Usuario;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.in.rest.dto.AuthProfileResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/registro")
    public ResponseEntity<AuthProfileResponse> registrar(@RequestBody Map<String, Object> request) {
        // HU-06: Estudiante puede registrarse y crear su perfil.
        String email = getString(request, "email");
        String password = getString(request, "password", "contrasena", "clave");

        if (email == null || email.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El correo es obligatorio.");
        }

        Usuario usuario = Usuario.builder()
                .id(UUID.randomUUID())
                .email(email)
                .build();

        AuthProfileResponse result = authService.registrarUsuario(
                usuario,
                getString(request, "nombreCompleto"),
                getString(request, "grado"),
                getString(request, "regionCultural"),
                getString(request, "institucion"),
                getString(request, "lenguaMaterna"),
                getString(request, "bio"),
                getString(request, "fotoPerfilUrl"),
                password,
                getString(request, "rol", "role")
        );

        return ResponseEntity.ok(result);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthProfileResponse> login(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(authService.iniciarSesion(
                request.get("email"),
                request.get("password"),
                request.getOrDefault("rol", request.get("role"))
        ));
    }

    @GetMapping("/perfil/{email}")
    public ResponseEntity<AuthProfileResponse> obtenerPerfil(@PathVariable String email) {
        // HU-07: Iniciar sesión y acceder a datos
        return authService.sincronizarSesion(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    private String getString(Map<String, Object> request, String... keys) {
        for (String key : keys) {
            Object value = request.get(key);
            if (value instanceof String text) {
                String normalized = text.trim();
                if (!normalized.isEmpty()) {
                    return normalized;
                }
            }
        }
        return null;
    }
}
