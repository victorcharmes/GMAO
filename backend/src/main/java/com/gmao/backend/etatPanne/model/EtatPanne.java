package com.gmao.backend.etatPanne.model;

public class EtatPanne {
    private Integer idEtatPanne;
    private Integer etatPanne;
    private String descriptionEtatPanne;

    public EtatPanne(){
    }

    public EtatPanne(Integer idEtatPanne, Integer etatPanne, String descriptionEtatPanne) {
        this.idEtatPanne = idEtatPanne;
        this.etatPanne = etatPanne;
        this.descriptionEtatPanne = descriptionEtatPanne;
    }

    public Integer getIdEtatPanne() {
        return idEtatPanne;
    }

    public void setIdEtatPanne(Integer idEtatPanne) {
        this.idEtatPanne = idEtatPanne;
    }

    public Integer getEtatPanne() {
        return etatPanne;
    }

    public void setEtatPanne(Integer etatPanne) {
        this.etatPanne = etatPanne;
    }

    public String getDescriptionEtatPanne() {
        return descriptionEtatPanne;
    }

    public void setDescriptionEtatPanne(String descriptionEtatPanne) {
        this.descriptionEtatPanne = descriptionEtatPanne;
    }


}

