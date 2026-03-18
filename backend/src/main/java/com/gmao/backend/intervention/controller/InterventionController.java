package com.gmao.backend.intervention.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gmao.backend.intervention.service.InterventionServiceInterface;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import com.gmao.backend.intervention.model.InterventionView;

@RestController
@RequestMapping("/intervention")
@CrossOrigin(origins = "http://localhost:5173")
public class InterventionController {

    private final InterventionServiceInterface service;

    public InterventionController(InterventionServiceInterface service) {
        this.service = service;
    }

    @GetMapping
    public List<InterventionView> getIntervention(){
        return service.findAll();
    }
    
}