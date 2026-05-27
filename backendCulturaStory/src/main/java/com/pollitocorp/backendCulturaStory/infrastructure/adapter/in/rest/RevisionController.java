package com.pollitocorp.backendCulturaStory.infrastructure.adapter.in.rest;

import com.pollitocorp.backendCulturaStory.domain.model.NarrativaCultural;
import com.pollitocorp.backendCulturaStory.domain.port.in.RevisionUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/revision")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class RevisionController {

    private final RevisionUseCase revisionUseCase;

    @GetMapping("/grado/{grado}")
    public ResponseEntity<List<NarrativaCultural>> listarPorGrado(@PathVariable String grado) {
        return ResponseEntity.ok(revisionUseCase.obtenerNarrativasPorGradoDocente(grado));
    }

    @PostMapping("/{id}/aprobar")
    public ResponseEntity<Void> aprobar(@PathVariable UUID id, @RequestParam UUID docenteId) {
        revisionUseCase.aprobarNarrativa(id, docenteId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/rechazar")
    public ResponseEntity<Void> rechazar(@PathVariable UUID id, @RequestParam UUID docenteId,
            @RequestParam String motivo) {
        revisionUseCase.rechazarNarrativa(id, docenteId, motivo);
        return ResponseEntity.ok().build();
    }
}
