package com.pollitocorp.backendCulturaStory.infrastructure.adapter.in.rest.dto;

import lombok.Data;

@Data
public class MejoraNarrativaRequest {
    private String titulo;
    private String cultura;
    private String contenido;
}
