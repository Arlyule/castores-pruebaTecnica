package org.castores.castores_prueba.services.impl;

import org.castores.castores_prueba.entity.Usuario;
import org.castores.castores_prueba.repository.UsuarioRepository;
import org.castores.castores_prueba.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    @Override
    public Usuario login(String correo, String contrasena) {
        Usuario usuario = repository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        if (usuario.getEstatus() == null || !usuario.getEstatus()) {
            throw new RuntimeException("Usuario inactivo");
        }
        
        if (!usuario.getContrasena().equals(contrasena)) {
            throw new RuntimeException("Contraseña incorrecta");
        }
        return usuario;
    }

    @Override
    public List<Usuario> listar() {
        return repository.findAll();
    }

    @Override
    public Usuario buscarPorId(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    @Override
    public Usuario guardar(Usuario usuario) {
        return repository.save(usuario);
    }

    @Override
    public Usuario actualizar(Usuario usuario) {
        Usuario usuarioActual = buscarPorId(usuario.getIdUsuario());
        usuarioActual.setNombre(usuario.getNombre());
        usuarioActual.setCorreo(usuario.getCorreo());
        usuarioActual.setContrasena(usuario.getContrasena());
        usuarioActual.setEstatus(usuario.getEstatus());
        usuarioActual.setRol(usuario.getRol());
        return repository.save(usuarioActual);
    }

    @Override
    public void eliminar(Integer id) {
        Usuario usuario = buscarPorId(id);
        repository.delete(usuario);
    }
}
