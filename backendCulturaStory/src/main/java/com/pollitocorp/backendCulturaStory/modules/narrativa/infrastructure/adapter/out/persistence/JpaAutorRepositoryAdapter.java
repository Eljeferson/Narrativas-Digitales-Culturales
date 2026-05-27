package com.pollitocorp.backendCulturaStory.modules.narrativa.infrastructure.adapter.out.persistence;

<<<<<<< HEAD:backendCulturaStory/src/main/java/com/pollitocorp/backendCulturaStory/infrastructure/adapter/out/persistence/JpaAutorRepositoryAdapter.java
import com.pollitocorp.backendCulturaStory.domain.model.AutorEstudiante;
import com.pollitocorp.backendCulturaStory.domain.port.out.AutorRepositoryPort;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.entity.AutorEntity;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.mapper.AutorMapper;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.repository.AutorRepository;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.repository.UsuarioRepository;
=======
import com.pollitocorp.backendCulturaStory.modules.narrativa.domain.model.AutorEstudiante;
import com.pollitocorp.backendCulturaStory.modules.narrativa.domain.port.out.AutorRepositoryPort;
import com.pollitocorp.backendCulturaStory.modules.narrativa.infrastructure.adapter.out.persistence.mapper.AutorMapper;
import com.pollitocorp.backendCulturaStory.modules.narrativa.infrastructure.adapter.out.persistence.repository.AutorRepository;
>>>>>>> 6d63ed78a72715c54b5e73de36f6393b2ef7e3d6:backendCulturaStory/src/main/java/com/pollitocorp/backendCulturaStory/modules/narrativa/infrastructure/adapter/out/persistence/JpaAutorRepositoryAdapter.java
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
    private final UsuarioRepository usuarioRepository;
    private final AutorMapper mapper;

    @Override
    public AutorEstudiante save(AutorEstudiante autor) {
        return mapper.toDomain(repository.save(toEntityWithUserReference(autor)));
    }

    @Override
    public List<AutorEstudiante> saveAll(List<AutorEstudiante> autores) {
        return repository.saveAll(autores.stream()
                        .map(this::toEntityWithUserReference)
                        .collect(Collectors.toList()))
                .stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    private AutorEntity toEntityWithUserReference(AutorEstudiante autor) {
        AutorEntity entity = mapper.toEntity(autor);
        if (autor.getUserId() != null) {
            entity.setUser(usuarioRepository.getReferenceById(autor.getUserId()));
        }
        return entity;
    }

    @Override
    public Optional<AutorEstudiante> findById(UUID id) {
        return repository.findById(id).map(mapper::toDomain);
    }

    @Override
    public Optional<AutorEstudiante> findByUserId(UUID userId) {
        return repository.findByUser_Id(userId).map(mapper::toDomain);
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