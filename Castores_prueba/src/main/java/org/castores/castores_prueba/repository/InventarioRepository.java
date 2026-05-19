package org.castores.castores_prueba.repository;

import org.castores.castores_prueba.entity.Inventario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventarioRepository extends JpaRepository<Inventario, Integer> {
}
