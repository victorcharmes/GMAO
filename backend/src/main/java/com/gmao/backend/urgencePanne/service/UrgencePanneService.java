package com.gmao.backend.urgencePanne.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.gmao.backend.urgencePanne.repository.UrgencePanneRepository;
import com.gmao.backend.urgencePanne.model.UrgencePanne;

@Service
public class UrgencePanneService implements UrgencePanneServiceInterface{

    private final UrgencePanneRepository repository;

    public UrgencePanneService(UrgencePanneRepository repository) {
        this.repository = repository;
    }
    
    @Override
    public List<UrgencePanne> findAll(){
        return repository.findAll();
    }
}