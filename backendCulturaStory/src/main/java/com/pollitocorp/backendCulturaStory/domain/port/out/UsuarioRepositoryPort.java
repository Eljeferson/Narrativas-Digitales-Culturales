package com.pollitocorp.backendCulturaStory.domain.port.out;

import com.pollitocorp.backendCulturaStory.domain.model.Usuario;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UsuarioRepositoryPort {
    Usuario save(Usuario usuario);
    Optional<Usuario> findById(UUID id);
    Optional<Usuario> findByEmail(String email);
    List<Usuario> findAll();
}
