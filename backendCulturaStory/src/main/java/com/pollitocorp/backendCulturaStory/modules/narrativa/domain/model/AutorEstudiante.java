package com.pollitocorp.backendCulturaStory.modules.narrativa.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AutorEstudiante {
    private UUID id;
    private UUID userId;
    private String nombreCompleto;
    private String grado;
    private String institucion;
    private String regionCultural;
    private String lenguaMaterna;
    private String bio;
    private String fotoPerfilUrl;
    @JsonIgnore
    private String password;
    @Builder.Default
    private Integer narrativasPublicadas = 0;
    private LocalDateTime createdAt;
}
