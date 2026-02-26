package com.gmao.backend.stock.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.gmao.backend.stock.model.Piece;
import com.gmao.backend.stock.model.PieceView;

@Repository
public class PieceRepository {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<PieceView> findAll() {

        String sql = """
            SELECT
                p.id_piece,
                p.nom_piece,
                p.description_piece,
                p.quantite,
                p.prix_achat,
                p.date_mise_en_stock,
                p.slot_de_piece,

                s.nom_slot,
                s.magasin_de_slot,

                m.nom_magasin,
                m.emplacement_de_magasin,

                e.nom_emplacement
            FROM PIECE p
            JOIN SLOT s
                ON p.slot_de_piece = s.id_slot
            JOIN MAGASIN m
                ON s.magasin_de_slot = m.id_magasin 
            JOIN EMPLACEMENT e
                ON m.emplacement_de_magasin = e.id_emplacement

        """;

        return jdbcTemplate.query(sql, (rs, rowNum) ->
            new PieceView(
                rs.getInt("id_piece"),
                rs.getString("nom_piece"),
                rs.getString("description_piece"),
                rs.getInt("quantite"),
                rs.getInt("prix_achat"),
                rs.getDate("date_mise_en_stock").toLocalDate(),
                rs.getInt("slot_de_piece"),
                rs.getString("nom_slot"),
                rs.getInt("magasin_de_slot"),
                rs.getString("nom_magasin"),
                rs.getInt("emplacement_de_magasin"),
                rs.getString("nom_emplacement")
            )
        );
    }
    public Piece save(Piece piece) {

        String sql = """
            INSERT INTO PIECE (
                piece,
                description_piece,
                quantite,
                prix_achat,
                date_mise_en_stock,
                slot_de_piece
            )
            VALUES (?, ?, ?, ?, ?, ?)
        """;

        jdbcTemplate.update(sql,
            piece.getNom(),
            piece.getDescription(),
            piece.getQuantite(),
            piece.getPrixAchat(),
            piece.getDateAchat(),
            piece.getSlotDePiece()
        );

        return piece;
    }

    public int update(Piece piece) {

    String sql = """
        UPDATE PIECE SET
            piece = ?,
            description_piece = ?,
            quantite = ?,
            prix_achat = ?,
            date_mise_en_stock = ?,
            slot_de_piece = ?
        WHERE id_piece = ?
    """;

    return jdbcTemplate.update(sql,
        piece.getNom(),
        piece.getDescription(),
        piece.getQuantite(),
        piece.getPrixAchat(),
        piece.getDateAchat(),
        piece.getSlotDePiece()
    );
}
    public int deleteById(Integer id) {

        String sql = "DELETE FROM PIECE WHERE id_piece = ?";

        return jdbcTemplate.update(sql, id);
    }
}
