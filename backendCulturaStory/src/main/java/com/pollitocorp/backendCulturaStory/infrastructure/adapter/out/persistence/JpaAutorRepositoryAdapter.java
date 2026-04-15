package com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence;

import com.pollitocorp.backendCulturaStory.domain.model.AutorEstudiante;
import com.pollitocorp.backendCulturaStory.domain.port.out.AutorRepositoryPort;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.mapper.AutorMapper;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.repository.AutorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class JpaAutorRepositoryAdapter implements AutorRepositoryPort {

    private final AutorRepository repository;
    private final AutorMapper mapper;

    @Override
    public AutorEstudiante save(AutorEstudiante autor) {
        return mapper.toDomain(repository.save(mapper.toEntity(autor)));
    }

    @Override
    public Optional<AutorEstudiante> findById(UUID id) {
        return repository.findById(id).map(mapper::toDomain);
    }

    @Override
    public Optional<AutorEstudiante> findByUserId(UUID userId) {
        return repository.findByUserId(userId).map(mapper::toDomain);
    }

    @Override
    public List<AutorEstudiante> findByGrado(String grado) {
        return repository.findByGrado(grado).stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<AutorEstudiante> findAll() {
        return repository.findAll().stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }
}
