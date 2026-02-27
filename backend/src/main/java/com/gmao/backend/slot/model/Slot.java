package com.gmao.backend.slot.model;

public class Slot {
    private Integer idSlot;
    private String nomSlot;
    private Integer magasinDeSlot;

    public Slot(){
    }

    public Slot(Integer idSlot, String nomSlot, Integer magasinDeSlot) {
        this.idSlot = idSlot;
        this.nomSlot = nomSlot;
        this.magasinDeSlot = magasinDeSlot;
    }

    public Integer getIdSlot() {
        return idSlot;
    }

    public void setIdSlot(Integer idSlot) {
        this.idSlot = idSlot;
    }

    public String getNomSlot() {
        return nomSlot;
    }

    public void setNomSlot(String nomSlot) {
        this.nomSlot = nomSlot;
    }

    public Integer getMagasinDeSlot() {
        return magasinDeSlot;
    }

    public void setMagasinDeSlot(Integer magasinDeSlot) {
        this.magasinDeSlot = magasinDeSlot;
    }

}

