package com.gmao.backend.slot.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.gmao.backend.slot.model.Slot;

@Repository
public class SlotRepository {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Slot> findAll(){
        String sql="""
            SELECT 
                s.ID_SLOT,
                s.NOM_SLOT,
                s.MAGASIN_DE_SLOT
            FROM 
                SLOT s
        
            """;
        return jdbcTemplate.query(sql, (rs, rowNum) ->
            new Slot(
                rs.getInt("ID_SLOT"),
                rs.getString("NOM_SLOT"),
                rs.getInt("MAGASIN_DE_SLOT")
            )
        );
    };


}


