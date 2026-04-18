package com.gmao.backend.classeMachine.model;

import java.time.LocalDateTime;

public class Classe {
    private int idClasseMachine;
    private String classeMachine;
    private String descriptionClasseMachine;
    private LocalDateTime ouvertureDebut;
    private LocalDateTime ouvertureFin;

    public Classe(){

    }



    public Classe(int idClasseMachine, String classeMachine, String descriptionClasseMachine,
            LocalDateTime ouvertureDebut, LocalDateTime ouvertureFin) {
        this.idClasseMachine = idClasseMachine;
        this.classeMachine = classeMachine;
        this.descriptionClasseMachine = descriptionClasseMachine;
        this.ouvertureDebut = ouvertureDebut;
        this.ouvertureFin = ouvertureFin;
    }



    public LocalDateTime getOuvertureDebut() {
        return ouvertureDebut;
    }



    public void setOuvertureDebut(LocalDateTime ouvertureDebut) {
        this.ouvertureDebut = ouvertureDebut;
    }



    public LocalDateTime getOuvertureFin() {
        return ouvertureFin;
    }



    public void setOuvertureFin(LocalDateTime ouvertureFin) {
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
