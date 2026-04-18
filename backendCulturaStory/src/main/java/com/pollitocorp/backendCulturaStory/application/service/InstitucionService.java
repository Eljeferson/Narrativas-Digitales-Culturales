package com.pollitocorp.backendCulturaStory.application.service;

import com.pollitocorp.backendCulturaStory.domain.model.Institucion;
import com.pollitocorp.backendCulturaStory.domain.port.in.InstitucionUseCase;
import com.pollitocorp.backendCulturaStory.domain.port.out.InstitucionRepositoryPort;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class InstitucionService implements InstitucionUseCase {

    private final InstitucionRepositoryPort repositoryPort;

    @Override
    public List<Institucion> listarInstituciones() {
        return repositoryPort.obtenerTodas();
    }

    @Override
    public List<Institucion> buscarPorNombreYGrado(String nombre, String grado) {
        return repositoryPort.buscarPorNombreYGrado(nombre, grado);
    }
}
