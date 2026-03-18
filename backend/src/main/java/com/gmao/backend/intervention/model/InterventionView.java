package com.gmao.backend.intervention.model;

import java.time.LocalDateTime;

public class InterventionView {
    private Integer idIntervention;
    private String descriptionIntervention;
    private LocalDateTime dateDebutIntervention;
    private LocalDateTime dateFinIntervention;
    private Integer dureeIntervention;
    private Integer idPanneDeIntervention;

    public InterventionView(){}

    public InterventionView(Integer idIntervention, String descriptionIntervention, LocalDateTime dateDebutIntervention,
            LocalDateTime dateFinIntervention, Integer dureeIntervention, Integer idPanneDeIntervention) {
        this.idIntervention = idIntervention;
        this.descriptionIntervention = descriptionIntervention;
        this.dateDebutIntervention = dateDebutIntervention;
        this.dateFinIntervention = dateFinIntervention;
        this.dureeIntervention = dureeIntervention;
        this.idPanneDeIntervention = idPanneDeIntervention;
    }

    public Integer getIdIntervention() {
        return idIntervention;
    }

    public void setIdIntervention(Integer idIntervention) {
        this.idIntervention = idIntervention;
    }

    public String getDescriptionIntervention() {
        return descriptionIntervention;
    }

    public void setDescriptionIntervention(String descriptionIntervention) {
        this.descriptionIntervention = descriptionIntervention;
    }

    public LocalDateTime getDateDebutIntervention() {
        return dateDebutIntervention;
    }

    public void setDateDebutIntervention(LocalDateTime dateDebutIntervention) {
        this.dateDebutIntervention = dateDebutIntervention;
    }

    public LocalDateTime getDateFinIntervention() {
        return dateFinIntervention;
    }

    public void setDateFinIntervention(LocalDateTime dateFinIntervention) {
        this.dateFinIntervention = dateFinIntervention;
    }

    public Integer getDureeIntervention() {
        return dureeIntervention;
    }

    public void setDureeIntervention(Integer dureeIntervention) {
        this.dureeIntervention = dureeIntervention;
    }

    public Integer getIdPanneDeIntervention() {
        return idPanneDeIntervention;
    }

    public void setIdPanneDeIntervention(Integer idPanneDeIntervention) {
        this.idPanneDeIntervention = idPanneDeIntervention;
    }



    
}
