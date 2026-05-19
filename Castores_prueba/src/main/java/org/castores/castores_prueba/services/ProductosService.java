package org.castores.castores_prueba.services;

import org.castores.castores_prueba.entity.Producto;

import java.util.List;

public interface ProductosService {
    Producto guardar(Producto productos);

    Producto actualizar(Producto productos);

    Producto buscarPorId(Integer id);

    List<Producto> listar();

    List<Producto> listarActivos();

    Producto cambiarEstatus(Integer id);
}
