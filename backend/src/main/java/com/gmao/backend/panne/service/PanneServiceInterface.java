package com.gmao.backend.panne.service;

import java.util.List;

import com.gmao.backend.panne.model.Panne;
import com.gmao.backend.panne.model.PanneView;

public interface PanneServiceInterface {
    List<PanneView> findAll();
    Panne save(Panne panne);
    public Panne update(Panne panne);
    boolean deleteById(Integer id);
}
