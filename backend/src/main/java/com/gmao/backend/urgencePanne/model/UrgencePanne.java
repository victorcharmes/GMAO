package com.gmao.backend.urgencePanne.model;

public class UrgencePanne {
    private Integer idUrgencePanne;
    private String urgencePanne;
    private String descriptionUrgencePanne;

    public UrgencePanne(){
    }

    public UrgencePanne(Integer idUrgencePanne, String urgencePanne, String descriptionUrgencePanne) {
        this.idUrgencePanne = idUrgencePanne;
        this.urgencePanne = urgencePanne;
        this.descriptionUrgencePanne = descriptionUrgencePanne;
    }

    public Integer getIdUrgencePanne() {
        return idUrgencePanne;
    }

    public void setIdUrgencePanne(Integer idUrgencePanne) {
        this.idUrgencePanne = idUrgencePanne;
    }

    public String getUrgencePanne() {
        return urgencePanne;
    }

    public void setUrgencePanne(String urgencePanne) {
        this.urgencePanne = urgencePanne;
    }

    public String getDescriptionUrgencePanne() {
        return descriptionUrgencePanne;
    }

    public void setDescriptionUrgencePanne(String descriptionUrgencePanne) {
        this.descriptionUrgencePanne = descriptionUrgencePanne;
    }


}

