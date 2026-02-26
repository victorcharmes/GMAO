package com.gmao.backend.stock.model;
import java.time.LocalDate;

public class Piece {
    private Integer id;
    private String nom;
    private String description;
    private Integer quantite;
    private Integer prixAchat;
    private LocalDate dateAchat;
    private Integer idSlotDePiece;

    public Piece() {
    }

    public Piece(Integer id, String nom, String description, Integer quantite, Integer prixAchat, LocalDate dateAchat,
            Integer idSlotDePiece) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.quantite = quantite;
        this.prixAchat = prixAchat;
        this.dateAchat = dateAchat;
        this.idSlotDePiece = idSlotDePiece;
    }

    @Override
    public String toString(){
        return "id: " + this.id + "\nNom: " + this.nom + "\nDescription: " + this.description + "\nQuantité: " + this.quantite + "\nPrix d'achat: " + this.prixAchat + "\nDate d'achat: " + this.dateAchat + "\nSlot de pièce: " + this.idSlotDePiece;
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
        return idSlotDePiece;
    }

    public void setSlotDePiece(Integer slotDePiece) {
        this.idSlotDePiece = slotDePiece;
    }
    
}
