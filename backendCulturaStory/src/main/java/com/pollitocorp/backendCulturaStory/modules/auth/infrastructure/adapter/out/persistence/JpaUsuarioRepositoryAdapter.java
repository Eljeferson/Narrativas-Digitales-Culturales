package com.pollitocorp.backendCulturaStory.modules.auth.infrastructure.adapter.out.persistence;

import com.pollitocorp.backendCulturaStory.modules.auth.domain.model.Usuario;
import com.pollitocorp.backendCulturaStory.modules.auth.domain.port.out.UsuarioRepositoryPort;
import com.pollitocorp.backendCulturaStory.modules.auth.infrastructure.adapter.out.persistence.mapper.UsuarioMapper;
import com.pollitocorp.backendCulturaStory.modules.auth.infrastructure.adapter.out.persistence.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class JpaUsuarioRepositoryAdapter implements UsuarioRepositoryPort {

    private final UsuarioRepository repository;
    private final UsuarioMapper mapper;

    @Override
    public Usuario save(Usuario usuario) {
        return mapper.toDomain(repository.save(mapper.toEntity(usuario)));
    }

    @Override
    public List<Usuario> saveAll(List<Usuario> usuarios) {
        return repository.saveAll(usuarios.stream()
                        .map(mapper::toEntity)
                        .collect(Collectors.toList()))
                .stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Usuario> findById(UUID id) {
        return repository.findById(id).map(mapper::toDomain);
    }

    @Override
    public Optional<Usuario> findByEmail(String email) {
        return repository.findByEmail(email).map(mapper::toDomain);
    }

    @Override
    public List<String> findExistingEmails(List<String> emails) {
        return repository.findByEmailIn(emails).stream()
                .map(entity -> entity.getEmail())
                .collect(Collectors.toList());
    }

    @Override
    public List<Usuario> findAll() {
        return repository.findAll().stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }
}
