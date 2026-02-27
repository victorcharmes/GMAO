package com.gmao.backend.magasin.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.gmao.backend.magasin.model.Magasin;

@Repository
public class MagasinRepository {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Magasin> findAll(){
        String sql="""
            SELECT 
                m.ID_MAGASIN,
                m.NOM_MAGASIN,
                m.EMPLACEMENT_DE_MAGASIN
            FROM 
                MAGASIN m
        
            """;
        return jdbcTemplate.query(sql, (rs, rowNum) ->
            new Magasin(
                rs.getInt("ID_MAGASIN"),
                rs.getString("NOM_MAGASIN"),
                rs.getInt("EMPLACEMENT_DE_MAGASIN")
            )
        );
    };


}


