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

    @Query(value = "SELECT id_institucion, institucion_educativa, grado FROM tabla_institucion " +
                   "WHERE institucion_educativa ILIKE CONCAT('%', :nombre, '%') " +
                   "AND (:grado IS NULL OR grado ILIKE CONCAT('%', :grado, '%'))", nativeQuery = true)
    List<InstitucionEntity> searchByNombreYGrado(@Param("nombre") String nombre, @Param("grado") String grado);
}
