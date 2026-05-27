package com.pollitocorp.backendCulturaStory.application.service;

import com.pollitocorp.backendCulturaStory.domain.model.AutorEstudiante;
import com.pollitocorp.backendCulturaStory.domain.model.EstadoNarrativa;
import com.pollitocorp.backendCulturaStory.domain.model.NarrativaCultural;
import com.pollitocorp.backendCulturaStory.domain.port.in.NarrativaUseCase;
import com.pollitocorp.backendCulturaStory.domain.port.out.AIPort;
import com.pollitocorp.backendCulturaStory.domain.port.out.AutorRepositoryPort;
import com.pollitocorp.backendCulturaStory.domain.port.out.NarrativaRepositoryPort;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
public class NarrativaService implements NarrativaUseCase {

    private final NarrativaRepositoryPort repositoryPort;
    private final AutorRepositoryPort autorRepositoryPort;
    private final AIPort aiPort;

    @Override
    public NarrativaCultural crearNarrativa(NarrativaCultural narrativa) {
        // Validar y cargar el autor completo desde la BD
        if (narrativa.getAutor() == null || narrativa.getAutor().getId() == null) {
            throw new RuntimeException("Se requiere un autor con un ID válido para crear la narrativa");
        }
        AutorEstudiante autorCompleto = autorRepositoryPort.findById(narrativa.getAutor().getId())
                .orElseThrow(() -> new RuntimeException(
                        "No se encontró el autor con ID: " + narrativa.getAutor().getId() + 
                        ". Asegúrese de que el estudiante esté registrado como autor."));
        narrativa.setAutor(autorCompleto);

        narrativa.setId(UUID.randomUUID());
        narrativa.setEstado(EstadoNarrativa.BORRADOR);
        
        if (narrativa.getDestacada() == null) narrativa.setDestacada(false);
        if (narrativa.getVecesVista() == null) narrativa.setVecesVista(0);
        if (narrativa.getTipoRelato() == null) narrativa.setTipoRelato("leyenda"); // Default cultural type
        
        narrativa.setCreatedAt(LocalDateTime.now());
        narrativa.setUpdatedAt(LocalDateTime.now());
        return repositoryPort.save(narrativa);
    }

    @Override
    public NarrativaCultural guardarNarrativa(NarrativaCultural narrativa) {
        if (narrativa.getId() == null) {
            return crearNarrativa(narrativa);
        }

        NarrativaCultural existente = repositoryPort.findById(narrativa.getId())
                .orElseThrow(() -> new RuntimeException("No se encontró la narrativa con ID: " + narrativa.getId()));

        // Preservar campos que no deben cambiar o que son obligatorios
        narrativa.setCreatedAt(existente.getCreatedAt());
        if (narrativa.getAutor() == null) {
            narrativa.setAutor(existente.getAutor());
        } else if (narrativa.getAutor().getId() != null) {
            // Validar y cargar el autor si solo viene el ID
            AutorEstudiante autorCompleto = autorRepositoryPort.findById(narrativa.getAutor().getId())
                    .orElseThrow(() -> new RuntimeException("Autor no encontrado"));
            narrativa.setAutor(autorCompleto);
        }

        // Asegurar campos por defecto si vienen nulos
        if (narrativa.getTipoRelato() == null) narrativa.setTipoRelato(existente.getTipoRelato());
        if (narrativa.getEstado() == null) narrativa.setEstado(existente.getEstado());
        if (narrativa.getDestacada() == null) narrativa.setDestacada(existente.getDestacada());
        if (narrativa.getVecesVista() == null) narrativa.setVecesVista(existente.getVecesVista());

        narrativa.setUpdatedAt(LocalDateTime.now());
        return repositoryPort.save(narrativa);
    }

    @Override
    public Optional<NarrativaCultural> obtenerPorId(UUID id) {
        return repositoryPort.findById(id);
    }

    @Override
    public List<NarrativaCultural> obtenerPorAutor(UUID autorId) {
        return repositoryPort.findByAutorId(autorId);
    }

    @Override
    public String generarEsquema(String cultura) {
        // HU-01: Generar esquema narrativo con IA
        String prompt = "Genera un esquema narrativo para una historia de la cultura " + cultura + 
                         ". Incluye personajes, escenarios auténticos y una estructura de inicio, nudo y desenlace. " +
                         "IMPORTANTE: RETORNA ÚNICAMENTE EL ESQUEMA EN FORMATO TEXTO, SIN INTRODUCCIONES, EXPLICACIONES NI COMENTARIOS ADICIONALES.";
        Map<String, Object> params = new HashMap<>();
        params.put("region", cultura);
        return aiPort.generarTexto(prompt, params);
    }

    @Override
    public String mejorarNarrativa(String titulo, String cultura, String contenido) {
        System.out.println("Mejorando narrativa: " + titulo + " (Cultura: " + cultura + ")");
        String prompt = String.format(
            "Eres un experto en narrativa cultural peruana. Mejora la siguiente historia titulada '%s' de la región '%s'. " +
            "El texto actual es: '%s'. " +
            "Tu tarea es mejorar la redacción, ortografía y sobre todo la pertinencia cultural, " +
            "agregando detalles auténticos sin perder la esencia del autor. " +
            "IMPORTANTE: RETORNA ÚNICAMENTE EL CUENTO O HISTORIA MEJORADA. NO INCLUYAS NINGUNA INTRODUCCIÓN, EXPLICACIÓN, RESUMEN DE CAMBIOS NI COMENTARIOS AL FINAL. " +
            "TU RESPUESTA DEBE SER EXCLUSIVAMENTE EL TEXTO DE LA HISTORIA.",
            titulo, cultura, contenido
        );
        Map<String, Object> params = new HashMap<>();
        params.put("region", cultura);
        params.put("type", "improvement");
        return aiPort.generarTexto(prompt, params);
    }
}
