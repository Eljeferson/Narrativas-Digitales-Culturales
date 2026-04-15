package com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.repository;

import com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.entity.NarrativaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface NarrativaRepository extends JpaRepository<NarrativaEntity, UUID> {
    List<NarrativaEntity> findByAutorId(UUID autorId);
    List<NarrativaEntity> findByAutorGrado(String grado);
}
