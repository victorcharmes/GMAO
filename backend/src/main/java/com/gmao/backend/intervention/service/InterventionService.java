package com.gmao.backend.intervention.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.gmao.backend.intervention.repository.InterventionRepository;
import com.gmao.backend.intervention.model.InterventionView;

@Service
public class InterventionService implements InterventionServiceInterface{

    private final InterventionRepository repository;

    public InterventionService(InterventionRepository repository) {
        this.repository = repository;
    }
    
    @Override
    public List<InterventionView> findAll(){
        return repository.findAll();
    }
    
    @Override
    public InterventionView save(InterventionView interventionView) {
        return repository.save(interventionView);
    }

    @Override
    public InterventionView update(InterventionView interventionView) {
    int rows = repository.update(interventionView);

    if (rows == 0) {
        return null; // id inexistant
    }

    return interventionView;
    }
    
    @Override
    public boolean deleteById(Integer id) {

        int rowsAffected = repository.deleteById(id);

        return rowsAffected > 0;
    }
}