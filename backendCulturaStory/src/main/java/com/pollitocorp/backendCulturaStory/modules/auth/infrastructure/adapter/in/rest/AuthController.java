package com.pollitocorp.backendCulturaStory.modules.auth.infrastructure.adapter.in.rest;

import com.pollitocorp.backendCulturaStory.modules.auth.domain.model.AuthResult;
import com.pollitocorp.backendCulturaStory.modules.auth.domain.model.BulkRegistrationRecord;
import com.pollitocorp.backendCulturaStory.modules.auth.domain.model.BulkRegistrationResult;
import com.pollitocorp.backendCulturaStory.modules.auth.domain.model.RegistrationRequest;
import com.pollitocorp.backendCulturaStory.modules.auth.domain.port.in.AuthUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthUseCase authUseCase;

    @PostMapping("/registro")
    public ResponseEntity<AuthResult> registrar(@RequestBody Map<String, Object> request) {
        AuthResult result = authUseCase.registrarUsuario(new RegistrationRequest(
                (String) request.get("email"),
                (String) request.get("password"),
                (String) request.get("rol"),
                (String) request.get("nombreCompleto"),
                (String) request.get("grado"),
                (String) request.get("institucion"),
                (String) request.get("lenguaMaterna"),
                (String) request.get("regionCultural"),
                (String) request.get("bio"),
                (String) request.get("fotoPerfilUrl")
        ));

        return ResponseEntity.ok(result);
    }

    @PostMapping("/registros-masivos")
    public ResponseEntity<BulkRegistrationResult> registrarMasivo(@RequestBody List<BulkRegistrationRecord> request) {
        return ResponseEntity.ok(authUseCase.registrarUsuariosMasivos(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResult> login(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(authUseCase.iniciarSesion(
                request.get("email"),
                request.get("password"),
                request.get("rol")
        ));
    }

    @GetMapping("/perfil/{email}")
    public ResponseEntity<AuthResult> obtenerPerfil(@PathVariable String email) {
        return authUseCase.sincronizarSesion(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
