package com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence;

import com.pollitocorp.backendCulturaStory.domain.model.NarrativaCultural;
import com.pollitocorp.backendCulturaStory.domain.port.out.NarrativaRepositoryPort;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.mapper.NarrativaMapper;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.repository.NarrativaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JpaNarrativaRepositoryAdapter implements NarrativaRepositoryPort {

    private final NarrativaRepository repository;
    private final NarrativaMapper mapper;

    @Override
    public NarrativaCultural save(NarrativaCultural narrativa) {
        return mapper.toDomain(repository.save(mapper.toEntity(narrativa)));
    }

    @Override
    public Optional<NarrativaCultural> findById(UUID id) {
        return repository.findById(id).map(mapper::toDomain);
    }

    @Override
    public List<NarrativaCultural> findByAutorId(UUID autorId) {
        return repository.findByAutorId(autorId).stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<NarrativaCultural> findByGrado(String grado) {
        return repository.findByAutorGrado(grado).stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }
}
