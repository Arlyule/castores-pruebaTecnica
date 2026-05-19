package org.castores.castores_prueba.controller;

import org.castores.castores_prueba.entity.Producto;
import org.castores.castores_prueba.services.ProductosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/producto")
public class ProductosController {

    @Autowired
    private ProductosService service;

    @PostMapping("/guardar")
    public ResponseEntity<?> guardar(@RequestBody Producto productos) {
        try {
            Producto respuesta = service.guardar(productos);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(respuesta);
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @PostMapping("/actualizar")
    public ResponseEntity<?> actualizar(@RequestBody Producto productos) {
        try {
            Producto respuesta = service.actualizar(productos);
            return ResponseEntity.ok(respuesta);
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @PostMapping("/listar")
    public ResponseEntity<?> listar() {
        try {
            List<Producto> respuesta = service.listar();
            return ResponseEntity.ok(respuesta);
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @PostMapping("/buscar")
    public ResponseEntity<?> buscar(
            @RequestBody Map<String, Integer> request) {
        try {
            Integer id = request.get("id");
            Producto respuesta = service.buscarPorId(id);
            return ResponseEntity.ok(respuesta);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/cambiar-estatus")
    public ResponseEntity<?> cambiarEstatus(@RequestBody Map<String, Integer> request) {
        try {
            Integer id = request.get("id");
            Producto respuesta = service.cambiarEstatus(id);
            return ResponseEntity.ok(respuesta);
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
}