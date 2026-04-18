package com.pollitocorp.backendCulturaStory.infrastructure.adapter.in.rest;

import com.pollitocorp.backendCulturaStory.domain.model.Institucion;
import com.pollitocorp.backendCulturaStory.domain.port.in.InstitucionUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/instituciones")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class InstitucionController {

    private final InstitucionUseCase institucionUseCase;

    @GetMapping
    public ResponseEntity<List<Institucion>> listar(@RequestParam(required = false) String nombre) {
        if (nombre != null && !nombre.isEmpty()) {
            return ResponseEntity.ok(institucionUseCase.buscarPorNombre(nombre));
        }
        return ResponseEntity.ok(institucionUseCase.listarInstituciones());
    }
}
