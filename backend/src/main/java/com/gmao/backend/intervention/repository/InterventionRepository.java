package com.gmao.backend.intervention.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
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
    }

    public InterventionView save(InterventionView interventionView) {

        String nomPanne = jdbcTemplate.queryForObject(
            "SELECT nom FROM PANNE WHERE id = ?",
            String.class,
            interventionView.getIdPanneDeIntervention()
        );

        Integer countExisting = jdbcTemplate.queryForObject(
            "SELECT COUNT(*) FROM INTERVENTION WHERE PANNE_DE_INTERVENTION = ?",
            Integer.class,
            interventionView.getIdPanneDeIntervention()
        );

        String nomIntervention = "INTER_" + (countExisting + 1) + "_" + nomPanne;

        String sql = """
            INSERT INTO INTERVENTION (
                NOM_INTERVENTION,
                DESCRIPTION_INTERVENTION,
                DATE_DEBUT_INTERVENTION,
                DATE_FIN_INTERVENTION,
                DUREE_INTERVENTION,
                PANNE_DE_INTERVENTION,
                UTILISATEUR_INTERVENANT
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """;

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, nomIntervention);
            ps.setString(2, interventionView.getDescriptionIntervention());
            ps.setObject(3, interventionView.getDateDebutIntervention());
            ps.setObject(4, interventionView.getDateFinIntervention());
            ps.setObject(5, interventionView.getDureeIntervention());
            ps.setInt(6, interventionView.getIdPanneDeIntervention());
            ps.setInt(7, interventionView.getIdUtilisateurIntervenant());
            return ps;
        }, keyHolder);

        int generatedId = keyHolder.getKey().intValue();

        interventionView.setIdIntervention(generatedId);
        interventionView.setNomIntervention(nomIntervention);

        return interventionView;
    }

    public int update(InterventionView interventionView) {

        String sql = """
            UPDATE INTERVENTION SET
                NOM_INTERVENTION = ?,
                DESCRIPTION_INTERVENTION = ?,
                DATE_DEBUT_INTERVENTION = ?,
                DATE_FIN_INTERVENTION = ?,
                DUREE_INTERVENTION = ?,
                PANNE_DE_INTERVENTION = ?,
                UTILISATEUR_INTERVENANT = ?
            WHERE ID_INTERVENTION = ?
        """;

        return jdbcTemplate.update(sql,
            interventionView.getNomIntervention(),
            interventionView.getDescriptionIntervention(),
            interventionView.getDateDebutIntervention(),
            interventionView.getDateFinIntervention(),
            interventionView.getDureeIntervention(),
            interventionView.getIdPanneDeIntervention(),
            interventionView.getIdUtilisateurIntervenant(),
            interventionView.getIdIntervention()
        );
    }

    public int deleteById(Integer id) {
        String sql = "DELETE FROM INTERVENTION WHERE ID_INTERVENTION = ?";
        return jdbcTemplate.update(sql, id);
    }
}
