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
        Indicateur indicateur1 = new Indicateur(3, "Machine", 2, LocalDateTime.of(2024, 1, 20, 14, 30, 0), LocalDateTime.of(2024, 1, 20, 14, 30, 0));
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
        List<Panne> pannes = indicateurRepository.findByMachine(2, LocalDateTime.of(2024, 1, 20, 14, 30, 0), LocalDateTime.of(2027, 1, 20, 14, 30, 0));
        System.out.println(pannes);
        System.out.println("Longeur: " + pannes.size());
    }
    public void calcIndicateurCriticite(){
        System.out.println("Calcul avec criticite");
        List<Panne> pannes = indicateurRepository.finByCriticite(1, LocalDateTime.of(2024, 1, 20, 14, 30, 0), LocalDateTime.of(2027, 1, 20, 14, 30, 0));
        System.out.println(pannes);
        System.out.println("Longeur: " + pannes.size());
    }
    public void calcIndicateurUR(){
        System.out.println("Calcul avec UR");
        List<Panne> pannes = indicateurRepository.finByUR(3, LocalDateTime.of(2024, 1, 20, 14, 30, 0), LocalDateTime.of(2027, 1, 20, 14, 30, 0));
        System.out.println(pannes);
        System.out.println("Longeur: " + pannes.size());
    }
/*
LocalDateTime pour représenter tes deux bornes (début et fin), puisque tu manipules des dates avec heures.
LocalTime pour définir ta plage d'ouverture (ex : LocalTime.of(8, 0) et LocalTime.of(18, 0)).
LocalDate et sa méthode getDayOfWeek() pour tester si un jour est un DayOfWeek.SATURDAY ou DayOfWeek.SUNDAY et l'exclure.
Duration pour accumuler le temps calculé. Tu peux additionner des durées avec duration = duration.plus(...) et récupérer le total en heures/minutes via toHours(), toMinutes(), etc.
ChronoUnit peut aussi être utile pour des calculs ponctuels (ChronoUnit.MINUTES.between(a, b)).
*/
    public void timeBetween(LocalDateTime dateDebut, LocalDateTime dateFin){

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