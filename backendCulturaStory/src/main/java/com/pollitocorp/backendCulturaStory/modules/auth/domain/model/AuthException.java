package com.pollitocorp.backendCulturaStory.modules.auth.domain.model;

public class AuthException extends RuntimeException {

    private final AuthErrorType type;

    public AuthException(AuthErrorType type, String message) {
        super(message);
        this.type = type;
    }

    public AuthErrorType getType() {
        return type;
    }
}
