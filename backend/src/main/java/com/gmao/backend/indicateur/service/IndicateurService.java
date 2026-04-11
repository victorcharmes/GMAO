package com.gmao.backend.indicateur.service;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import com.gmao.backend.indicateur.model.Indicateur;
import com.gmao.backend.machine.model.MachineView;
import com.gmao.backend.machine.repository.MachineRepository;
import com.gmao.backend.ur.model.Ur;
import com.gmao.backend.ur.repository.UrRepository;
import com.gmao.backend.criticiteMachine.model.Criticite;
import com.gmao.backend.criticiteMachine.repository.CriticiteRepository;

@Service
public class IndicateurService implements CommandLineRunner {

    private final MachineRepository machineRepository;
    private final UrRepository urRepository;
    private final CriticiteRepository criticiteRepository;

    public IndicateurService(
        MachineRepository machineRepository, 
        UrRepository urRepository, 
        CriticiteRepository criticiteRepository
    ) {
        this.machineRepository = machineRepository;
        this.urRepository = urRepository;
        this.criticiteRepository = criticiteRepository;
    }

    @Override
    public void run(String... args) {
        List<MachineView> machines = getMachines();
        List<Ur> ur = getUr();
        List<Criticite> criticite = getCriticite();
        System.out.println("=== Liste des machines ===");
        System.out.println(machines);
        System.out.println("==========================");
        System.out.println("====== Liste des ur ======");
        System.out.println(ur);
        System.out.println("==========================");
        System.out.println("== Liste des criticite ===");
        System.out.println(criticite);
        System.out.println("==========================");
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