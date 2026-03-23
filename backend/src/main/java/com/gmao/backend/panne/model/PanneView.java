package com.gmao.backend.panne.model;
import java.time.LocalDate;
public class PanneView {
    private Integer id;
    private String nom;
    private String description;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private Integer tpsArret;
    private Integer tpsReparation;
    private Integer idUrgence;
    private String nomUrgence;
    private Integer idEtatPanne;
    private String nomEtatPanne;
    private Integer idUtilisateurDemandeur;
    private String nomUtilisateurDemandeur;
    private Integer idMachineEnPanne;
    private String nomMachineEnPanne;


    public PanneView(){

    }

    public PanneView(Integer id, String nom, String description, LocalDate dateDebut, LocalDate dateFin,
            Integer tpsArret, Integer tpsReparation, Integer idUrgence, String nomUrgence, Integer idEtatPanne,
            String nomEtatPanne, Integer idUtilisateurDemandeur, String nomUtilisateurDemandeur,
            Integer idMachineEnPanne, String nomMachineEnPanne) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.tpsArret = tpsArret;
        this.tpsReparation = tpsReparation;
        this.idUrgence = idUrgence;
        this.nomUrgence = nomUrgence;
        this.idEtatPanne = idEtatPanne;
        this.nomEtatPanne = nomEtatPanne;
        this.idUtilisateurDemandeur = idUtilisateurDemandeur;
        this.nomUtilisateurDemandeur = nomUtilisateurDemandeur;
        this.idMachineEnPanne = idMachineEnPanne;
        this.nomMachineEnPanne = nomMachineEnPanne;
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


    public String getNomUrgence() {
        return nomUrgence;
    }


    public void setNomUrgence(String nomUrgence) {
        this.nomUrgence = nomUrgence;
    }


    public Integer getIdEtatPanne() {
        return idEtatPanne;
    }


    public void setIdEtatPanne(Integer idEtatPanne) {
        this.idEtatPanne = idEtatPanne;
    }


    public String getNomEtatPanne() {
        return nomEtatPanne;
    }


    public void setNomEtatPanne(String nomEtatPanne) {
        this.nomEtatPanne = nomEtatPanne;
    }


    public Integer getIdUtilisateurDemandeur() {
        return idUtilisateurDemandeur;
    }


    public void setIdUtilisateurDemandeur(Integer idUtilisateurDemandeur) {
        this.idUtilisateurDemandeur = idUtilisateurDemandeur;
    }


    public String getNomUtilisateurDemandeur() {
        return nomUtilisateurDemandeur;
    }


    public void setNomUtilisateurDemandeur(String nomUtilisateurDemandeur) {
        this.nomUtilisateurDemandeur = nomUtilisateurDemandeur;
    }


    public Integer getIdMachineEnPanne() {
        return idMachineEnPanne;
    }


    public void setIdMachineEnPanne(Integer idMachineEnPanne) {
        this.idMachineEnPanne = idMachineEnPanne;
    }


    public String getNomMachineEnPanne() {
        return nomMachineEnPanne;
    }


    public void setNomMachineEnPanne(String nomMachineEnPanne) {
        this.nomMachineEnPanne = nomMachineEnPanne;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    

    
}
