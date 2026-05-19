package org.castores.castores_prueba.services.impl;

import org.castores.castores_prueba.entity.Inventario;
import org.castores.castores_prueba.entity.Producto;
import org.castores.castores_prueba.repository.InventarioRepository;
import org.castores.castores_prueba.repository.ProductosRepository;
import org.castores.castores_prueba.services.InventarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class InventarioServiceImpl implements InventarioService {

    @Autowired
    private InventarioRepository repository;

    @Override
    public List<Inventario> obtenerTodos() {
        return repository.findAll();
    }


    @Override
    public Inventario obtenerPorId(Integer idInventario) {
        return repository.findById(idInventario)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Inventario no encontrado"
                        )
                );
    }

    @Override
    public Inventario guardar(Inventario inventario) {
        inventario.setFechaRegistro(new Date());
        return repository.save(inventario);
    }

    @Override
    public Inventario actualizar(Inventario inventario) {
        Inventario inventarioActual = obtenerPorId(inventario.getIdInventario());
        inventarioActual.setCantidad(inventario.getCantidad());
        inventarioActual.setTipoMovimiento(inventario.getTipoMovimiento());
        return repository.save(inventarioActual);
    }
}