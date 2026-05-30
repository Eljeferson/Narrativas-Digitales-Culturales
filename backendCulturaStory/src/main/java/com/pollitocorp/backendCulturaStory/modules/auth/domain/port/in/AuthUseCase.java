package com.pollitocorp.backendCulturaStory.modules.auth.domain.port.in;

import com.pollitocorp.backendCulturaStory.modules.auth.domain.model.AuthResult;
import com.pollitocorp.backendCulturaStory.modules.auth.domain.model.BulkRegistrationRecord;
import com.pollitocorp.backendCulturaStory.modules.auth.domain.model.BulkRegistrationResult;
import com.pollitocorp.backendCulturaStory.modules.auth.domain.model.RegistrationRequest;

import java.util.List;
import java.util.Optional;

public interface AuthUseCase {

    AuthResult iniciarSesion(String email, String password, String rolEsperado);
    AuthResult registrarUsuario(RegistrationRequest request);
    BulkRegistrationResult registrarUsuariosMasivos(List<BulkRegistrationRecord> registros);
    Optional<AuthResult> sincronizarSesion(String email);
}
