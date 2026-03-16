package com.gmao.backend.panne.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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
                machine_en_panne
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """;

        jdbcTemplate.update(sql,
            panne.getDescription(),
            panne.getDateDebut(),
            panne.getDateFin(),
            panne.getTpsArret(),
            panne.getTpsReparation(),
            panne.getIdUrgence(),
            panne.getIdEtatPanne(),
            panne.getIdUtilisateurDemandeur(),
            panne.getIdMachineEnPanne()
        );

        return panne;
    }

    public int update(Panne panne) {

    String sql = """
        UPDATE PANNE SET
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
