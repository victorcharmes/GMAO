package com.gmao.backend.classeMachine.model;

public class Classe {
    private int idClasseMachine;
    private String classeMachine;
    private String descriptionClasseMachine;

    public Classe(){

    }

    public Classe(int idClasseMachine, String classeMachine, String descriptionClasseMachine) {
        this.idClasseMachine = idClasseMachine;
        this.classeMachine = classeMachine;
        this.descriptionClasseMachine = descriptionClasseMachine;
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
