package org.castores.castores_prueba.services.impl;

import org.castores.castores_prueba.entity.Rol;
import org.castores.castores_prueba.repository.RolRepository;
import org.castores.castores_prueba.services.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolServiceImpl implements RolService {
    @Autowired
    private RolRepository repository;

    @Override
    public List<Rol> listar() {
        return repository.findAll();
    }
}
