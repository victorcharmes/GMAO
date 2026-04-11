package com.gmao.backend.intervention.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gmao.backend.intervention.service.InterventionServiceInterface;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

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

    @PostMapping
    public ResponseEntity<InterventionView> createInterventionView(@RequestBody InterventionView interventionView) {

        InterventionView savedInterventionView = service.save(interventionView);
        return ResponseEntity.status(201).body(savedInterventionView);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InterventionView> updateInterventionView(
            @PathVariable Integer id,
            @RequestBody InterventionView interventionView) {

        interventionView.setIdIntervention(id);

        InterventionView updatedInterventionView = service.update(interventionView);

        if (updatedInterventionView == null) {
            return ResponseEntity.notFound().build();
        }
        System.out.println("ID reçu : " + id);
        System.out.println("ID dans objet : " + interventionView.getIdIntervention());
        return ResponseEntity.ok(updatedInterventionView);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInterventionView(@PathVariable Integer id) {

        System.out.println("ID reçu pour suppression : " + id);

        boolean deleted = service.deleteById(id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
    
}