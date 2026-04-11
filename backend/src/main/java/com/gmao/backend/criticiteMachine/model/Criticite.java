package com.gmao.backend.criticiteMachine.model;

public class Criticite {
    private int idCriticiteMachine;
    private String criticiteMachine;
    private String descriptionCriticiteMachine;

    public Criticite(){

    }

    public Criticite(int idCriticiteMachine, String criticiteMachine, String descriptionCriticiteMachine) {
        this.idCriticiteMachine = idCriticiteMachine;
        this.criticiteMachine = criticiteMachine;
        this.descriptionCriticiteMachine = descriptionCriticiteMachine;
    }
    @Override
    public String toString(){
        return("id: " + this.getCriticiteMachine() + " nom: " + this.getCriticiteMachine() + "\n");
    }

    public int getIdCriticiteMachine() {
        return idCriticiteMachine;
    }

    public void setIdCriticiteMachine(int idCriticiteMachine) {
        this.idCriticiteMachine = idCriticiteMachine;
    }

    public String getCriticiteMachine() {
        return criticiteMachine;
    }

    public void setCriticiteMachine(String criticiteMachine) {
        this.criticiteMachine = criticiteMachine;
    }

    public String getDescriptionCriticiteMachine() {
        return descriptionCriticiteMachine;
    }

    public void setDescriptionCriticiteMachine(String descriptionCriticiteMachine) {
        this.descriptionCriticiteMachine = descriptionCriticiteMachine;
    }
    
}
