package com.pollitocorp.backendCulturaStory.modules.auth.infrastructure.adapter.in.rest;

<<<<<<< HEAD:backendCulturaStory/src/main/java/com/pollitocorp/backendCulturaStory/infrastructure/adapter/in/rest/AuthController.java
import com.pollitocorp.backendCulturaStory.application.service.AuthService;
import com.pollitocorp.backendCulturaStory.domain.model.Usuario;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.in.rest.dto.AuthProfileResponse;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.in.rest.dto.BulkRegistrationResponse;
=======
import com.pollitocorp.backendCulturaStory.modules.auth.application.service.AuthService;
import com.pollitocorp.backendCulturaStory.modules.auth.domain.model.Usuario;
import com.pollitocorp.backendCulturaStory.modules.auth.domain.model.AuthResult;
>>>>>>> 6d63ed78a72715c54b5e73de36f6393b2ef7e3d6:backendCulturaStory/src/main/java/com/pollitocorp/backendCulturaStory/modules/auth/infrastructure/adapter/in/rest/AuthController.java
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/registro")
    public ResponseEntity<AuthResult> registrar(@RequestBody Map<String, Object> request) {
        // HU-06: Estudiante puede registrarse y crear su perfil
        Usuario usuario = Usuario.builder()
                .id(UUID.randomUUID())
                .email((String) request.get("email"))
                .build();

        AuthResult result = authService.registrarUsuario(
                usuario,
                (String) request.get("nombreCompleto"),
                (String) request.get("grado"),
                (String) request.get("regionCultural"),
                (String) request.get("institucion"),
                (String) request.get("lenguaMaterna"),
                (String) request.get("bio"),
                (String) request.get("fotoPerfilUrl"),
                (String) request.get("password"),
                (String) request.get("rol")
        );

        return ResponseEntity.ok(result);
    }

    @PostMapping("/registros-masivos")
    public ResponseEntity<BulkRegistrationResponse> registrarMasivo(@RequestBody List<AuthService.RegistroMasivo> request) {
        return ResponseEntity.ok(authService.registrarUsuariosMasivos(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResult> login(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(authService.iniciarSesion(
                request.get("email"),
                request.get("password"),
                request.get("rol")
        ));
    }

    @GetMapping("/perfil/{email}")
    public ResponseEntity<AuthResult> obtenerPerfil(@PathVariable String email) {
        // HU-07: Iniciar sesión y acceder a datos
        return authService.sincronizarSesion(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
