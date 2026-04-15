package com.pollitocorp.backendCulturaStory.application.service;

import com.pollitocorp.backendCulturaStory.domain.model.AutorEstudiante;
import com.pollitocorp.backendCulturaStory.domain.model.Usuario;
import com.pollitocorp.backendCulturaStory.domain.port.out.AutorRepositoryPort;
import com.pollitocorp.backendCulturaStory.domain.port.out.UsuarioRepositoryPort;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepositoryPort usuarioRepository;
    private final AutorRepositoryPort autorRepository;

    public Usuario registrarEstudiante(Usuario usuario, String nombreCompleto, String grado, String regionCultural) {
        // HU-06: Registro de usuario y perfil de autor
        usuario.setRol("estudiante");
        usuario.setActivo(true);
        usuario.setCreatedAt(LocalDateTime.now());
        Usuario savedUser = usuarioRepository.save(usuario);

        AutorEstudiante autor = AutorEstudiante.builder()
                .id(UUID.randomUUID())
                .userId(savedUser.getId())
                .nombreCompleto(nombreCompleto)
                .grado(grado)
                .regionCultural(regionCultural)
                .createdAt(LocalDateTime.now())
                .build();
        autorRepository.save(autor);

        return savedUser;
    }

    public Optional<Usuario> sincronizarSesion(String email) {
        // HU-07: Sincronización con Supabase Auth
        return usuarioRepository.findByEmail(email);
    }
}
