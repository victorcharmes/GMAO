package com.gmao.backend.etatPanne.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.gmao.backend.etatPanne.repository.EtatPanneRepository;
import com.gmao.backend.etatPanne.model.EtatPanne;

@Service
public class EtatPanneService implements EtatPanneServiceInterface{

    private final EtatPanneRepository repository;

    public EtatPanneService(EtatPanneRepository repository) {
        this.repository = repository;
    }
    
    @Override
    public List<EtatPanne> findAll(){
        return repository.findAll();
    }
}