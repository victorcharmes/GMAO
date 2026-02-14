package com.gmao.backend.classeMachine.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gmao.backend.classeMachine.service.ClasseServiceInterface;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import com.gmao.backend.classeMachine.model.Classe;

@RestController
@RequestMapping("/classe")
@CrossOrigin(origins = "http://localhost:5173")
public class ClasseController {

    private final ClasseServiceInterface service;

    public ClasseController(ClasseServiceInterface service) {
        this.service = service;
    }

    @GetMapping
    public List<Classe> getClasse(){
        return service.findAll();
    }
    
}
