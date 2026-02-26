package com.gmao.backend.stock.service;

import java.util.List;

import com.gmao.backend.stock.model.Piece;
import com.gmao.backend.stock.model.PieceView;

public interface PieceServiceInterface {
    List<PieceView> findAll();
    Piece save(Piece piece);
    public Piece update(Piece piece);
    boolean deleteById(Integer id);
}
