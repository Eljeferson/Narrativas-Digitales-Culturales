package com.pollitocorp.backendCulturaStory.support;

import com.pollitocorp.backendCulturaStory.domain.model.AutorEstudiante;
import com.pollitocorp.backendCulturaStory.domain.model.NarrativaCultural;
import com.pollitocorp.backendCulturaStory.domain.model.RolChangeLog;
import com.pollitocorp.backendCulturaStory.domain.model.Usuario;
import com.pollitocorp.backendCulturaStory.domain.port.out.AIPort;
import com.pollitocorp.backendCulturaStory.domain.port.out.AutorRepositoryPort;
import com.pollitocorp.backendCulturaStory.domain.port.out.NarrativaRepositoryPort;
import com.pollitocorp.backendCulturaStory.domain.port.out.RolChangeLogRepositoryPort;
import com.pollitocorp.backendCulturaStory.domain.port.out.UsuarioRepositoryPort;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

public final class TestDoubles {

    private TestDoubles() {
    }

    public static class InMemoryUsuarioRepository implements UsuarioRepositoryPort {
        private final Map<UUID, Usuario> storage = new HashMap<>();

        @Override
        public Usuario save(Usuario usuario) {
            storage.put(usuario.getId(), usuario);
            return usuario;
        }

        @Override
        public Optional<Usuario> findById(UUID id) {
            return Optional.ofNullable(storage.get(id));
        }

        @Override
        public Optional<Usuario> findByEmail(String email) {
            return storage.values().stream()
                    .filter(usuario -> usuario.getEmail().equalsIgnoreCase(email))
                    .findFirst();
        }

        @Override
        public List<Usuario> findAll() {
            return new ArrayList<>(storage.values());
        }
    }

    public static class InMemoryAutorRepository implements AutorRepositoryPort {
        private final Map<UUID, AutorEstudiante> storage = new HashMap<>();

        @Override
        public AutorEstudiante save(AutorEstudiante autor) {
            storage.put(autor.getId(), autor);
            return autor;
        }

        @Override
        public Optional<AutorEstudiante> findById(UUID id) {
            return Optional.ofNullable(storage.get(id));
        }

        @Override
        public Optional<AutorEstudiante> findByUserId(UUID userId) {
            return storage.values().stream()
                    .filter(autor -> userId.equals(autor.getUserId()))
                    .findFirst();
        }

        @Override
        public List<AutorEstudiante> findByGrado(String grado) {
            return storage.values().stream()
                    .filter(autor -> grado == null || grado.equalsIgnoreCase(autor.getGrado()))
                    .toList();
        }

        @Override
        public List<AutorEstudiante> findAll() {
            return new ArrayList<>(storage.values());
        }
    }

    public static class InMemoryNarrativaRepository implements NarrativaRepositoryPort {
        private final Map<UUID, NarrativaCultural> storage = new HashMap<>();

        @Override
        public NarrativaCultural save(NarrativaCultural narrativa) {
            storage.put(narrativa.getId(), narrativa);
            return narrativa;
        }

        @Override
        public Optional<NarrativaCultural> findById(UUID id) {
            return Optional.ofNullable(storage.get(id));
        }

        @Override
        public List<NarrativaCultural> findByAutorId(UUID autorId) {
            return storage.values().stream()
                    .filter(narrativa -> narrativa.getAutor() != null && autorId.equals(narrativa.getAutor().getId()))
                    .toList();
        }

        @Override
        public List<NarrativaCultural> findByGrado(String grado) {
            return storage.values().stream()
                    .filter(narrativa -> narrativa.getAutor() != null)
                    .filter(narrativa -> grado == null || grado.equalsIgnoreCase(narrativa.getAutor().getGrado()))
                    .toList();
        }
    }

    public static class InMemoryRolChangeLogRepository implements RolChangeLogRepositoryPort {
        private final List<RolChangeLog> logs = new ArrayList<>();

        @Override
        public void save(RolChangeLog log) {
            logs.add(log);
        }

        public List<RolChangeLog> getLogs() {
            return logs;
        }
    }

    public static class FakeAIPort implements AIPort {
        private String lastPrompt;
        private Map<String, Object> lastParams;

        @Override
        public String generarTexto(String prompt, Map<String, Object> params) {
            this.lastPrompt = prompt;
            this.lastParams = params;
            return "Esquema generado para " + params.get("region");
        }

        @Override
        public String generarImagen(String prompt) {
            return "imagen:" + prompt;
        }

        @Override
        public String convertirTextoAAudio(String texto) {
            return "audio:" + texto;
        }

        public String getLastPrompt() {
            return lastPrompt;
        }

        public Map<String, Object> getLastParams() {
            return lastParams;
        }
    }
}
