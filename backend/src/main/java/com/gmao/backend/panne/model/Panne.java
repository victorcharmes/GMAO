package com.gmao.backend.panne.model;
import java.time.LocalDate;

public class Panne {
    private Integer id;
    private String description;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private Integer tpsArret;
    private Integer tpsReparation;
    private Integer idUrgence;
    private Integer idEtatPanne;
    private Integer idUtilisateurDemandeur;
    private Integer idMachineEnPanne;

    public Panne() {
    }

    public Panne(Integer id, String description, LocalDate dateDebut, LocalDate dateFin, Integer tpsArret,
            Integer tpsReparation, Integer idUrgence, Integer idEtatPanne, Integer idUtilisateurDemandeur,
            Integer idMachineEnPanne) {
        this.id = id;
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

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public void setDateFin(LocalDate dateFin) {
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

    
    
}
