package com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.mapper;

import com.pollitocorp.backendCulturaStory.domain.model.Institucion;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.entity.InstitucionEntity;
import org.springframework.stereotype.Component;

@Component
public class InstitucionMapper {

    public InstitucionEntity toEntity(Institucion domain) {
        if (domain == null) return null;
        return InstitucionEntity.builder()
                .idInstitucion(domain.getIdInstitucion())
                .institucionEducativa(domain.getInstitucionEducativa())
                .grado(domain.getGrado())
                .build();
    }

    public Institucion toDomain(InstitucionEntity entity) {
        if (entity == null) return null;
        return Institucion.builder()
                .idInstitucion(entity.getIdInstitucion())
                .institucionEducativa(entity.getInstitucionEducativa())
                .grado(entity.getGrado())
                .build();
    }
}
