package com.gmao.backend.utilisateur.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.gmao.backend.utilisateur.model.Utilisateur;

@Repository
public class UtilisateurRepository {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Utilisateur> findAll(){
        String sql="""
            SELECT 
                u.ID_UTILISATEUR,
                u.NOM_UTILISATEUR,
                u.ROLE_UTILISATEUR,
                u.UR_UTILISATEUR
            FROM 
                UTILISATEUR u
        
            """;
        return jdbcTemplate.query(sql, (rs, rowNum) ->
            new Utilisateur(
                rs.getInt("ID_UTILISATEUR"),
                rs.getString("NOM_UTILISATEUR"),
                rs.getInt("ROLE_UTILISATEUR"),
                rs.getInt("UR_UTILISATEUR")
            )
        );
    };


}


