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
public class NarrativaCultural {
    private UUID id;
    private String titulo;
    private String contenido;
    private String regionCultural;
    private String tipoRelato;
    private EstadoNarrativa estado;
    
    // Relaciones
    private AutorEstudiante autor;
    private UUID docenteId;
    private UUID aprobadaPor;
    
    // Campos culturales
    private String dedicatoria;
    private String notaCuratorial;
    private String comentarioPedagogico;
    
    // Métricas y fechas
    private Boolean destacada;
    private Integer vecesVista;
    private LocalDateTime fechaPublicacion;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Objeto de valor (Opcional, se mantiene por OE1)
    private Historia historia;
}
