package com.gmao.backend.machine.model;
import java.time.LocalDate;

public class Machine {
    private int id;
    private String nom;
    private String description;
    private String lienPhoto;
    private LocalDate  dateImplementation;
    private String criticite;
    private String descriptionCriticite;
    private String classeOuverture;
    private String descriptionClasseOuverture;
    private String emplacement;
    private String ur;
    private String descriptionUR;
    
    public Machine() {
    //Constructeur vide pour jackson
    }

    public Machine(int id, String nom, String description, String lienPhoto, LocalDate dateImplementation,
            String criticite, String descriptionCriticite, String classeOuverture, String descriptionClasseOuverture,
            String emplacement, String ur, String descriptionUR) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.lienPhoto = lienPhoto;
        this.dateImplementation = dateImplementation;
        this.criticite = criticite;
        this.descriptionCriticite = descriptionCriticite;
        this.classeOuverture = classeOuverture;
        this.descriptionClasseOuverture = descriptionClasseOuverture;
        this.emplacement = emplacement;
        this.ur = ur;
        this.descriptionUR = descriptionUR;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLienPhoto() {
        return lienPhoto;
    }

    public void setLienPhoto(String lienPhoto) {
        this.lienPhoto = lienPhoto;
    }

    public LocalDate getDateImplementation() {
        return dateImplementation;
    }

    public void setDateImplementation(LocalDate dateImplementation) {
        this.dateImplementation = dateImplementation;
    }

    public String getCriticite() {
        return criticite;
    }

    public void setCriticite(String criticite) {
        this.criticite = criticite;
    }

    public String getDescriptionCriticite() {
        return descriptionCriticite;
    }

    public void setDescriptionCriticite(String descriptionCriticite) {
        this.descriptionCriticite = descriptionCriticite;
    }

    public String getClasseOuverture() {
        return classeOuverture;
    }

    public void setClasseOuverture(String classeOuverture) {
        this.classeOuverture = classeOuverture;
    }

    public String getDescriptionClasseOuverture() {
        return descriptionClasseOuverture;
    }

    public void setDescriptionClasseOuverture(String descriptionClasseOuverture) {
        this.descriptionClasseOuverture = descriptionClasseOuverture;
    }

    public String getEmplacement() {
        return emplacement;
    }

    public void setEmplacement(String emplacement) {
        this.emplacement = emplacement;
    }

    public String getUr() {
        return ur;
    }

    public void setUr(String ur) {
        this.ur = ur;
    }

    public String getDescriptionUR() {
        return descriptionUR;
    }

    public void setDescriptionUR(String descriptionUR) {
        this.descriptionUR = descriptionUR;
    }

    

    

}
