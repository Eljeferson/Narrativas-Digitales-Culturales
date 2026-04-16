package com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "narrativas_culturales")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NarrativaEntity {
    @Id
    private UUID id;

    @Column(nullable = false)
    private String titulo;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String contenido;

    @Column(name = "region_cultural", nullable = false)
    private String regionCultural;

    @Column(name = "tipo_relato", nullable = false)
    private String tipoRelato;

    @Column(nullable = false)
    private String estado;

    @ManyToOne
    @JoinColumn(name = "autor_id", nullable = false)
    private AutorEntity autor;

    @Column(name = "docente_id")
    private UUID docenteId;

    @Column(name = "aprobada_por")
    private UUID aprobadaPor;

    @Column(columnDefinition = "TEXT")
    private String dedicatoria;

    @Column(name = "nota_curatorial", columnDefinition = "TEXT")
    private String notaCuratorial;

    @Column(name = "comentario_pedagogico", columnDefinition = "TEXT")
    private String comentarioPedagogico;

    @Column(nullable = false)
    private Boolean destacada;

    @Column(name = "veces_vista", nullable = false)
    private Integer vecesVista;

    @Column(name = "fecha_publicacion")
    private LocalDateTime fechaPublicacion;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
