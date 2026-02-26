package com.gmao.backend.stock.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.gmao.backend.stock.repository.PieceRepository;
import com.gmao.backend.stock.model.Piece;

@Service
public class PieceService implements PieceServiceInterface{

    private final PieceRepository repository;

    public PieceService(PieceRepository repository) {
        this.repository = repository;
    }
    
    @Override
    public List<Piece> findAll(){
        return repository.findAll();
    }
    
    @Override
    public Piece save(Piece piece) {
        return repository.save(piece);
    }

    @Override
    public Piece update(Piece piece) {
    int rows = repository.update(piece);

    if (rows == 0) {
        return null; // id inexistant
    }

    return piece;
    }
    
    @Override
    public boolean deleteById(Integer id) {

        int rowsAffected = repository.deleteById(id);

        return rowsAffected > 0;
    }
}
