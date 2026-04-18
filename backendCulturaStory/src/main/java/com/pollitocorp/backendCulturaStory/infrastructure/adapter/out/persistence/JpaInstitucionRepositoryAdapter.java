package com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence;

import com.pollitocorp.backendCulturaStory.domain.model.Institucion;
import com.pollitocorp.backendCulturaStory.domain.port.out.InstitucionRepositoryPort;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.mapper.InstitucionMapper;
import com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.repository.InstitucionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class JpaInstitucionRepositoryAdapter implements InstitucionRepositoryPort {

    private final InstitucionRepository repository;
    private final InstitucionMapper mapper;

    @Override
    public List<Institucion> obtenerTodas() {
        return repository.callObtenerInstituciones().stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<Institucion> buscarPorNombre(String nombre) {
        return repository.searchByNombre(nombre).stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }
}
