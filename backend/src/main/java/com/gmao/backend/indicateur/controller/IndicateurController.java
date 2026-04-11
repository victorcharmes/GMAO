package com.gmao.backend.indicateur.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.gmao.backend.indicateur.model.Indicateur;


@RestController
@RequestMapping("/indicateur")
@CrossOrigin(origins = "http://localhost:5173")
public class IndicateurController {


    @PostMapping
    public ResponseEntity<Indicateur> createIndicateur(@RequestBody Indicateur indicateur) {

        Indicateur savedIndicateur = indicateur;
        System.out.println(indicateur);
        return ResponseEntity.status(201).body(savedIndicateur);
    }
}
