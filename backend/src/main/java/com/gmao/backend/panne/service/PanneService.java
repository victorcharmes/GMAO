package com.gmao.backend.panne.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.gmao.backend.panne.repository.PanneRepository;
import com.gmao.backend.panne.model.Panne;
import com.gmao.backend.panne.model.PanneView;

@Service
public class PanneService implements PanneServiceInterface{

    private final PanneRepository repository;

    public PanneService(PanneRepository repository) {
        this.repository = repository;
    }
    
    @Override
    public List<PanneView> findAll(){
        return repository.findAll();
    }
    
    @Override
    public Panne save(Panne panne) {
        return repository.save(panne);
    }

    @Override
    public Panne update(Panne panne) {
    int rows = repository.update(panne);

    if (rows == 0) {
        return null; // id inexistant
    }

    return panne;
    }
    
    @Override
    public boolean deleteById(Integer id) {

        int rowsAffected = repository.deleteById(id);

        return rowsAffected > 0;
    }
}
