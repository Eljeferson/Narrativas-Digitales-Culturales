package com.pollitocorp.backendCulturaStory.modules.auth.domain.model;

import lombok.AllArgsConstructor;
import com.pollitocorp.backendCulturaStory.modules.narrativa.domain.model.AutorEstudiante;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResult {
    private Usuario usuario;
    private AutorEstudiante autor;
}