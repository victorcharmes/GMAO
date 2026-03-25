import { useEffect, useState, useCallback  } from "react"
import { getPannes, getUtilisateurs, getEtatsPanne, getUrgencesPanne, getInterventions, getMachines } from "./service/panneApi"
import Navbar from "../../components/Navbar"
import SelectionPanne from "./components/SelectionPanne"
import SupressionPanne from "./components/SupressionPanne"
import AjoutPanne from "./components/AjoutPanne"
import ModificationPanne from "./components/ModificationPanne"

export default function Panne(){
    // Liste complète des pièces
    const[pannes, setPannes] = useState([])

    // Listes de référence (menus déroulants)
    const [utilisateurs, setUtilisateurs] = useState([])
    const [etatPannes, setEtatPannes] = useState([])
    const [urgencePannes, setUrgencePannes] = useState([])
    const [interventions, setInterventions] = useState([])
    const [machines, setMachines] = useState([])

    // Vue active
    // "selection" | "modification" | "ajout" | "supression"
    const [view, setView] = useState("selection")

    // ================================
    // CHARGEMENT DES PIECES
    // ================================
    
    /*
    useCallback permet d'éviter
    de recréer la fonction à chaque render.
    */
    const loadPannes = useCallback(async () => {
        const data = await getPannes();
        console.log("LONGUEUR API :", data.length);
        console.log("DATA COMPLETE :", data);
        setPannes(data);
    }, []);
    // Debug du state pieces
    useEffect(() => {
        console.log("STATE MACHINES :", pannes.length);
    }, [pannes]);

    // ================================
    // CHARGEMENT DES DONNEES DE REFERENCE
    // ================================
    const loadUtilisateurs = async () => {
        const data = await getUtilisateurs();
        setUtilisateurs(data);
    };
    const loadEtatPannes = async () => {
        const data = await getEtatsPanne();
        setEtatPannes(data);
    };
    const loadUrgencePannes = async () => {
        const data = await getUrgencesPanne();
        setUrgencePannes(data);
    };
    const loadInterventions = async () => {
        const data = await getInterventions();
        setInterventions(data);
    };
    const loadMachines = async () => {
        const data = await getMachines();
        setMachines(data);
    };

    // ================================
    // CHARGEMENT INITIAL AU MONTAGE
    // ================================
    
    useEffect(() => {
        loadPannes();
        loadUtilisateurs();
        loadEtatPannes();
        loadUrgencePannes();
        loadInterventions();
        loadMachines();
    }, []);

// ================================
// RENDER
// ================================
    return(
        <div className="min-h-screen text-white" >
        <Navbar/>
            <div className="mt-20 px-10">
            {view === "selection" && (
                <SelectionPanne
                    pannes ={pannes}
                    utilisateurs = {utilisateurs}
                    etatPannes = {etatPannes}
                    urgencePannes = {urgencePannes}
                    interventions = {interventions}
                    machines = {machines}
                    setView={setView}
                />
            )}
            {view === "modification" && (
                <ModificationPanne
                    pannes ={pannes}
                    loadPannes={loadPannes}
                    etatPannes = {etatPannes}
                    urgencePannes = {urgencePannes}
                    setView={setView}
                />
            )}
            {view === "ajout" && (
                <AjoutPanne
                    setView={setView}
                />
            )}
            {view === "supression" && (
                <SupressionPanne
                    setView={setView}
                />  
            )}
            </div>
        </div>
    )
}