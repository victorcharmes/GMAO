package com.gmao.backend.classeMachine.model;

import java.time.LocalTime;

public class Classe {
    private int idClasseMachine;
    private String classeMachine;
    private String descriptionClasseMachine;
    private LocalTime ouvertureDebut;
    private LocalTime ouvertureFin;

    public Classe(){

    }

    public Classe(int idClasseMachine, String classeMachine, String descriptionClasseMachine, LocalTime ouvertureDebut,
            LocalTime ouvertureFin) {
        this.idClasseMachine = idClasseMachine;
        this.classeMachine = classeMachine;
        this.descriptionClasseMachine = descriptionClasseMachine;
        this.ouvertureDebut = ouvertureDebut;
        this.ouvertureFin = ouvertureFin;
    }






    public LocalTime getOuvertureDebut() {
        return ouvertureDebut;
    }






    public void setOuvertureDebut(LocalTime ouvertureDebut) {
        this.ouvertureDebut = ouvertureDebut;
    }






    public LocalTime getOuvertureFin() {
        return ouvertureFin;
    }






    public void setOuvertureFin(LocalTime ouvertureFin) {
        this.ouvertureFin = ouvertureFin;
    }






    public int getIdClasseMachine() {
        return idClasseMachine;
    }

    public void setIdClasseMachine(int idClasseMachine) {
        this.idClasseMachine = idClasseMachine;
    }

    public String getClasseMachine() {
        return classeMachine;
    }

    public void setClasseMachine(String classeMachine) {
        this.classeMachine = classeMachine;
    }

    public String getDescriptionClasseMachine() {
        return descriptionClasseMachine;
    }

    public void setDescriptionClasseMachine(String descriptionClasseMachine) {
        this.descriptionClasseMachine = descriptionClasseMachine;
    }

 
    
}
