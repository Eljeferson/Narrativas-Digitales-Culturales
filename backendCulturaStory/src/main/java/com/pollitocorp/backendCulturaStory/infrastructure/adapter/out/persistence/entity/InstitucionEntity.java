package com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tabla_institucion")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InstitucionEntity {
    @Id
    @Column(name = "id_institucion")
    private Integer idInstitucion;

    @Column(name = "institucion_educativa")
    private String institucionEducativa;

    @Column(name = "grado")
    private String grado;
}
