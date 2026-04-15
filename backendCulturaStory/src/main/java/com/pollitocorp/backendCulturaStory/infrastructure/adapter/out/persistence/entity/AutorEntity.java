package com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "autores_estudiante")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AutorEntity {
    @Id
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private UsuarioEntity user;

    @Column(name = "nombre_completo", nullable = false)
    private String nombreCompleto;

    @Column(nullable = false)
    private String grado;

    private String institucion;

    @Column(name = "region_cultural", nullable = false)
    private String regionCultural;

    @Column(name = "lengua_materna")
    private String lenguaMaterna;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(name = "foto_perfil_url")
    private String fotoPerfilUrl;

    @Column(name = "narrativas_publicadas", nullable = false)
    private int narrativasPublicadas;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
}
