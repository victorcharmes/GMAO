package com.gmao.backend.machine.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.gmao.backend.machine.model.Machine;
import com.gmao.backend.machine.model.MachineView;

@Repository
public class MachineRepository {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<MachineView> findAll() {

        String sql = """
            SELECT
                m.id_machine,
                m.machine,
                m.description_machine,
                m.photo,
                m.date_implementation,

                c.criticite_machine,
                c.description_criticite_machine,

                cl.classe_machine,
                cl.description_classe_machine,

                e.nom_emplacement,

                u.nom_ur,
                u.description_ur,
            
                usr.nom_utilisateur
            FROM MACHINE m
            JOIN CRITICITE_MACHINE c
                ON m.criticite_machine = c.id_criticite_machine
            JOIN CLASSE_MACHINE cl
                ON m.classe_machine = cl.id_classe_machine
            JOIN EMPLACEMENT e
                ON m.emplacement_machine = e.id_emplacement
            JOIN UR u
                ON m.ur_machine = u.id_ur
            JOIN UTILISATEUR usr
                ON usr.ur_utilisateur = u.id_ur
            WHERE usr.role_utilisateur = 2
        """;

        return jdbcTemplate.query(sql, (rs, rowNum) ->
            new MachineView(
                rs.getInt("id_machine"),
                rs.getString("machine"),
                rs.getString("description_machine"),
                rs.getString("photo"),
                rs.getDate("date_implementation").toLocalDate(),
                rs.getString("criticite_machine"),
                rs.getString("description_criticite_machine"),
                rs.getString("classe_machine"),
                rs.getString("description_classe_machine"),
                rs.getString("nom_emplacement"),
                rs.getString("nom_ur"),
                rs.getString("description_ur"),
                rs.getString("nom_utilisateur")
            )
        );
    }
    public Machine save(Machine machine) {

        String sql = """
            INSERT INTO MACHINE (
                machine,
                description_machine,
                photo,
                date_implementation,
                criticite_machine,
                classe_machine,
                emplacement_machine,
                ur_machine
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """;

        //Valeur par défaut pour le lienPhoto machines
        String photo = machine.getLienPhoto();

        if (photo == null || photo.isBlank()) {
            photo = "/photosMachines/";
        }

        jdbcTemplate.update(sql,
            machine.getNom(),
            machine.getDescription(),
            photo,
            machine.getDateImplementation(),
            machine.getCriticite(),
            machine.getClasseOuverture(),
            machine.getEmplacement(),
            machine.getUr()
        );

        return machine;
    }
    public int update(Machine machine) {

    String sql = """
        UPDATE MACHINE SET
            machine = ?,
            description_machine = ?,
            photo = ?,
            date_implementation = ?,
            criticite_machine = ?,
            classe_machine = ?,
            emplacement_machine = ?,
            ur_machine = ?
        WHERE id_machine = ?
    """;

    String photo = machine.getLienPhoto();

    if (photo == null || photo.isBlank()) {
        photo = "/photosMachines/";
    }

    return jdbcTemplate.update(sql,
        machine.getNom(),
        machine.getDescription(),
        photo,
        machine.getDateImplementation(),
        machine.getCriticite(),
        machine.getClasseOuverture(),
        machine.getEmplacement(),
        machine.getUr(),
        machine.getId()
    );
}
}
