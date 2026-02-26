package com.gmao.backend.stock.service;

import java.util.List;

import com.gmao.backend.stock.model.Piece;

public interface PieceServiceInterface {
    List<Piece> findAll();
    Piece save(Piece piece);
    public Piece update(Piece piece);
    boolean deleteById(Integer id);
}
