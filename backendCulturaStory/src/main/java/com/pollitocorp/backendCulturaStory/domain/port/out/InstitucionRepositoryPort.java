package com.pollitocorp.backendCulturaStory.domain.port.out;

import com.pollitocorp.backendCulturaStory.domain.model.Institucion;
import java.util.List;

public interface InstitucionRepositoryPort {
    List<Institucion> obtenerTodas();
    List<Institucion> buscarPorNombre(String nombre);
}
