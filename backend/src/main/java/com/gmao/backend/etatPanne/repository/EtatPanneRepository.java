package com.gmao.backend.etatPanne.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.gmao.backend.etatPanne.model.EtatPanne;

@Repository
public class EtatPanneRepository {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<EtatPanne> findAll(){
        String sql="""
            SELECT 
                ep.ID_ETAT_PANNE,
                ep.ETAT_PANNE,
                ep.DESCRIPTION_ETAT_PANNE
            FROM 
                ETAT_PANNE ep
        
            """;
        return jdbcTemplate.query(sql, (rs, rowNum) ->
            new EtatPanne(
                rs.getInt("ID_ETAT_PANNE"),
                rs.getInt("ETAT_PANNE"),
                rs.getString("DESCRIPTION_ETAT_PANNE")
            )
        );
    };


}


