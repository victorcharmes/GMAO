package com.gmao.backend.urgencePanne.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gmao.backend.urgencePanne.service.UrgencePanneServiceInterface;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import com.gmao.backend.urgencePanne.model.UrgencePanne;

@RestController
@RequestMapping("/urgencePanne")
@CrossOrigin(origins = "http://localhost:5173")
public class UrgencePanneController {

    private final UrgencePanneServiceInterface service;

    public UrgencePanneController(UrgencePanneServiceInterface service) {
        this.service = service;
    }

    
    @GetMapping
    public List<UrgencePanne> getUrgencePanne(){
        return service.findAll();
    }
    
}