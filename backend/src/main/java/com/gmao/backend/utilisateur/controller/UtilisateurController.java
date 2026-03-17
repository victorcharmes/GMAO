package com.gmao.backend.utilisateur.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gmao.backend.utilisateur.service.UtilisateurServiceInterface;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import com.gmao.backend.utilisateur.model.Utilisateur;

@RestController
@RequestMapping("/utilisateur")
@CrossOrigin(origins = "http://localhost:5173")
public class UtilisateurController {

    private final UtilisateurServiceInterface service;

    public UtilisateurController(UtilisateurServiceInterface service) {
        this.service = service;
    }

    @GetMapping
    public List<Utilisateur> getUtilisateur(){
        return service.findAll();
    }
    
}