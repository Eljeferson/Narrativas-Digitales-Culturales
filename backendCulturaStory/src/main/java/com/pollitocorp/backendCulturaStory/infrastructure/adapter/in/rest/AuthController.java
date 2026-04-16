package com.pollitocorp.backendCulturaStory.infrastructure.adapter.in.rest;

import com.pollitocorp.backendCulturaStory.application.service.AuthService;
import com.pollitocorp.backendCulturaStory.domain.model.Usuario;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/registro")
    public ResponseEntity<Usuario> registrar(@RequestBody Map<String, Object> request) {
        // HU-06: Estudiante puede registrarse y crear su perfil
        Usuario usuario = Usuario.builder()
                .id(UUID.randomUUID())
                .email((String) request.get("email"))
                .build();
        
        Usuario result = authService.registrarEstudiante(
                usuario,
                (String) request.get("nombreCompleto"),
                (String) request.get("grado"),
                (String) request.get("regionCultural"),
                (String) request.get("institucion"),
                (String) request.get("lenguaMaterna"),
                (String) request.get("bio"),
                (String) request.get("fotoPerfilUrl")
        );
        
        return ResponseEntity.ok(result);
    }

    @GetMapping("/perfil/{email}")
    public ResponseEntity<Usuario> obtenerPerfil(@PathVariable String email) {
        // HU-07: Iniciar sesión y acceder a datos
        return authService.sincronizarSesion(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
