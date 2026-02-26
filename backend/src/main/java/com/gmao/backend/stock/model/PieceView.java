package com.gmao.backend.stock.model;
import java.time.LocalDate;
public class PieceView {
    private Integer id;
    private String nom;
    private String description;
    private Integer quantite;
    private Integer prixAchat;
    private LocalDate dateAchat;
    private Integer idSlotDePiece;
    private String nomSlot;
    private Integer idMagasinDeSlot;
    private String nomMagasin;
    private Integer idEmplacementDeMagasin;
    private String nomEmplacement;

    public PieceView(){

    }

    public PieceView(Integer id, String nom, String description, Integer quantite, Integer prixAchat,
            LocalDate dateAchat, Integer idSlotDePiece, String nomSlot, Integer idMagasinDeSlot, String nomMagasin,
            Integer idEmplacementDeMagasin, String nomEmplacement) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.quantite = quantite;
        this.prixAchat = prixAchat;
        this.dateAchat = dateAchat;
        this.idSlotDePiece = idSlotDePiece;
        this.nomSlot = nomSlot;
        this.idMagasinDeSlot = idMagasinDeSlot;
        this.nomMagasin = nomMagasin;
        this.idEmplacementDeMagasin = idEmplacementDeMagasin;
        this.nomEmplacement = nomEmplacement;
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

    public Integer getIdSlotDePiece() {
        return idSlotDePiece;
    }

    public void setIdSlotDePiece(Integer idSlotDePiece) {
        this.idSlotDePiece = idSlotDePiece;
    }

    public String getNomSlot() {
        return nomSlot;
    }

    public void setNomSlot(String nomSlot) {
        this.nomSlot = nomSlot;
    }

    public Integer getIdMagasinDeSlot() {
        return idMagasinDeSlot;
    }

    public void setIdMagasinDeSlot(Integer idMagasinDeSlot) {
        this.idMagasinDeSlot = idMagasinDeSlot;
    }

    public String getNomMagasin() {
        return nomMagasin;
    }

    public void setNomMagasin(String nomMagasin) {
        this.nomMagasin = nomMagasin;
    }

    public Integer getIdEmplacementDeMagasin() {
        return idEmplacementDeMagasin;
    }

    public void setIdEmplacementDeMagasin(Integer idEmplacementDeMagasin) {
        this.idEmplacementDeMagasin = idEmplacementDeMagasin;
    }

    public String getNomEmplacement() {
        return nomEmplacement;
    }

    public void setNomEmplacement(String nomEmplacement) {
        this.nomEmplacement = nomEmplacement;
    }

    
}
