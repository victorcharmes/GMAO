package com.gmao.backend.indicateur.model;

import java.time.LocalDateTime;

public class Indicateur {
    private Integer idTypeIndicateur;
    private String nomTypeIndicateur;
    private Integer porteeIndicateur;
    private LocalDateTime dateDebut;
    private LocalDateTime dateFin;

    public Indicateur(){}
    
    public Indicateur(Integer idTypeIndicateur, String nomTypeIndicateur, Integer porteeIndicateur,
            LocalDateTime dateDebut, LocalDateTime dateFin) {
        this.idTypeIndicateur = idTypeIndicateur;
        this.nomTypeIndicateur = nomTypeIndicateur;
        this.porteeIndicateur = porteeIndicateur;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
    }

    @Override
    public String toString(){
        return "id: " + this.getIdTypeIndicateur() + "\n nom: " + this.getNomTypeIndicateur() + "\n portee: " 
        + this. getPorteeIndicateur() + "\n date de début: " + this.getDateDebut() + "\n date de fin: " + 
        this.getDateFin();
    }
    public Integer getIdTypeIndicateur() {
        return idTypeIndicateur;
    }

    public void setIdTypeIndicateur(Integer idTypeIndicateur) {
        this.idTypeIndicateur = idTypeIndicateur;
    }

    public String getNomTypeIndicateur() {
        return nomTypeIndicateur;
    }

    public void setNomTypeIndicateur(String nomTypeIndicateur) {
        this.nomTypeIndicateur = nomTypeIndicateur;
    }

    public Integer getPorteeIndicateur() {
        return porteeIndicateur;
    }

    public void setPorteeIndicateur(Integer porteeIndicateur) {
        this.porteeIndicateur = porteeIndicateur;
    }

    public LocalDateTime getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDateTime dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDateTime getDateFin() {
        return dateFin;
    }

    public void setDateFin(LocalDateTime dateFin) {
        this.dateFin = dateFin;
    }

    
}
