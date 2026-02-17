package com.gmao.backend.machine.model;
import java.time.LocalDate;

//Class fidèle à la bd
public class Machine {
    private Integer id;
    private String nom;
    private String description;
    private String lienPhoto;
    private LocalDate  dateImplementation;
    private Integer criticite;
    private Integer classeOuverture;
    private Integer emplacement;
    private Integer ur;
    
    public Machine() {
    //Constructeur vide pour jackson
    }

    public Machine(Integer id, String nom, String description, String lienPhoto, LocalDate dateImplementation,
            Integer criticite, Integer classeOuverture, Integer emplacement, Integer ur) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.lienPhoto = lienPhoto;
        this.dateImplementation = dateImplementation;
        this.criticite = criticite;
        this.classeOuverture = classeOuverture;
        this.emplacement = emplacement;
        this.ur = ur;
    }

    @Override
    public String toString(){
        return "id: " + this.id + "\nMachine: " + this.nom + "\nDescription: " + this.description + "\nPhoto: " + this.lienPhoto + "\nDate implémentation: " + this.dateImplementation + "\nCriticite: " + this.criticite + "\nClasse: " + this.classeOuverture + "\nEmplacement: " + this.emplacement + "\nUR: " + this.ur;
    }
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    public Integer getCriticite() {
        return criticite;
    }

    public void setCriticite(Integer criticite) {
        this.criticite = criticite;
    }


    public Integer getClasseOuverture() {
        return classeOuverture;
    }

    public void setClasseOuverture(Integer classeOuverture) {
        this.classeOuverture = classeOuverture;
    }

    public Integer getEmplacement() {
        return emplacement;
    }

    public void setEmplacement(Integer emplacement) {
        this.emplacement = emplacement;
    }

    public Integer getUr() {
        return ur;
    }

    public void setUr(Integer ur) {
        this.ur = ur;
    }


    

}
