package com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.ai;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import com.pollitocorp.backendCulturaStory.domain.port.out.AIPort;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class GeminiAIAdapter implements AIPort {

    @Value("${gemini.api.key:}")
    private String apiKey;

    private Client client;

    private synchronized void ensureClient() {
        if (client == null) {
            String cleanKey = apiKey != null ? apiKey.trim() : "";
            if (!cleanKey.isEmpty() && !cleanKey.equals("TU_API_KEY_AQUI")) {
                try {
                    // Inicialización del cliente siguiendo la documentación oficial (2026)
                    client = Client.builder()
                            .apiKey(cleanKey)
                            .build();
                } catch (Exception e) {
                    System.err.println("Error al inicializar el cliente de Gemini: " + e.getMessage());
                }
            }
        }
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

        try {
            ensureClient();
            if (client == null) {
                return "Error: No se pudo inicializar el cliente de Gemini. Verifique su API Key.";
            }

            System.out.println("Enviando petición a Gemini (Official SDK)...");
            
            // Usamos el modelo gemini-3-flash-preview segun la documentacion proporcionada
            GenerateContentResponse response = client.models.generateContent(
                    "gemini-3-flash-preview", 
                    prompt, 
                    null);
            
            if (response != null && response.text() != null) {
                System.out.println("Respuesta recibida exitosamente de Gemini SDK.");
                return response.text();
            }
            
            return "No se pudo generar contenido válido desde Gemini (SDK).";
        } catch (Exception e) {
            System.err.println("Error en GeminiAIAdapter (SDK): " + e.getMessage());
            e.printStackTrace();
            return "Error al conectarse a la API de Gemini (SDK): " + e.getMessage();
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
