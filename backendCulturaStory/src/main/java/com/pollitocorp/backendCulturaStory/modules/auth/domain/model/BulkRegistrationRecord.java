package com.pollitocorp.backendCulturaStory.modules.auth.domain.model;

public record BulkRegistrationRecord(
        String email,
        String password,
        String rol,
        String nombreCompleto,
        String grado,
        String institucion,
        String lenguaMaterna,
        String regionCultural,
        String bio,
        String fotoPerfilUrl
) {
}
