package com.gmao.backend.panne.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Statement;
import java.sql.PreparedStatement;
import java.util.List;

import com.gmao.backend.panne.model.Panne;
import com.gmao.backend.panne.model.PanneView;

@Repository
public class PanneRepository {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<PanneView> findAll() {

        String sql = """
            SELECT
                p.id_panne,
                p.nom_panne,
                p.description_panne,
                p.date_debut_panne,
                p.date_fin_panne,
                p.temp_arret,
                p.temp_repparation,
                p.urgence_panne,
                p.etat_panne,
                p.utilisateur_demandeur,
                p.machine_en_panne,

                up.urgence_panne AS urgence_panne_libelle,

                ep.etat_panne AS etat_panne_libelle,
                
                u.nom_utilisateur,

                m.machine
            FROM PANNE p
            JOIN URGENCE_PANNE up
                ON p.urgence_panne = up.id_urgence_panne
            JOIN ETAT_PANNE ep
                ON p.etat_panne = ep.id_etat_panne
            JOIN UTILISATEUR u
                ON p.utilisateur_demandeur = u.id_utilisateur
            JOIN MACHINE m
                ON p.machine_en_panne = m.id_machine
        """;

        return jdbcTemplate.query(sql, (rs, rowNum) ->
            new PanneView(
                rs.getInt("id_panne"),
                rs.getString("nom_panne"),
                rs.getString("description_panne"),
                rs.getDate("date_debut_panne").toLocalDate(),
                rs.getDate("date_fin_panne") != null ? rs.getDate("date_fin_panne").toLocalDate() : null,
                rs.getInt("temp_arret"),
                rs.getInt("temp_repparation"),
                rs.getInt("urgence_panne"),
                 rs.getString("urgence_panne_libelle"),
                rs.getInt("etat_panne"),
                 rs.getString("etat_panne_libelle"),
                rs.getInt("utilisateur_demandeur"),
                 rs.getString("nom_utilisateur"),
                rs.getInt("machine_en_panne"),
                 rs.getString("machine")
            )
        );
    }
    public Panne save(Panne panne) {

        String sql = """
            INSERT INTO PANNE (
                description_panne,
                date_debut_panne,
                date_fin_panne,
                temp_arret,
                temp_repparation,
                urgence_panne,
                etat_panne,
                utilisateur_demandeur,
                machine_en_panne,
                nom_panne
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """;

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, panne.getDescription());
            ps.setObject(2, panne.getDateDebut());
            ps.setObject(3, panne.getDateFin());
            ps.setObject(4, panne.getTpsArret());
            ps.setObject(5, panne.getTpsReparation());
            ps.setInt(6, panne.getIdUrgence());
            ps.setInt(7, panne.getIdEtatPanne());
            ps.setInt(8, panne.getIdUtilisateurDemandeur());
            ps.setInt(9, panne.getIdMachineEnPanne());
            ps.setString(10, "TEMP"); // valeur temporaire, écrasée juste après
            return ps;
        }, keyHolder);

        int generatedId = keyHolder.getKey().intValue();

        String nomPanne = (panne.getIdUrgence() == 5 ? "PREV_" : "CORR_") + generatedId;

        jdbcTemplate.update(
            "UPDATE PANNE SET nom_panne = ? WHERE id_panne = ?",
            nomPanne, generatedId
        );

        panne.setId(generatedId);
        panne.setNom(nomPanne);

        return panne;
    }

    public int update(Panne panne) {

        String nomPanne = (panne.getIdUrgence() == 5 ? "PREV_" : "CORR_") + panne.getId();

        String sql = """
            UPDATE PANNE SET
                nom_panne = ?,
                description_panne = ?,
                date_debut_panne = ?,
                date_fin_panne = ?,
                temp_arret = ?,
                temp_repparation = ?,
                urgence_panne = ?,
                etat_panne = ?,
                utilisateur_demandeur = ?,
                machine_en_panne = ?
            WHERE id_panne = ?
        """;

        return jdbcTemplate.update(sql,
            nomPanne,
            panne.getDescription(),
            panne.getDateDebut(),
            panne.getDateFin(),
            panne.getTpsArret(),
            panne.getTpsReparation(),
            panne.getIdUrgence(),
            panne.getIdEtatPanne(),
            panne.getIdUtilisateurDemandeur(),
            panne.getIdMachineEnPanne(),
            panne.getId()
        );
    }
    public int deleteById(Integer id) {

        String sql = "DELETE FROM PANNE WHERE id_panne = ?";

        return jdbcTemplate.update(sql, id);
    }
}
