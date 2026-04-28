package com.pollitocorp.backendCulturaStory.infrastructure.adapter.in.rest;

import com.pollitocorp.backendCulturaStory.domain.model.NarrativaCultural;
import com.pollitocorp.backendCulturaStory.domain.port.in.NarrativaUseCase;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.in.rest.dto.MejoraNarrativaRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/narrativas")
@RequiredArgsConstructor
public class NarrativaController {

    private final NarrativaUseCase narrativaUseCase;

    @PostMapping
    public ResponseEntity<NarrativaCultural> crear(@RequestBody NarrativaCultural narrativa) {
        return ResponseEntity.ok(narrativaUseCase.crearNarrativa(narrativa));
    }

    @PutMapping
    public ResponseEntity<NarrativaCultural> guardar(@RequestBody NarrativaCultural narrativa) {
        return ResponseEntity.ok(narrativaUseCase.guardarNarrativa(narrativa));
    }

    @GetMapping("/{id}")
    public ResponseEntity<NarrativaCultural> obtenerPorId(@PathVariable UUID id) {
        return narrativaUseCase.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/autor/{autorId}")
    public ResponseEntity<List<NarrativaCultural>> obtenerPorAutor(@PathVariable UUID autorId) {
        return ResponseEntity.ok(narrativaUseCase.obtenerPorAutor(autorId));
    }

    @GetMapping("/generar-esquema")
    public ResponseEntity<String> generarEsquema(@RequestParam String cultura) {
        // HU-01: La IA genera un esquema narrativo culturalmente pertinente
        return ResponseEntity.ok(narrativaUseCase.generarEsquema(cultura));
    }

    @PostMapping("/mejorar-narrativa")
    public ResponseEntity<String> mejorarNarrativa(@RequestBody MejoraNarrativaRequest request) {
        return ResponseEntity.ok(narrativaUseCase.mejorarNarrativa(
            request.getTitulo(),
            request.getCultura(),
            request.getContenido()
        ));
    }
}
