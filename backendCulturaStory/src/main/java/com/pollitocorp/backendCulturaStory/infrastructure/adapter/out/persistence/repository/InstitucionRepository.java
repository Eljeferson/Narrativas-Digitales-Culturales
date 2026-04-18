package com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.repository;

import com.pollitocorp.backendCulturaStory.infrastructure.adapter.out.persistence.entity.InstitucionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InstitucionRepository extends JpaRepository<InstitucionEntity, Integer> {
    
    @Query(value = "SELECT * FROM obtener_instituciones()", nativeQuery = true)
    List<InstitucionEntity> callObtenerInstituciones();

    @Query(value = "SELECT * FROM obtener_instituciones() WHERE institucion_educativa ILIKE CONCAT('%', :nombre, '%')", nativeQuery = true)
    List<InstitucionEntity> searchByNombre(@Param("nombre") String nombre);
}
