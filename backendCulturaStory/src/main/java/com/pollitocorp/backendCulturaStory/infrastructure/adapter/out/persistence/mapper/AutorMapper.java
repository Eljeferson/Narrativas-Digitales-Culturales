package com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.mapper;

import com.pollitocorp.backendCulturaStory.domain.model.AutorEstudiante;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.entity.AutorEntity;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.entity.UsuarioEntity;
import org.springframework.stereotype.Component;

@Component
public class AutorMapper {

    public AutorEntity toEntity(AutorEstudiante domain) {
        if (domain == null) return null;
        return AutorEntity.builder()
                .id(domain.getId())
                .user(domain.getUserId() != null ? UsuarioEntity.builder().id(domain.getUserId()).build() : null)
                .nombreCompleto(domain.getNombreCompleto())
                .grado(domain.getGrado())
                .institucion(domain.getInstitucion())
                .regionCultural(domain.getRegionCultural())
                .lenguaMaterna(domain.getLenguaMaterna())
                .bio(domain.getBio())
                .fotoPerfilUrl(domain.getFotoPerfilUrl())
                .password(domain.getPassword())
                .narrativasPublicadas(domain.getNarrativasPublicadas())
                .createdAt(domain.getCreatedAt())
                .build();
    }

    public AutorEstudiante toDomain(AutorEntity entity) {
        if (entity == null) return null;
        return AutorEstudiante.builder()
                .id(entity.getId())
                .userId(entity.getUser() != null ? entity.getUser().getId() : null)
                .nombreCompleto(entity.getNombreCompleto())
                .grado(entity.getGrado())
                .institucion(entity.getInstitucion())
                .regionCultural(entity.getRegionCultural())
                .lenguaMaterna(entity.getLenguaMaterna())
                .bio(entity.getBio())
                .fotoPerfilUrl(entity.getFotoPerfilUrl())
                .password(entity.getPassword())
                .narrativasPublicadas(entity.getNarrativasPublicadas())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
