import { useEffect, useState, useCallback  } from "react"
import { getPannes, getInterventions, getMachines, getUtilisateurs } from "./service/interventionApi"
import Navbar from "../../components/Navbar"
import AjoutIntervention from "./components/AjoutIntervention"
import ModificationIntervention from "./components/ModificationIntervention"
import SelectionIntervention from "./components/SelectionIntervention"
import SuprressionIntervention from "./components/SupressionIntervention"

export default function intervention(){
    // Liste complète des pièces
    const[interventions, setInterventions] = useState([])

    // Listes de référence (menus déroulants)
    const [pannes, setPannes] = useState([])
    const [machines, setMachines] = useState([])
    const [utilisateurs, setUtilisateurs] = useState([])

    // Vue active
    // "selection" | "modification" | "ajout" | "supression"
    const [view, setView] = useState("selection")

    // ================================
    // CHARGEMENT DES INTERVENTIONS
    // ================================
    
    /*
    useCallback permet d'éviter
    de recréer la fonction à chaque render.
    */
    const loadInterventions = useCallback(async () => {
        const data = await getInterventions();
        console.log("LONGUEUR API :", data.length);
        console.log("DATA COMPLETE :", data);
        setInterventions(data);
    }, []);
    // Debug du state pieces
    useEffect(() => {
        console.log("STATE INTERVENTIONS :", interventions.length);
    }, [interventions]);

    // ================================
    // CHARGEMENT DES DONNEES DE REFERENCE
    // ================================
    const loadPannes = async () => {
        const data = await getPannes();
        setPannes(data);
    };
    const loadMachines = async () => {
        const data = await getMachines();
        setMachines(data);
    };
    const loadUtilisateurs = async () => {
        const data = await getUtilisateurs();
        setUtilisateurs(data);
    };

    // ================================
    // CHARGEMENT INITIAL AU MONTAGE
    // ================================
    
    useEffect(() => {
        loadInterventions();
        loadPannes();
        loadMachines();
        loadUtilisateurs();
    }, []);
    return(
        <div className="min-h-screen text-white" >
        <Navbar/>
            <div className="mt-20 px-10">
                {view === "selection" && (
                    <SelectionIntervention
                        interventions={interventions}
                        pannes={pannes}
                        machines={machines}
                        utilisateurs={utilisateurs}
                        setView={setView}
                    />
                )}
                {view === "modification" && (
                    <ModificationIntervention
                        setView={setView}
                    />
                )}
                {view === "ajout" && (
                    <AjoutIntervention
                        loadInterventions={loadInterventions}
                        pannes ={pannes}
                        utilisateurs={utilisateurs}
                        setView={setView}
                    />
                )}
                {view === "supression" && (
                    <SuprressionIntervention
                        setView={setView}
                    />
                )}
            </div>
        </div>
    )
}