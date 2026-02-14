package com.gmao.backend.criticiteMachine.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import com.gmao.backend.criticiteMachine.model.Criticite;

@Repository
public class CriticiteRepository {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Criticite> findAll(){
        String sql="""
            SELECT 
                c.ID_CRITICITE_MACHINE,
                c.CRITICITE_MACHINE,
                c.DESCRIPTION_CRITICITE_MACHINE
            FROM 
                CRITICITE_MACHINE c
        
            """;
        return jdbcTemplate.query(sql, (rs, rowNum) ->
            new Criticite(
                rs.getInt("ID_CRITICITE_MACHINE"),
                rs.getString("CRITICITE_MACHINE"),
                rs.getString("DESCRIPTION_CRITICITE_MACHINE")
            )
        );
    };


}

