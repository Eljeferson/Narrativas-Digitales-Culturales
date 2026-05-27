package com.pollitocorp.backendCulturaStory.infrastructure.adapter.in.rest;

import com.pollitocorp.backendCulturaStory.application.service.AuthService;
import com.pollitocorp.backendCulturaStory.domain.model.Usuario;
import com.pollitocorp.backendCulturaStory.domain.model.AuthResult;
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
public class AuthController {

    private final AuthService authService;

    @PostMapping("/registro")
<<<<<<< HEAD
    public ResponseEntity<AuthProfileResponse> registrar(@RequestBody Map<String, Object> request) {
        // HU-06: Estudiante puede registrarse y crear su perfil.
        String email = getString(request, "email");
        String password = getString(request, "password", "contrasena", "clave");

        if (email == null || email.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El correo es obligatorio.");
        }

=======
    public ResponseEntity<AuthResult> registrar(@RequestBody Map<String, Object> request) {
        // HU-06: Estudiante puede registrarse y crear su perfil
>>>>>>> bdbb79b3b6ba57399152a8591bc0115dfecb99fb
        Usuario usuario = Usuario.builder()
                .id(UUID.randomUUID())
                .email(email)
                .build();

        AuthResult result = authService.registrarUsuario(
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
    public ResponseEntity<AuthResult> login(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(authService.iniciarSesion(
                request.get("email"),
                request.get("password"),
                request.getOrDefault("rol", request.get("role"))
        ));
    }

    @GetMapping("/perfil/{email}")
    public ResponseEntity<AuthResult> obtenerPerfil(@PathVariable String email) {
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
