package com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence;

import com.pollitocorp.backendCulturaStory.domain.model.RolChangeLog;
import com.pollitocorp.backendCulturaStory.domain.port.out.RolChangeLogRepositoryPort;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.mapper.RolChangeLogMapper;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.repository.RolChangeLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JpaRolChangeLogRepositoryAdapter implements RolChangeLogRepositoryPort {

    private final RolChangeLogRepository repository;
    private final RolChangeLogMapper mapper;

    @Override
    public void save(RolChangeLog log) {
        repository.save(mapper.toEntity(log));
    }
}
