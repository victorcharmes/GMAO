package com.gmao.backend.classeMachine.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.gmao.backend.classeMachine.repository.ClasseRepository;
import com.gmao.backend.classeMachine.model.Classe;

@Service
public class ClasseService implements ClasseServiceInterface{

    private final ClasseRepository repository;

    public ClasseService(ClasseRepository repository) {
        this.repository = repository;
    }
    
    @Override
    public List<Classe> findAll(){
        return repository.findAll();
    }
}