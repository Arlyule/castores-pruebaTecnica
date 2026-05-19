package org.castores.castores_prueba.services;

import org.castores.castores_prueba.entity.Usuario;

import java.util.List;

public interface UsuarioService {

    Usuario login(String correo, String contrasena);

    List<Usuario> listar();

    Usuario buscarPorId(Integer id);

    Usuario guardar(Usuario usuario);

    Usuario actualizar(Usuario usuario);

    void eliminar(Integer id);
}
