package com.gmao.backend.etatPanne.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gmao.backend.etatPanne.service.EtatPanneServiceInterface;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import com.gmao.backend.etatPanne.model.EtatPanne;

@RestController
@RequestMapping("/etatPanne")
@CrossOrigin(origins = "http://localhost:5173")
public class EtatPanneController {

    private final EtatPanneServiceInterface service;

    public EtatPanneController(EtatPanneServiceInterface service) {
        this.service = service;
    }

    @GetMapping
    public List<EtatPanne> getEtatPanne(){
        return service.findAll();
    }
    
}