package com.gmao.backend.slot.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gmao.backend.slot.service.SlotServiceInterface;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import com.gmao.backend.slot.model.Slot;

@RestController
@RequestMapping("/slot")
@CrossOrigin(origins = "http://localhost:5173")
public class SlotController {

    private final SlotServiceInterface service;

    public SlotController(SlotServiceInterface service) {
        this.service = service;
    }

    @GetMapping
    public List<Slot> getSlot(){
        return service.findAll();
    }
    
}