package com.gmao.backend.intervention.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.gmao.backend.intervention.model.InterventionView;

@Repository
public class InterventionRepository {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<InterventionView> findAll(){
        String sql="""
            SELECT 
                i.ID_INTERVENTION,
                i.NOM_INTERVENTION,
                i.DESCRIPTION_INTERVENTION,
                i.DATE_DEBUT_INTERVENTION,
                i.DATE_FIN_INTERVENTION,
                i.DUREE_INTERVENTION,
                i.PANNE_DE_INTERVENTION,
                i.UTILISATEUR_INTERVENANT
            FROM 
                INTERVENTION i
        
            """;
        return jdbcTemplate.query(sql, (rs, rowNum) ->
            new InterventionView(
                rs.getInt("ID_INTERVENTION"),
                rs.getString("NOM_INTERVENTION"),
                rs.getString("DESCRIPTION_INTERVENTION"),
                rs.getTimestamp("DATE_DEBUT_INTERVENTION") != null ? rs.getTimestamp("DATE_DEBUT_INTERVENTION").toLocalDateTime() : null,
                rs.getTimestamp("DATE_FIN_INTERVENTION") != null ? rs.getTimestamp("DATE_FIN_INTERVENTION").toLocalDateTime() : null,
                rs.getInt("DUREE_INTERVENTION"),
                rs.getInt("PANNE_DE_INTERVENTION"),
                rs.getInt("UTILISATEUR_INTERVENANT")
            )
        );
    };


}


