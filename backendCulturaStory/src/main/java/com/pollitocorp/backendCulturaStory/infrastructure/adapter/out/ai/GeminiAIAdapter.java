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
        org.springframework.http.client.SimpleClientHttpRequestFactory factory = new org.springframework.http.client.SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(5000);
        factory.setReadTimeout(30000);
        this.restTemplate = new RestTemplate(factory);
        this.objectMapper = new ObjectMapper();
    }

    @Override
    public String generarTexto(String prompt, Map<String, Object> params) {
        String cleanKey = apiKey != null ? apiKey.trim() : "";
        if (cleanKey.isEmpty() || cleanKey.equals("TU_API_KEY_AQUI")) {
            System.out.println("Gemini API Key no configurada. Usando modo simulación.");
            return "Esquema generado (Simulado): \n1. Introducción en región "
                    + params.getOrDefault("region", "desconocida")
                    + ".\n2. Desarrollo con personajes locales.\n3. Desenlace cultural.";
        }
        System.out.println("Iniciando petición a Gemini (API Key detectada)");

        try {
            String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key="
                    + cleanKey;

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Construir el cuerpo de la petición usando un Map para mayor seguridad con
            // JSON
            Map<String, Object> part = new HashMap<>();
            part.put("text", prompt);

            Map<String, Object> content = new HashMap<>();
            content.put("parts", new Object[] { part });

            Map<String, Object> bodyMap = new HashMap<>();
            bodyMap.put("contents", new Object[] { content });

            String requestBody = objectMapper.writeValueAsString(bodyMap);
            System.out.println("Enviando petición a Gemini...");

            HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
            System.out.println("Respuesta recibida de Gemini. Status: " + response.getStatusCode());

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                JsonNode rootNode = objectMapper.readTree(response.getBody());
                JsonNode candidates = rootNode.path("candidates");
                if (candidates.isArray() && candidates.size() > 0) {
                    JsonNode contentNode = candidates.get(0).path("content");
                    JsonNode parts = contentNode.path("parts");
                    if (parts.isArray() && parts.size() > 0) {
                        return parts.get(0).path("text").asText();
                    }
                }
            }
            return "No se pudo generar contenido válido desde Gemini. Respuesta del servidor: "
                    + response.getStatusCode();
        } catch (Exception e) {
            System.err.println("Error en GeminiAIAdapter: " + e.getMessage());
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
