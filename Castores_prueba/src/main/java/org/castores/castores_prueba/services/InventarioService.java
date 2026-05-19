package org.castores.castores_prueba.services;

import org.castores.castores_prueba.entity.Inventario;

import java.util.List;

public interface InventarioService {

    List<Inventario> obtenerTodos();

    Inventario obtenerPorId(Integer idInventario);

    Inventario guardar(Inventario inventario);

    Inventario actualizar(Inventario inventario);
}
