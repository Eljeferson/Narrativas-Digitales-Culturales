package com.pollitocorp.backendCulturaStory.infrastructure.adapter.in.rest;

import com.pollitocorp.backendCulturaStory.application.service.DocenteService;
import com.pollitocorp.backendCulturaStory.domain.model.AutorEstudiante;
import com.pollitocorp.backendCulturaStory.domain.model.NarrativaCultural;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/docente")
@RequiredArgsConstructor
public class DocenteController {

    private final DocenteService docenteService;

    @GetMapping("/estudiantes")
    public ResponseEntity<List<AutorEstudiante>> listarEstudiantes(@RequestParam String grado) {
        // HU-09: Docente puede ver el listado de estudiantes de mi grado
        return ResponseEntity.ok(docenteService.listarEstudiantesPorGrado(grado));
    }

    @GetMapping("/estudiantes/{autorId}/narrativas")
    public ResponseEntity<List<NarrativaCultural>> verNarrativasEstudiante(@PathVariable UUID autorId) {
        // HU-09: Seguimiento personalizado al avance de cada autor
        return ResponseEntity.ok(docenteService.obtenerNarrativasPorAutor(autorId));
    }
}
