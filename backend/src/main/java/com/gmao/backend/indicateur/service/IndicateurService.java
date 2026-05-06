package com.gmao.backend.indicateur.service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
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

        Indicateur indicateur1 = new Indicateur(2, "Machine", 1,
        LocalDateTime.of(2024, 4, 20, 0, 0, 0), LocalDateTime.of(2025, 1, 1, 0, 30, 0));

        LocalDateTime dateDeb = indicateur1.getDateDebut();
        LocalDateTime dateFin = indicateur1.getDateFin();
        int porteeIndicateur = indicateur1.getPorteeIndicateur();

        if (indicateur1.getIdTypeIndicateur() == 1){
            calcIndicateurMachine(porteeIndicateur, dateDeb, dateFin);
        }
        else if (indicateur1.getIdTypeIndicateur() == 2){
            calcIndicateurCriticite(porteeIndicateur, dateDeb, dateFin);
        }
        else if (indicateur1.getIdTypeIndicateur() == 3){
            calcIndicateurUR(porteeIndicateur, dateDeb, dateFin);
        }
    }

    //dans List<Panne> pannes mettre temp arret 
    public void calcIndicateurMachine(int porteeIndicateur, LocalDateTime dateDeb, LocalDateTime dateFin){
        System.out.println("Calcul avec machines");
        List<Panne> pannes = indicateurRepository.findByMachine(porteeIndicateur, dateDeb, dateFin);
        int nbJoursOuvres = 0;
        LocalDate jourDeb; //= dateDeb.toLocalDate();
        LocalDate jourFin;
        LocalTime heureDeb; //= dateDeb.toLocalTime();
        LocalTime heureFin;
        long tempsPremierJour = 0;
        long tempsDernierJour = 0;
        long tempsArretTotal = 0;
        Classe classeMachine = indicateurRepository.findPlageOuvertureByIDMachine(pannes.get(0).getIdMachineEnPanne());
        LocalTime heureOuvertureDebut = classeMachine.getOuvertureDebut();
        LocalTime heureOuvertureFin = classeMachine.getOuvertureFin();
        long ouvertureJournaliere = timeBetween(heureOuvertureDebut, heureOuvertureFin);
        System.out.println("=== ouvertureJournaliere ===");
        System.out.println(ouvertureJournaliere);
        for (Panne panne : pannes){

            jourDeb = panne.getDateDebut().toLocalDate(); //Date seulement, permet le calcul du nombre de jours ouvres
            jourFin = panne.getDateFin().toLocalDate(); //Date seulement, permet le calcul du nombre de jours ouvres
            heureDeb = panne.getDateDebut().toLocalTime(); //Heure seulement, permet le calcul du temps arrêt premier jour
            heureFin = panne.getDateFin().toLocalTime(); //Heure seulement, permet le calcul du temps arrêt dernier jour
            nbJoursOuvres = nombreJoursOuvres(jourDeb, jourFin); //Nombre de jours ouvres entre deux dates - 2
            tempsPremierJour = timeBetween(heureOuvertureDebut, heureDeb);
            tempsDernierJour = timeBetween(heureFin, heureOuvertureFin);
            tempsArretTotal = tempsPremierJour + tempsDernierJour + nbJoursOuvres * ouvertureJournaliere;
            panne.setTpsArret(tempsArretTotal);
        } 
        System.out.println(pannes);
        System.out.println("Longeur: " + pannes.size());
    }
    public void calcIndicateurCriticite(int porteeIndicateur, LocalDateTime dateDeb, LocalDateTime dateFin){
        System.out.println("Calcul avec criticite");
        List<Panne> pannes = indicateurRepository.finByCriticite(porteeIndicateur, dateDeb, dateFin);

        Set<Integer> ids = new HashSet<>();
        for (Panne p : pannes) {
            ids.add(p.getIdMachineEnPanne());
        }

        for (Integer idMachine : ids){
            pannes = indicateurRepository.findByMachine(idMachine, dateDeb, dateFin);
            int nbJoursOuvres = 0;
            LocalDate jourDeb; //= dateDeb.toLocalDate();
            LocalDate jourFin;
            LocalTime heureDeb; //= dateDeb.toLocalTime();
            LocalTime heureFin;
            long tempsPremierJour = 0;
            long tempsDernierJour = 0;
            long tempsArretTotal = 0;
            Classe classeMachine = indicateurRepository.findPlageOuvertureByIDMachine(pannes.get(0).getIdMachineEnPanne());
            LocalTime heureOuvertureDebut = classeMachine.getOuvertureDebut();
            LocalTime heureOuvertureFin = classeMachine.getOuvertureFin();
            long ouvertureJournaliere = timeBetween(heureOuvertureDebut, heureOuvertureFin);
            System.out.println("=== ouvertureJournaliere ===");
            System.out.println(ouvertureJournaliere);
            for (Panne panne : pannes){

                jourDeb = panne.getDateDebut().toLocalDate(); //Date seulement, permet le calcul du nombre de jours ouvres
                jourFin = panne.getDateFin().toLocalDate(); //Date seulement, permet le calcul du nombre de jours ouvres
                heureDeb = panne.getDateDebut().toLocalTime(); //Heure seulement, permet le calcul du temps arrêt premier jour
                heureFin = panne.getDateFin().toLocalTime(); //Heure seulement, permet le calcul du temps arrêt dernier jour
                nbJoursOuvres = nombreJoursOuvres(jourDeb, jourFin); //Nombre de jours ouvres entre deux dates - 2
                tempsPremierJour = timeBetween(heureOuvertureDebut, heureDeb);
                tempsDernierJour = timeBetween(heureFin, heureOuvertureFin);
                tempsArretTotal = tempsPremierJour + tempsDernierJour + nbJoursOuvres * ouvertureJournaliere;
                panne.setTpsArret(tempsArretTotal);
            } 
        }

        System.out.println(pannes);
        System.out.println("\nLongeur: " + pannes.size());
        System.out.println("\nNombre de machines: " + ids);
    }
    public void calcIndicateurUR(int porteeIndicateur, LocalDateTime dateDeb, LocalDateTime dateFin){
        System.out.println("Calcul avec UR");
        List<Panne> pannes = indicateurRepository.finByUR(porteeIndicateur, dateDeb, dateFin);
        System.out.println(pannes);
        System.out.println("Longeur: " + pannes.size());
    }
/*
byMachine => on a l'id d'une machine => porteeIndicateur = l'id de la machine
    on récupère la classe de la machine
    on récupère les plages de cette classe
    on parcours les pannes de la machine
byCriticite => on a l'id des machines d'une criticite => porteeIndicateur = l'id de la criticite
byUR => on a l'id des machines d'un UR => porteeIndicateur = l'id de l'UR

solution au problème de porteeIndicateur : trois champs nullable distincts dans Indicateur.

private Integer idMachine;      // non-null si type = Machine
private Integer idCriticite;    // non-null si type = Criticite  
private Integer idUR;           // non-null si type = UR
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