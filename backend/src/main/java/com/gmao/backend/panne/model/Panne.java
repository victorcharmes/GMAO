package com.gmao.backend.panne.model;
import java.time.LocalDateTime;

public class Panne {
    private Integer id;
    private String nom;
    private String description;
    private LocalDateTime dateDebut;
    private LocalDateTime dateFin;
    private Integer tpsArret;
    private Integer tpsReparation;
    private Integer idUrgence;
    private Integer idEtatPanne;
    private Integer idUtilisateurDemandeur;
    private Integer idMachineEnPanne;

    public Panne() {
    }

    public Panne(Integer id, String nom, String description, LocalDateTime dateDebut, LocalDateTime dateFin, Integer tpsArret,
            Integer tpsReparation, Integer idUrgence, Integer idEtatPanne, Integer idUtilisateurDemandeur,
            Integer idMachineEnPanne) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.tpsArret = tpsArret;
        this.tpsReparation = tpsReparation;
        this.idUrgence = idUrgence;
        this.idEtatPanne = idEtatPanne;
        this.idUtilisateurDemandeur = idUtilisateurDemandeur;
        this.idMachineEnPanne = idMachineEnPanne;
    }

    public Panne(Integer id, LocalDateTime dateDebut, LocalDateTime dateFin){
        this.id = id;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
    }

    @Override
    public String toString(){
        return "\nid: " + this.getId() +
        "\ndateDebut: " + this.getDateDebut() + "\ndateFin: " + this.getDateFin();
    }
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public Integer getTpsArret() {
        return tpsArret;
    }

    public void setTpsArret(Integer tpsArret) {
        this.tpsArret = tpsArret;
    }

    public Integer getTpsReparation() {
        return tpsReparation;
    }

    public void setTpsReparation(Integer tpsReparation) {
        this.tpsReparation = tpsReparation;
    }

    public Integer getIdUrgence() {
        return idUrgence;
    }

    public void setIdUrgence(Integer idUrgence) {
        this.idUrgence = idUrgence;
    }

    public Integer getIdEtatPanne() {
        return idEtatPanne;
    }

    public void setIdEtatPanne(Integer idEtatPanne) {
        this.idEtatPanne = idEtatPanne;
    }

    public Integer getIdUtilisateurDemandeur() {
        return idUtilisateurDemandeur;
    }

    public void setIdUtilisateurDemandeur(Integer idUtilisateurDemandeur) {
        this.idUtilisateurDemandeur = idUtilisateurDemandeur;
    }

    public Integer getIdMachineEnPanne() {
        return idMachineEnPanne;
    }

    public void setIdMachineEnPanne(Integer idMachineEnPanne) {
        this.idMachineEnPanne = idMachineEnPanne;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    
    
}
