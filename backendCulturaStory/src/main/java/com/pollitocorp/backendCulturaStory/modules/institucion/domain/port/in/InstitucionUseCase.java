package com.pollitocorp.backendCulturaStory.modules.institucion.domain.port.in;

import com.pollitocorp.backendCulturaStory.modules.institucion.domain.model.Institucion;
import java.util.List;

public interface InstitucionUseCase {
    List<Institucion> listarInstituciones();
    List<Institucion> buscarPorNombreYGrado(String nombre, String grado);
}
