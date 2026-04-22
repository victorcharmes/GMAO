package com.gmao.backend.indicateur.service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.time.DayOfWeek;
import java.time.LocalDate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import com.gmao.backend.indicateur.model.Indicateur;
import com.gmao.backend.indicateur.repository.IndicateurRepository;
import com.gmao.backend.machine.model.MachineView;
import com.gmao.backend.machine.repository.MachineRepository;
import com.gmao.backend.panne.model.Panne;
import com.gmao.backend.ur.model.Ur;
import com.gmao.backend.ur.repository.UrRepository;
import com.gmao.backend.classeMachine.model.Classe;
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

        Indicateur indicateur1 = new Indicateur(1, "Machine", 2, 
        LocalDateTime.of(2025, 1, 1, 14, 30, 0), LocalDateTime.of(2026, 4, 20, 15, 30, 0));
        LocalDateTime dateDeb = indicateur1.getDateDebut();
        LocalDateTime dateFin = indicateur1.getDateFin();
        int porteeIndicateur = indicateur1.getPorteeIndicateur();

        if (indicateur1.getIdTypeIndicateur() == 1){
            calcIndicateurMachine(porteeIndicateur, dateDeb, dateFin);
        }
        else if (indicateur1.getIdTypeIndicateur() == 2){
            calcIndicateurCriticite();
        }
        else if (indicateur1.getIdTypeIndicateur() == 3){
            calcIndicateurUR();
        }
    }

    //dans List<Panne> pannes mettre temp arret 
    public void calcIndicateurMachine(int porteeIndicateur, LocalDateTime dateDeb, LocalDateTime dateFin){
        System.out.println("Calcul avec machines");
        List<Panne> pannes = indicateurRepository.findByMachine(porteeIndicateur, dateDeb, dateFin);
        int nbJoursOuvres = 0;
        LocalDate jourDeb = dateDeb.toLocalDate();
        LocalDate jourFin = dateFin.toLocalDate();
        LocalTime heureDeb = dateDeb.toLocalTime();
        LocalTime heureFin = dateFin.toLocalTime();
        long tempsPremierJour = 0;
        long tempsDernierJour = 0;
        Classe classeMachine = indicateurRepository.findPlageOuvertureByIDMachine(porteeIndicateur);
        LocalTime heureOuvertureDebut = classeMachine.getOuvertureDebut();
        LocalTime heureOuvertureFin = classeMachine.getOuvertureFin();

        for (Panne panne : pannes){
            nbJoursOuvres = nombreJoursOuvres(jourDeb, jourFin);
            tempsPremierJour = timeBetween(heureDeb, heureOuvertureFin);
            tempsDernierJour = timeBetween(heureOuvertureDebut, heureFin);

        }
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
LocalDateTime dt = LocalDateTime.now();
DayOfWeek jour = dt.getDayOfWeek();

if (jour != DayOfWeek.SATURDAY && jour != DayOfWeek.SUNDAY) {
    // c'est un jour de semaine

timeBetween (LocalTime dateDeb, LocalTime dateFin)

nbJoursOuvres (LocalDate dateDeb, LocalDate dateFin)

calcul panne (LocalDateTime dateDeb, LocalDateTime dateFin)
}
*/

    public long timeBetween(LocalTime dateDebut, LocalTime dateFin){
        return ChronoUnit.SECONDS.between(dateDebut, dateFin);
    }
    /**
     *Ne prend pas en compte le premier jour et le dernier jour
     */
    public int nombreJoursOuvres (LocalDate debut, LocalDate fin){
        int nombreJoursOuvres = 0;
        LocalDate dateCourant = debut; //La date que l'on vérifie
        // 
        while (!dateCourant.isAfter(fin)){
            if((dateCourant.getDayOfWeek().getValue() <= 5) && !dateCourant.isEqual(debut) && !dateCourant.isEqual(fin)){
                nombreJoursOuvres ++;
            }
            dateCourant = dateCourant.plusDays(1);
        }
        return nombreJoursOuvres;
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