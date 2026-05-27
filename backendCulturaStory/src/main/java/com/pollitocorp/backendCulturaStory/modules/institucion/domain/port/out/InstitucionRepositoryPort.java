package com.pollitocorp.backendCulturaStory.modules.institucion.domain.port.out;

import com.pollitocorp.backendCulturaStory.modules.institucion.domain.model.Institucion;
import java.util.List;

public interface InstitucionRepositoryPort {
    List<Institucion> obtenerTodas();
    List<Institucion> buscarPorNombreYGrado(String nombre, String grado);
}
