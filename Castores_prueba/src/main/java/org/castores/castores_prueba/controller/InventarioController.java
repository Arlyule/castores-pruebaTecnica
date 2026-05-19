package org.castores.castores_prueba.controller;

import org.castores.castores_prueba.entity.Inventario;
import org.castores.castores_prueba.services.InventarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/inventario")
public class InventarioController {

    @Autowired
    private InventarioService service;

    @PostMapping("/obtener-todos")
    public ResponseEntity<?> obtenerTodos() {
        try {
            List<Inventario> respuesta = service.obtenerTodos();
            return ResponseEntity.ok(respuesta);
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }


    @PostMapping("/obtener")
    public ResponseEntity<?> obtenerPorId(@RequestBody Map<String, Integer> request) {
        try {
            Integer idInventario = request.get("idInventario");
            Inventario respuesta = service.obtenerPorId(idInventario);
            return ResponseEntity.ok(respuesta);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/guardar")
    public ResponseEntity<?> guardar(@RequestBody Inventario inventario) {
        try {
            Inventario respuesta = service.guardar(inventario);
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
    public ResponseEntity<?> actualizar(@RequestBody Inventario inventario) {
        try {
            Inventario respuesta = service.actualizar(inventario);
            return ResponseEntity.ok(respuesta);
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
}