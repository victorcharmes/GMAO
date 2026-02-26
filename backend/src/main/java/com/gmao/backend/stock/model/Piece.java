package com.gmao.backend.stock.model;
import java.time.LocalDate;

public class Piece {
    private Integer id;
    private String nom;
    private String description;
    private Integer quantite;
    private Integer prixAchat;
    private LocalDate dateAchat;
    private Integer slotDePiece;

    public Piece() {
    }

    public Piece(Integer id, String nom, String description, Integer quantite, Integer prixAchat, LocalDate dateAchat,
            Integer slotDePiece) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.quantite = quantite;
        this.prixAchat = prixAchat;
        this.dateAchat = dateAchat;
        this.slotDePiece = slotDePiece;
    }

    @Override
    public String toString(){
        return "id: " + this.id + "\nNom: " + this.nom + "\nDescription: " + this.description + "\nQuantité: " + this.quantite + "\nPrix d'achat: " + this.prixAchat + "\nDate d'achat: " + this.dateAchat + "\nSlot de pièce: " + this.slotDePiece;
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

    public Integer getQuantite() {
        return quantite;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }

    public Integer getPrixAchat() {
        return prixAchat;
    }

    public void setPrixAchat(Integer prixAchat) {
        this.prixAchat = prixAchat;
    }

    public LocalDate getDateAchat() {
        return dateAchat;
    }

    public void setDateAchat(LocalDate dateAchat) {
        this.dateAchat = dateAchat;
    }

    public Integer getSlotDePiece() {
        return slotDePiece;
    }

    public void setSlotDePiece(Integer slotDePiece) {
        this.slotDePiece = slotDePiece;
    }
    
}
