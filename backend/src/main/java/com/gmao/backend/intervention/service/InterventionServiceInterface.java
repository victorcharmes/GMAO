
package com.gmao.backend.intervention.service;

import java.util.List;

import com.gmao.backend.intervention.model.InterventionView;

public interface InterventionServiceInterface {
    

    List<InterventionView> findAll();
    InterventionView save(InterventionView interventionView);
    public InterventionView update(InterventionView interventionView);
    boolean deleteById(Integer id);
}

