package com.gmao.backend.stock.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gmao.backend.stock.service.PieceServiceInterface;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import com.gmao.backend.stock.model.PieceView;
import com.gmao.backend.stock.model.Piece;

@RestController
@RequestMapping("/stock")
@CrossOrigin(origins = "http://localhost:5173")
public class PieceController {

    private final PieceServiceInterface service;

    public PieceController(PieceServiceInterface service) {
        this.service = service;
    }

    @GetMapping
    public List<PieceView> getPiece(){
        return service.findAll();
    }

    @PostMapping
    public ResponseEntity<Piece> createPiece(@RequestBody Piece piece) {

        Piece savedPiece = service.save(piece);
        return ResponseEntity.status(201).body(savedPiece);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Piece> updatePiece(
            @PathVariable Integer id,
            @RequestBody Piece piece) {

        piece.setId(id);

        Piece updatedPiece = service.update(piece);

        if (updatedPiece == null) {
            return ResponseEntity.notFound().build();
        }
        System.out.println("ID reçu : " + id);
        System.out.println("ID dans objet : " + piece.getId());
        return ResponseEntity.ok(updatedPiece);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePiece(@PathVariable Integer id) {

        System.out.println("ID reçu pour suppression : " + id);

        boolean deleted = service.deleteById(id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}
