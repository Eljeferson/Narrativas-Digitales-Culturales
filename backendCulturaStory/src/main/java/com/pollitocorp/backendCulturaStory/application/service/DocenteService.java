package com.pollitocorp.backendCulturaStory.application.service;

import com.pollitocorp.backendCulturaStory.domain.model.AutorEstudiante;
import com.pollitocorp.backendCulturaStory.domain.model.NarrativaCultural;
import com.pollitocorp.backendCulturaStory.domain.port.out.AutorRepositoryPort;
import com.pollitocorp.backendCulturaStory.domain.port.out.NarrativaRepositoryPort;
import com.pollitocorp.backendCulturaStory.domain.port.out.UsuarioRepositoryPort;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.in.rest.dto.StudentSummaryResponse;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
public class DocenteService {

    private final AutorRepositoryPort autorRepository;
    private final NarrativaRepositoryPort narrativaRepository;
    private final UsuarioRepositoryPort usuarioRepository;

    public List<StudentSummaryResponse> listarEstudiantesPorGrado(String grado) {
        // HU-09: Listado de estudiantes del grado
        return autorRepository.findByGrado(grado).stream()
                .filter(autor -> usuarioRepository.findById(autor.getUserId())
                        .map(usuario -> "estudiante".equalsIgnoreCase(usuario.getRol()))
                        .orElse(false))
                .map(this::toStudentSummary)
                .toList();
    }

    public List<NarrativaCultural> obtenerNarrativasPorAutor(UUID autorId) {
        // HU-09: Seguimiento personalizado
        return narrativaRepository.findByAutorId(autorId);
    }

    private StudentSummaryResponse toStudentSummary(AutorEstudiante autor) {
        String email = usuarioRepository.findById(autor.getUserId())
                .map(usuario -> usuario.getEmail())
                .orElse(null);

        return StudentSummaryResponse.builder()
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
