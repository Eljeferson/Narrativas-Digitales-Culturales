package com.pollitocorp.backendCulturaStory.infrastructure.adapter.in.rest.dto;

import com.pollitocorp.backendCulturaStory.domain.model.AutorEstudiante;
import com.pollitocorp.backendCulturaStory.domain.model.Usuario;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthProfileResponse {
    private Usuario usuario;
    private AutorEstudiante autor;
}
