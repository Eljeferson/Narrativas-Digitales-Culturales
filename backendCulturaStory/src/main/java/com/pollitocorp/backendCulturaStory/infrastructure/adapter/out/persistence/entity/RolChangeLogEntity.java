package com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "rol_change_log")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RolChangeLogEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "usuario_id", nullable = false)
    private UUID usuarioId;

    @Column(name = "rol_anterior", nullable = false)
    private String rolAnterior;

    @Column(name = "rol_nuevo", nullable = false)
    private String rolNuevo;

    @Column(name = "cambiado_por", nullable = false)
    private UUID cambiadoPor;

    @Column(columnDefinition = "TEXT")
    private String motivo;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
}
