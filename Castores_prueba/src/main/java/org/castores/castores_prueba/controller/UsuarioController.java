package org.castores.castores_prueba.controller;

import org.castores.castores_prueba.entity.Usuario;
import org.castores.castores_prueba.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @PostMapping("/listar")
    public ResponseEntity<List<Usuario>> listar() {
        List<Usuario> usuarios = service.listar();
        return ResponseEntity.ok(usuarios);
    }

    @PostMapping("/buscar")
    public ResponseEntity<?> buscar(@RequestBody Map<String, Integer> request) {
        try {
            Integer idUsuario = request.get("idUsuario");
            Usuario usuario = service.buscarPorId(idUsuario);
            return ResponseEntity.ok(usuario);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/guardar")
    public ResponseEntity<?> guardar(@RequestBody Usuario usuario) {
        try {
            Usuario respuesta = service.guardar(usuario);
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
    public ResponseEntity<?> actualizar(@RequestBody Usuario usuario) {
        try {
            Usuario respuesta = service.actualizar(usuario);
            return ResponseEntity.ok(respuesta);
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

}
