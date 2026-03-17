package com.gmao.backend.urgencePanne.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.gmao.backend.urgencePanne.model.UrgencePanne;

@Repository
public class UrgencePanneRepository {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<UrgencePanne> findAll(){
        String sql="""
            SELECT 
                u.ID_URGENCE_PANNE,
                u.URGENCE_PANNE,
                u.DESCRIPTION_URGENCE_PANNE
            FROM 
                URGENCE_PANNE u
        
            """;
        return jdbcTemplate.query(sql, (rs, rowNum) ->
            new UrgencePanne(
                rs.getInt("ID_URGENCE_PANNE"),
                rs.getString("URGENCE_PANNE"),
                rs.getString("DESCRIPTION_URGENCE_PANNE")
            )
        );
    };


}


