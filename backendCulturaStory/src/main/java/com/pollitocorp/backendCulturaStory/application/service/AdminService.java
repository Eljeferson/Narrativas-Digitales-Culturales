package com.pollitocorp.backendCulturaStory.application.service;

import com.pollitocorp.backendCulturaStory.domain.model.RolChangeLog;
import com.pollitocorp.backendCulturaStory.domain.model.Usuario;
import com.pollitocorp.backendCulturaStory.domain.port.out.RolChangeLogRepositoryPort;
import com.pollitocorp.backendCulturaStory.domain.port.out.UsuarioRepositoryPort;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
public class AdminService {

    private final UsuarioRepositoryPort usuarioRepository;
    private final RolChangeLogRepositoryPort rolChangeLogRepository;

    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario cambiarRol(UUID usuarioId, String nuevoRol, UUID administradorId, String motivo) {
        // HU-08: Gestión de roles con logging
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        String rolAnterior = usuario.getRol();
        usuario.setRol(nuevoRol);
        Usuario updatedUser = usuarioRepository.save(usuario);

        RolChangeLog log = RolChangeLog.builder()
                .usuarioId(usuarioId)
                .rolAnterior(rolAnterior)
                .rolNuevo(nuevoRol)
                .cambiadoPor(administradorId)
                .motivo(motivo)
                .createdAt(LocalDateTime.now())
                .build();
        rolChangeLogRepository.save(log);

        return updatedUser;
    }
}
