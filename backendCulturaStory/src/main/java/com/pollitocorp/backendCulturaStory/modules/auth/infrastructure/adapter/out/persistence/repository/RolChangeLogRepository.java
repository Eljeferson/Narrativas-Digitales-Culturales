package com.pollitocorp.backendCulturaStory.modules.auth.infrastructure.adapter.out.persistence.repository;

import com.pollitocorp.backendCulturaStory.modules.auth.infrastructure.adapter.out.persistence.entity.RolChangeLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RolChangeLogRepository extends JpaRepository<RolChangeLogEntity, UUID> {
}
