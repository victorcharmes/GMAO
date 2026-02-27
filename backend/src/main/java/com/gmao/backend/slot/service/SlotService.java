package com.gmao.backend.slot.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.gmao.backend.slot.repository.SlotRepository;
import com.gmao.backend.slot.model.Slot;

@Service
public class SlotService implements SlotServiceInterface{

    private final SlotRepository repository;

    public SlotService(SlotRepository repository) {
        this.repository = repository;
    }
    
    @Override
    public List<Slot> findAll(){
        return repository.findAll();
    }
}