package com.pollitocorp.backendCulturaStory.domain.port.out;

import java.util.Map;

public interface AIPort {
    String generarTexto(String prompt, Map<String, Object> params);
    String generarImagen(String prompt);
    String convertirTextoAAudio(String texto);
}
