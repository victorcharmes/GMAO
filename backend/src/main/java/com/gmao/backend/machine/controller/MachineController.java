package com.gmao.backend.machine.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gmao.backend.machine.service.MachineServiceInterface;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import com.gmao.backend.machine.model.Machine;

@RestController
@RequestMapping("/machine")
@CrossOrigin(origins = "http://localhost:5173")
public class MachineController {

    private final MachineServiceInterface service;

    public MachineController(MachineServiceInterface service) {
        this.service = service;
    }

    @GetMapping
    public List<Machine> getMachine(){
        return service.findAll();
    }
    
@PostMapping
public ResponseEntity<Machine> createMachine(@RequestBody Machine machine) {

    // 🔎 Affichage console pour test
    System.out.println("=== MACHINE REÇUE ===");
    System.out.println(machine);
    System.out.println("=====================");

    return ResponseEntity.ok(machine);
}
}
