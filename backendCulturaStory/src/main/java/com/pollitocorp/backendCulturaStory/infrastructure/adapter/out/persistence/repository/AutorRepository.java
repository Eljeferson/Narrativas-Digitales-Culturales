package com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.repository;

import com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.entity.AutorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AutorRepository extends JpaRepository<AutorEntity, UUID> {
    Optional<AutorEntity> findByUserId(UUID userId);
    List<AutorEntity> findByGrado(String grado);
}
