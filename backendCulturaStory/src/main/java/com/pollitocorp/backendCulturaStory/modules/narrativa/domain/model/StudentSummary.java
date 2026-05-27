package com.pollitocorp.backendCulturaStory.modules.narrativa.domain.model;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class StudentSummary {
    private UUID id;
    private UUID userId;
    private String email;
    private String nombreCompleto;
    private String grado;
    private String institucion;
    private String regionCultural;
    private String lenguaMaterna;
    private String bio;
    private String fotoPerfilUrl;
    private Integer narrativasPublicadas;
}
