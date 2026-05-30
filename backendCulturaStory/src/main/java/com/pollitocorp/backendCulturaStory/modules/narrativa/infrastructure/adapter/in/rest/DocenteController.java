package com.pollitocorp.backendCulturaStory.modules.narrativa.infrastructure.adapter.in.rest;

import com.pollitocorp.backendCulturaStory.modules.narrativa.domain.model.NarrativaCultural;
import com.pollitocorp.backendCulturaStory.modules.narrativa.domain.model.StudentSummary;
import com.pollitocorp.backendCulturaStory.modules.narrativa.domain.port.in.DocenteUseCase;
import com.pollitocorp.backendCulturaStory.modules.narrativa.infrastructure.adapter.in.rest.dto.StudentSummaryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/docente")
@RequiredArgsConstructor
public class DocenteController {

    private final DocenteUseCase docenteUseCase;

    @GetMapping("/estudiantes")
    public ResponseEntity<List<StudentSummaryResponse>> listarEstudiantes(@RequestParam String grado) {
        // HU-09: Docente puede ver el listado de estudiantes de mi grado
        return ResponseEntity.ok(docenteUseCase.listarEstudiantesPorGrado(grado).stream()
                .map(this::toResponse)
                .toList());
    }

    @GetMapping("/estudiantes/{autorId}/narrativas")
    public ResponseEntity<List<NarrativaCultural>> verNarrativasEstudiante(@PathVariable UUID autorId) {
        // HU-09: Seguimiento personalizado al avance de cada autor
        return ResponseEntity.ok(docenteUseCase.obtenerNarrativasPorAutor(autorId));
    }

    private StudentSummaryResponse toResponse(StudentSummary student) {
        return StudentSummaryResponse.builder()
                .id(student.getId())
                .userId(student.getUserId())
                .email(student.getEmail())
                .nombreCompleto(student.getNombreCompleto())
                .grado(student.getGrado())
                .institucion(student.getInstitucion())
                .regionCultural(student.getRegionCultural())
                .lenguaMaterna(student.getLenguaMaterna())
                .bio(student.getBio())
                .fotoPerfilUrl(student.getFotoPerfilUrl())
                .narrativasPublicadas(student.getNarrativasPublicadas())
                .build();
    }
}
