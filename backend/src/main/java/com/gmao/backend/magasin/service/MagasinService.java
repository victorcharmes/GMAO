package com.gmao.backend.magasin.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.gmao.backend.magasin.repository.MagasinRepository;
import com.gmao.backend.magasin.model.Magasin;

@Service
public class MagasinService implements MagasinServiceInterface{

    private final MagasinRepository repository;

    public MagasinService(MagasinRepository repository) {
        this.repository = repository;
    }
    
    @Override
    public List<Magasin> findAll(){
        return repository.findAll();
    }
}