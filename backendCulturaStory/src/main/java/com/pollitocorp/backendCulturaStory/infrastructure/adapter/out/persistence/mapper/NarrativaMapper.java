package com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.mapper;

import com.pollitocorp.backendCulturaStory.domain.model.AutorEstudiante;
import com.pollitocorp.backendCulturaStory.domain.model.EstadoNarrativa;
import com.pollitocorp.backendCulturaStory.domain.model.NarrativaCultural;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.entity.AutorEntity;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.entity.NarrativaEntity;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.entity.UsuarioEntity;
import org.springframework.stereotype.Component;

@Component
public class NarrativaMapper {

    public NarrativaEntity toEntity(NarrativaCultural domain) {
        if (domain == null) return null;
        return NarrativaEntity.builder()
                .id(domain.getId())
                .titulo(domain.getTitulo())
                .contenido(domain.getContenido())
                .regionCultural(domain.getRegionCultural())
                .tipoRelato(domain.getTipoRelato())
                .estado(domain.getEstado() != null ? domain.getEstado().name().toLowerCase() : null)
                .autor(toAutorEntity(domain.getAutor()))
                .docenteId(domain.getDocenteId())
                .aprobadaPor(domain.getAprobadaPor())
                .dedicatoria(domain.getDedicatoria())
                .notaCuratorial(domain.getNotaCuratorial())
                .comentarioPedagogico(domain.getComentarioPedagogico())
                .destacada(domain.isDestacada())
                .vecesVista(domain.getVecesVista())
                .fechaPublicacion(domain.getFechaPublicacion())
                .createdAt(domain.getCreatedAt())
                .updatedAt(domain.getUpdatedAt())
                .build();
    }

    public NarrativaCultural toDomain(NarrativaEntity entity) {
        if (entity == null) return null;
        return NarrativaCultural.builder()
                .id(entity.getId())
                .titulo(entity.getTitulo())
                .contenido(entity.getContenido())
                .regionCultural(entity.getRegionCultural())
                .tipoRelato(entity.getTipoRelato())
                .estado(entity.getEstado() != null ? EstadoNarrativa.valueOf(entity.getEstado().toUpperCase()) : null)
                .autor(toAutorDomain(entity.getAutor()))
                .docenteId(entity.getDocenteId())
                .aprobadaPor(entity.getAprobadaPor())
                .dedicatoria(entity.getDedicatoria())
                .notaCuratorial(entity.getNotaCuratorial())
                .comentarioPedagogico(entity.getComentarioPedagogico())
                .destacada(entity.isDestacada())
                .vecesVista(entity.getVecesVista())
                .fechaPublicacion(entity.getFechaPublicacion())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public AutorEntity toAutorEntity(AutorEstudiante domain) {
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
                .narrativasPublicadas(domain.getNarrativasPublicadas())
                .createdAt(domain.getCreatedAt())
                .build();
    }

    public AutorEstudiante toAutorDomain(AutorEntity entity) {
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
                .narrativasPublicadas(entity.getNarrativasPublicadas())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
