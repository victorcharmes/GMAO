package com.gmao.backend.machine.model;

import java.time.LocalDate;

//Class enrichi pour affichage dans UI
public class MachineView {

    private Integer id;
    private String nom;
    private String description;
    private String photo;
    private LocalDate dateImplementation;

    private String criticite;
    private String descriptionCriticite;

    private String classe;
    private String descriptionClasse;

    private String emplacement;

    private String ur;
    private String descriptionUr;

    private String nomUtilisateur;

    public MachineView(
            Integer id,
            String nom,
            String description,
            String photo,
            LocalDate dateImplementation,
            String criticite,
            String descriptionCriticite,
            String classe,
            String descriptionClasse,
            String emplacement,
            String ur,
            String descriptionUr,
            String nomUtilisateur) {

        this.id = id;
        this.nom = nom;
        this.description = description;
        this.photo = photo;
        this.dateImplementation = dateImplementation;
        this.criticite = criticite;
        this.descriptionCriticite = descriptionCriticite;
        this.classe = classe;
        this.descriptionClasse = descriptionClasse;
        this.emplacement = emplacement;
        this.ur = ur;
        this.descriptionUr = descriptionUr;
        this.nomUtilisateur = nomUtilisateur;
    }

    public Integer getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public String getDescription() {
        return description;
    }

    public String getPhoto() {
        return photo;
    }

    public LocalDate getDateImplementation() {
        return dateImplementation;
    }

    public String getCriticite() {
        return criticite;
    }

    public String getDescriptionCriticite() {
        return descriptionCriticite;
    }

    public String getClasse() {
        return classe;
    }

    public String getDescriptionClasse() {
        return descriptionClasse;
    }

    public String getEmplacement() {
        return emplacement;
    }

    public String getUr() {
        return ur;
    }

    public String getDescriptionUr() {
        return descriptionUr;
    }

    public String getNomUtilisateur() {
        return nomUtilisateur;
    }

    // getters seulement, lecture seulement ici
    
}