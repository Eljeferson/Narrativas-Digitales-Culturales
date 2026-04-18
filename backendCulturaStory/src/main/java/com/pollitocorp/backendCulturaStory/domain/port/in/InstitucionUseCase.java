package com.pollitocorp.backendCulturaStory.domain.port.in;

import com.pollitocorp.backendCulturaStory.domain.model.Institucion;
import java.util.List;

public interface InstitucionUseCase {
    List<Institucion> listarInstituciones();
    List<Institucion> buscarPorNombre(String nombre);
}
