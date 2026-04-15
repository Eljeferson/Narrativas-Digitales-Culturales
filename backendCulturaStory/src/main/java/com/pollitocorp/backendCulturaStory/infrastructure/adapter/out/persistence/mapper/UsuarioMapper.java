package com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.mapper;

import com.pollitocorp.backendCulturaStory.domain.model.Usuario;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.entity.UsuarioEntity;
import org.springframework.stereotype.Component;

@Component
public class UsuarioMapper {

    public UsuarioEntity toEntity(Usuario domain) {
        if (domain == null) return null;
        return UsuarioEntity.builder()
                .id(domain.getId())
                .email(domain.getEmail())
                .rol(domain.getRol())
                .activo(domain.isActivo())
                .createdAt(domain.getCreatedAt())
                .build();
    }

    public Usuario toDomain(UsuarioEntity entity) {
        if (entity == null) return null;
        return Usuario.builder()
                .id(entity.getId())
                .email(entity.getEmail())
                .rol(entity.getRol())
                .activo(entity.isActivo())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
