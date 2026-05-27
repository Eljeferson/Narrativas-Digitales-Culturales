package com.pollitocorp.backendCulturaStory.modules.auth.domain.model;

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
public class RolChangeLog {
    private UUID id;
    private UUID usuarioId;
    private String rolAnterior;
    private String rolNuevo;
    private UUID cambiadoPor;
    private String motivo;
    private LocalDateTime createdAt;
}
