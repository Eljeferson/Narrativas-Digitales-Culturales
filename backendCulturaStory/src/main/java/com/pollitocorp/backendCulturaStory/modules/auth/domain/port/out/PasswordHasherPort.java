package com.pollitocorp.backendCulturaStory.modules.auth.domain.port.out;

public interface PasswordHasherPort {
    String hash(String rawPassword);
    boolean matches(String rawPassword, String hashedPassword);
}
