package com.gmao.backend.classeMachine.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import com.gmao.backend.classeMachine.model.Classe;

@Repository
public class ClasseRepository {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Classe> findAll(){
        String sql="""
            SELECT 
                c.ID_CLASSE_MACHINE,
                c.CLASSE_MACHINE,
                c.DESCRIPTION_CLASSE_MACHINE
            FROM 
                CLASSE_MACHINE c
        
            """;
        return jdbcTemplate.query(sql, (rs, rowNum) ->
            new Classe(
                rs.getInt("ID_CLASSE_MACHINE"),
                rs.getString("CLASSE_MACHINE"),
                rs.getString("DESCRIPTION_CLASSE_MACHINE")
            )
        );
    };


}

