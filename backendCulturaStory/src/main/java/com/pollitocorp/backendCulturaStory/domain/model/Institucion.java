package com.pollitocorp.backendCulturaStory.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Institucion {
    private Integer idInstitucion;
    private String institucionEducativa;
    private String grado;
}
