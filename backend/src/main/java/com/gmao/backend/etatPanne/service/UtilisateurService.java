package com.gmao.backend.utilisateur.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.gmao.backend.utilisateur.repository.UtilisateurRepository;
import com.gmao.backend.utilisateur.model.Utilisateur;

@Service
public class UtilisateurService implements UtilisateurServiceInterface{

    private final UtilisateurRepository repository;

    public UtilisateurService(UtilisateurRepository repository) {
        this.repository = repository;
    }
    
    @Override
    public List<Utilisateur> findAll(){
        return repository.findAll();
    }
}