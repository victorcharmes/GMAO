package com.gmao.backend.indicateur.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import com.gmao.backend.indicateur.model.Indicateur;
import com.gmao.backend.indicateur.repository.IndicateurRepository;
import com.gmao.backend.machine.model.MachineView;
import com.gmao.backend.machine.repository.MachineRepository;
import com.gmao.backend.panne.model.Panne;
import com.gmao.backend.ur.model.Ur;
import com.gmao.backend.ur.repository.UrRepository;
import com.gmao.backend.criticiteMachine.model.Criticite;
import com.gmao.backend.criticiteMachine.repository.CriticiteRepository;

@Service
public class IndicateurService implements CommandLineRunner {

    private final IndicateurRepository indicateurRepository;
    private final MachineRepository machineRepository;
    private final UrRepository urRepository;
    private final CriticiteRepository criticiteRepository;

    public IndicateurService(
        IndicateurRepository indicateurRepository,
        MachineRepository machineRepository, 
        UrRepository urRepository, 
        CriticiteRepository criticiteRepository
    ) {
        this.indicateurRepository = indicateurRepository;
        this.machineRepository = machineRepository;
        this.urRepository = urRepository;
        this.criticiteRepository = criticiteRepository;
    }

    @Override
    public void run(String... args) {
        List<MachineView> machines = getMachines();
        List<Ur> ur = getUr();
        List<Criticite> criticite = getCriticite();
        Indicateur indicateur1 = new Indicateur(1, "Machine", 2, LocalDateTime.of(2024, 1, 20, 14, 30, 0), LocalDateTime.of(2024, 1, 20, 14, 30, 0));
        System.out.println("= La cible d'indicateur ==");
        System.out.println(indicateur1);
        System.out.println("==========================");
        System.out.println("=== Liste des machines ===");
        System.out.println(machines);
        System.out.println("==========================");
        System.out.println("====== Liste des ur ======");
        System.out.println(ur);
        System.out.println("==========================");
        System.out.println("== Liste des criticite ===");
        System.out.println(criticite);
        System.out.println("==========================");
        if (indicateur1.getIdTypeIndicateur() == 1){
            calcIndicateurMachine();
        }
        else if (indicateur1.getIdTypeIndicateur() == 2){
            calcIndicateurCriticite();
        }
        else if (indicateur1.getIdTypeIndicateur() == 3){
            calcIndicateurUR();
        }
    }

    public void calcIndicateurMachine(){
        System.out.println("Calcul avec machines");
        List<Panne> pannes = indicateurRepository.findByMachine(2, LocalDateTime.of(2024, 1, 20, 14, 30, 0), LocalDateTime.of(2027, 1, 20, 14, 30, 0), 4);
        System.out.println(pannes);
    }
    public void calcIndicateurCriticite(){
        System.out.println("Calcul avec criticite");
    }
    public void calcIndicateurUR(){
        System.out.println("Calcul avec UR");
    }

    public Indicateur createIndicateur(Indicateur indicateur) {
        System.out.println("Service reçoit : " + indicateur);
        return indicateur;
    }

    public List<MachineView> getMachines() {
        return machineRepository.findAll();
    }
    public List<Ur> getUr() {
        return urRepository.findAll();
    }
    public List<Criticite> getCriticite() {
        return criticiteRepository.findAll();
    }
}