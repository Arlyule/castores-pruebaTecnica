package org.castores.castores_prueba.repository;

import org.castores.castores_prueba.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductosRepository extends JpaRepository<Producto, Integer> {

    List<Producto> findByEstatus(Boolean estatus);

}
