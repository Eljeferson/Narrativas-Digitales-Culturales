package com.pollitocorp.backendCulturaStory.domain.model;

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
public class Usuario {
    private UUID id;
    private String email;
    private String rol; // estudiante, docente, comunidad, administrador
    private boolean activo;
    private LocalDateTime createdAt;
}
