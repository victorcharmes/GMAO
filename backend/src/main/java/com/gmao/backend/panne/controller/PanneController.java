package com.gmao.backend.panne.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import com.gmao.backend.panne.model.PanneView;
import com.gmao.backend.panne.model.Panne;
import com.gmao.backend.panne.service.PanneServiceInterface;

@RestController
@RequestMapping("/panne")
@CrossOrigin(origins = "http://localhost:5173")
public class PanneController {

    private final PanneServiceInterface service;

    public PanneController(PanneServiceInterface service) {
        this.service = service;
    }

    @GetMapping
    public List<PanneView> getPanne(){
        return service.findAll();
    }

    @PostMapping
    public ResponseEntity<Panne> createPanne(@RequestBody Panne panne) {

        Panne savedPanne = service.save(panne);
        return ResponseEntity.status(201).body(savedPanne);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Panne> updatePanne(
            @PathVariable Integer id,
            @RequestBody Panne panne) {

        panne.setId(id);

        Panne updatedPanne = service.update(panne);

        if (updatedPanne == null) {
            return ResponseEntity.notFound().build();
        }
        System.out.println("ID reçu : " + id);
        System.out.println("ID dans objet : " + panne.getId());
        return ResponseEntity.ok(updatedPanne);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePanne(@PathVariable Integer id) {

        System.out.println("ID reçu pour suppression : " + id);

        boolean deleted = service.deleteById(id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}
