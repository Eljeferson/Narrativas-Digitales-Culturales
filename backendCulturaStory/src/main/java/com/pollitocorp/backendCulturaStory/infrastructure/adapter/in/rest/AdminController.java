package com.pollitocorp.backendCulturaStory.infrastructure.adapter.in.rest;

import com.pollitocorp.backendCulturaStory.application.service.AdminService;
import com.pollitocorp.backendCulturaStory.domain.model.Usuario;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/usuarios")
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        return ResponseEntity.ok(adminService.listarUsuarios());
    }

    @PatchMapping("/usuarios/{id}/rol")
    public ResponseEntity<Usuario> cambiarRol(
            @PathVariable UUID id,
            @RequestBody Map<String, String> request) {
        // HU-08: Administrador puede gestionar usuarios asignando roles
        String nuevoRol = request.get("rol");
        String motivo = request.get("motivo");
        String adminIdRaw = request.get("adminId");
        UUID adminId = adminIdRaw != null && !adminIdRaw.isBlank() ? UUID.fromString(adminIdRaw) : id;

        return ResponseEntity.ok(adminService.cambiarRol(id, nuevoRol, adminId, motivo));
    }
}
