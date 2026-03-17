package com.gmao.backend.utilisateur.model;

public class Utilisateur {
    private Integer idUtilisateur;
    private String nomUtilisateur;
    private Integer roleUtilisateur;
    private Integer urUtilisateur;

    public Utilisateur(){
    }

    public Utilisateur(Integer idUtilisateur, String nomUtilisateur, Integer roleUtilisateur, Integer urUtilisateur) {
        this.idUtilisateur = idUtilisateur;
        this.nomUtilisateur = nomUtilisateur;
        this.roleUtilisateur = roleUtilisateur;
        this.urUtilisateur = urUtilisateur;
    }

    public Integer getIdUtilisateur() {
        return idUtilisateur;
    }

    public void setIdUtilisateur(Integer idUtilisateur) {
        this.idUtilisateur = idUtilisateur;
    }

    public String getNomUtilisateur() {
        return nomUtilisateur;
    }

    public void setNomUtilisateur(String nomUtilisateur) {
        this.nomUtilisateur = nomUtilisateur;
    }

    public Integer getRoleUtilisateur() {
        return roleUtilisateur;
    }

    public void setRoleUtilisateur(Integer roleUtilisateur) {
        this.roleUtilisateur = roleUtilisateur;
    }

    public Integer getUrUtilisateur() {
        return urUtilisateur;
    }

    public void setUrUtilisateur(Integer urUtilisateur) {
        this.urUtilisateur = urUtilisateur;
    }

}

