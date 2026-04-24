package com.pollitocorp.backendCulturaStory.domain.port.in;

import com.pollitocorp.backendCulturaStory.domain.model.AuthResult;
import com.pollitocorp.backendCulturaStory.domain.model.Usuario;

import java.util.Optional;

public interface AuthUseCase {

    AuthResult iniciarSesion(String email, String password, String rolEsperado);
    AuthResult registrarUsuario(Usuario usuario, String nombreCompleto); //VERIFICAR LOS CAMPOS
    Optional<AuthResult> sincronizarSesion(String email);
}
