package com.gmao.backend.magasin.model;

public class Magasin {
    private Integer idMagasin;
    private String nomMagasin;
    private Integer emplacementDeMagasin;

    public Magasin(){}

    public Magasin(Integer idMagasin, String nomMagasin, Integer emplacementDeMagasin) {
        this.idMagasin = idMagasin;
        this.nomMagasin = nomMagasin;
        this.emplacementDeMagasin = emplacementDeMagasin;
    }

    public Integer getIdMagasin() {
        return idMagasin;
    }

    public void setIdMagasin(Integer idMagasin) {
        this.idMagasin = idMagasin;
    }

    public String getNomMagasin() {
        return nomMagasin;
    }

    public void setNomMagasin(String nomMagasin) {
        this.nomMagasin = nomMagasin;
    }

    public Integer getEmplacementDeMagasin() {
        return emplacementDeMagasin;
    }

    public void setEmplacementDeMagasin(Integer emplacementDeMagasin) {
        this.emplacementDeMagasin = emplacementDeMagasin;
    }

    
}
