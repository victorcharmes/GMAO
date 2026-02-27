package com.gmao.backend.magasin.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gmao.backend.magasin.service.MagasinServiceInterface;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import com.gmao.backend.magasin.model.Magasin;

@RestController
@RequestMapping("/magasin")
@CrossOrigin(origins = "http://localhost:5173")
public class MagasinController {

    private final MagasinServiceInterface service;

    public MagasinController(MagasinServiceInterface service) {
        this.service = service;
    }

    @GetMapping
    public List<Magasin> getMagasin(){
        return service.findAll();
    }
    
}