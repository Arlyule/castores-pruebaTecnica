package org.castores.castores_prueba.services.impl;

import org.castores.castores_prueba.entity.Producto;
import org.castores.castores_prueba.repository.ProductosRepository;
import org.castores.castores_prueba.services.ProductosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductosServiceImpl implements ProductosService {

    @Autowired
    private ProductosRepository repository;

    @Override
    public Producto guardar(Producto productos) {

        productos.setEstatus(true);

        return repository.save(productos);
    }

    @Override
    public Producto actualizar(Producto productos) {
        return repository.save(productos);
    }

    @Override
    public Producto buscarPorId(Integer id) {

        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    @Override
    public List<Producto> listar() {
        return repository.findAll();
    }

    @Override
    public List<Producto> listarActivos() {
        return repository.findByEstatus(true);
    }

    @Override
    public Producto cambiarEstatus(Integer id) {

        Producto productos = buscarPorId(id);

        productos.setEstatus(!productos.getEstatus());

        return repository.save(productos);
    }
}
