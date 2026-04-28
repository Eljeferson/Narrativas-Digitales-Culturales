package com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.ai;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pollitocorp.backendCulturaStory.domain.port.out.AIPort;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Component
public class GeminiAIAdapter implements AIPort {

    @Value("${gemini.api.key:}")
    private String apiKey;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public GeminiAIAdapter() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    @Override
    public String generarTexto(String prompt, Map<String, Object> params) {
        if (apiKey == null || apiKey.isEmpty() || apiKey.equals("TU_API_KEY_AQUI")) {
            return "Esquema generado (Simulado): \n1. Introducción en región "
                    + params.getOrDefault("region", "desconocida")
                    + ".\n2. Desarrollo con personajes locales.\n3. Desenlace cultural.";
        }

        try {
            String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key="
                    + apiKey;

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            String requestBody = "{\"contents\": [{\"parts\": [{\"text\": \""
                    + prompt.replace("\"", "\\\"").replace("\n", "\\n") + "\"}]}]}";

            HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                JsonNode rootNode = objectMapper.readTree(response.getBody());
                JsonNode candidates = rootNode.path("candidates");
                if (candidates.isArray() && candidates.size() > 0) {
                    JsonNode content = candidates.get(0).path("content");
                    JsonNode parts = content.path("parts");
                    if (parts.isArray() && parts.size() > 0) {
                        return parts.get(0).path("text").asText();
                    }
                }
            }
            return "No se pudo generar contenido válido desde Gemini.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error al conectarse a la API de Gemini: " + e.getMessage();
        }
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
