package com.gmao.backend.indicateur.repository;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.gmao.backend.panne.model.Panne;

@Repository
public class IndicateurRepository {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    /* 
    public List<String> findByCategorie(String categorie) {
        String sql = "SELECT nom_produit FROM PRODUIT WHERE categorie = ?";

        return jdbcTemplate.query(sql,
            (rs, rowNum) -> rs.getString("nom_produit"),
            categorie  // <-- le paramètre remplace le ?
        );
    }
        */

    public List<Panne> findByMachine(
        Integer idMachine, 
        LocalDateTime dateDebut, 
        LocalDateTime dateFin, 
        Integer etatPanne){
        String sql ="""
        SELECT 
            p.ID_PANNE,
            p.DATE_DEBUT_PANNE,
            p.DATE_FIN_PANNE
        FROM PANNE p
        WHERE 
            p.MACHINE_EN_PANNE = ? AND 
            p.DATE_DEBUT_PANNE >= ? AND 
            p.DATE_FIN_PANNE <= ? AND 
            p.ETAT_PANNE = ?
        """;

        return jdbcTemplate.query(sql, (rs, rowNum) ->
            new Panne(
                rs.getInt("ID_PANNE"),
                rs.getTimestamp("DATE_DEBUT_PANNE").toLocalDateTime(),
                rs.getTimestamp("DATE_FIN_PANNE").toLocalDateTime()
            ),
            idMachine,
            Timestamp.valueOf(dateDebut),
            Timestamp.valueOf(dateFin),
            etatPanne
        );
    };
}
