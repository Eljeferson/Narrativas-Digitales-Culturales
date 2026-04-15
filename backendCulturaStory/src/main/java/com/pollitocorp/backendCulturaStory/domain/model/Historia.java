package com.pollitocorp.backendCulturaStory.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Historia {
    private String trama;
    private List<String> personajes;
    private String escenario;
    private String estructuraNarrativa; // Inicio, Nudo, Desenlace
}
