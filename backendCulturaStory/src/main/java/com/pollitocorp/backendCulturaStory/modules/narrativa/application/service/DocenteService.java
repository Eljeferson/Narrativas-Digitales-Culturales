package com.pollitocorp.backendCulturaStory.modules.narrativa.application.service;

import com.pollitocorp.backendCulturaStory.modules.narrativa.domain.model.AutorEstudiante;
import com.pollitocorp.backendCulturaStory.modules.narrativa.domain.model.NarrativaCultural;
import com.pollitocorp.backendCulturaStory.modules.narrativa.domain.model.StudentSummary;
import com.pollitocorp.backendCulturaStory.modules.narrativa.domain.port.in.DocenteUseCase;
import com.pollitocorp.backendCulturaStory.modules.narrativa.domain.port.out.AutorRepositoryPort;
import com.pollitocorp.backendCulturaStory.modules.narrativa.domain.port.out.NarrativaRepositoryPort;
import com.pollitocorp.backendCulturaStory.modules.auth.domain.port.out.UsuarioRepositoryPort;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
public class DocenteService implements DocenteUseCase {

    private final AutorRepositoryPort autorRepository;
    private final NarrativaRepositoryPort narrativaRepository;
    private final UsuarioRepositoryPort usuarioRepository;

    @Override
    public List<StudentSummary> listarEstudiantesPorGrado(String grado) {
        // HU-09: Listado de estudiantes del grado
        return autorRepository.findByGrado(grado).stream()
                .filter(autor -> usuarioRepository.findById(autor.getUserId())
                        .map(usuario -> "estudiante".equalsIgnoreCase(usuario.getRol()))
                        .orElse(false))
                .map(this::toStudentSummary)
                .toList();
    }

    @Override
    public List<NarrativaCultural> obtenerNarrativasPorAutor(UUID autorId) {
        // HU-09: Seguimiento personalizado
        return narrativaRepository.findByAutorId(autorId);
    }

    private StudentSummary toStudentSummary(AutorEstudiante autor) {
        String email = usuarioRepository.findById(autor.getUserId())
                .map(usuario -> usuario.getEmail())
                .orElse(null);

        return StudentSummary.builder()
                .id(autor.getId())
                .userId(autor.getUserId())
                .email(email)
                .nombreCompleto(autor.getNombreCompleto())
                .grado(autor.getGrado())
                .institucion(autor.getInstitucion())
                .regionCultural(autor.getRegionCultural())
                .lenguaMaterna(autor.getLenguaMaterna())
                .bio(autor.getBio())
                .fotoPerfilUrl(autor.getFotoPerfilUrl())
                .narrativasPublicadas(autor.getNarrativasPublicadas())
                .build();
    }
}
