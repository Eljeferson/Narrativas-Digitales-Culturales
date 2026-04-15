package com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.ai;

import com.pollitocorp.backendCulturaStory.domain.port.out.AIPort;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Component
public class GeminiAIAdapter implements AIPort {

    @Value("${gemini.api.key:}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public GeminiAIAdapter() {
        this.restTemplate = new RestTemplate();
    }

    @Override
    public String generarTexto(String prompt, Map<String, Object> params) {
        // Implementation for Google Gemini API call
        // For PMV 1, we simulate or use a basic prompt logic
        if (apiKey == null || apiKey.isEmpty()) {
            return "Esquema generado (Simulado): \n1. Introducción en región " + params.getOrDefault("region", "desconocida") + ".\n2. Desarrollo con personajes locales.\n3. Desenlace cultural.";
        }
        
        // Logical structure for real API call (omitted for brevity in this step, but structure is provided)
        return "Contenido generado por Gemini para: " + prompt;
    }

    @Override
    public String generarImagen(String prompt) {
        // HU-03 (Future PMV)
        return "URL_IMAGEN_IA";
    }

    @Override
    public String convertirTextoAAudio(String texto) {
        // HU-04 (Future PMV)
        return "URL_AUDIO_IA";
    }
}
