package com.pollitocorp.backendCulturaStory.modules.auth.infrastructure.adapter.out.persistence.repository;

import com.pollitocorp.backendCulturaStory.modules.auth.infrastructure.adapter.out.persistence.entity.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, UUID> {
    Optional<UsuarioEntity> findByEmail(String email);
}
