package com.pollitocorp.backendCulturaStory.modules.auth.domain.port.out;

import com.pollitocorp.backendCulturaStory.modules.auth.domain.model.Usuario;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UsuarioRepositoryPort {
    Usuario save(Usuario usuario);
    List<Usuario> saveAll(List<Usuario> usuarios);
    Optional<Usuario> findById(UUID id);
    Optional<Usuario> findByEmail(String email);
    List<String> findExistingEmails(List<String> emails);
    List<Usuario> findAll();
}
