package com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.mapper;

import com.pollitocorp.backendCulturaStory.domain.model.RolChangeLog;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.entity.RolChangeLogEntity;
import org.springframework.stereotype.Component;

@Component
public class RolChangeLogMapper {

    public RolChangeLogEntity toEntity(RolChangeLog domain) {
        if (domain == null) return null;
        return RolChangeLogEntity.builder()
                .id(domain.getId())
                .usuarioId(domain.getUsuarioId())
                .rolAnterior(domain.getRolAnterior())
                .rolNuevo(domain.getRolNuevo())
                .cambiadoPor(domain.getCambiadoPor())
                .motivo(domain.getMotivo())
                .createdAt(domain.getCreatedAt())
                .build();
    }
}
