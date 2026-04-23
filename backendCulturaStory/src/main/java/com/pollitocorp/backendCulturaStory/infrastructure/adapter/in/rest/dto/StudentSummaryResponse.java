package com.pollitocorp.backendCulturaStory.infrastructure.adapter.in.rest.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentSummaryResponse {
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
