package com.gmao.backend.stock.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.gmao.backend.stock.model.Piece;

@Repository
public class PieceRepository {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Piece> findAll() {

        String sql = """
            SELECT
                p.id_piece,
                p.nom_piece,
                p.description_piece,
                p.quantite_piece,
                p.prix_achat,
                p.date_mise_en_stock,

                s.id_slot,
            FROM PIECE p
            JOIN SLOT s
                ON p.slot_de_piece = s.id_slot

        """;

        return jdbcTemplate.query(sql, (rs, rowNum) ->
            new Piece(
                rs.getInt("id_piece"),
                rs.getString("nom_piece"),
                rs.getString("description_piece"),
                rs.getInt("quantite_piece"),
                rs.getInt("prix_achat"),
                rs.getDate("date_mise_en_stock").toLocalDate(),
                rs.getInt("id_slot")
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
                id_slot
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
            id_slot = ?
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
