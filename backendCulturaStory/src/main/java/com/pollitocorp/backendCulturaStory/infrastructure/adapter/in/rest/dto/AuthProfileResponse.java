package com.pollitocorp.backendCulturaStory.infrastructure.adapter.in.rest.dto;

import com.pollitocorp.backendCulturaStory.modules.auth.domain.model.Usuario;
import com.pollitocorp.backendCulturaStory.modules.narrativa.domain.model.AutorEstudiante;
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
