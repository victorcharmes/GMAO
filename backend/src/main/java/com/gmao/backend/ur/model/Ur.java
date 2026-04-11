package com.gmao.backend.ur.model;

public class Ur {
    private int idUr;
    private String nomUr;
    private String descriptionUr;
    private int batimentDeUr;

    public Ur(){

    }

    public Ur(int idUr, String nomUr, String descriptionUr, int batimentDeUr) {
        this.idUr = idUr;
        this.nomUr = nomUr;
        this.descriptionUr = descriptionUr;
        this.batimentDeUr = batimentDeUr;
    }

    @Override
    public String toString(){
        return("id: " + this.getIdUr() + " nom: " + this.getNomUr() + "\n");
    }
    public int getIdUr() {
        return idUr;
    }

    public void setIdUr(int idUr) {
        this.idUr = idUr;
    }

    public String getNomUr() {
        return nomUr;
    }

    public void setNomUr(String nomUr) {
        this.nomUr = nomUr;
    }

    public String getDescriptionUr() {
        return descriptionUr;
    }

    public void setDescriptionUr(String descriptionUr) {
        this.descriptionUr = descriptionUr;
    }

    public int getbatimentDeUr() {
        return batimentDeUr;
    }

    public void setBatimentDeUr(int batimentDeUr) {
        this.batimentDeUr = batimentDeUr;
    }


    
}
