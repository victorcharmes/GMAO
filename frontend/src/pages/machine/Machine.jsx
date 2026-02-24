import { useEffect, useState, useCallback  } from "react"
import { getMachines, getCriticite, getClasse, getEmplacement, getUr } from "./services/machineApi"
import Navbar from "../../components/Navbar"
import SelectionMachine from "./components/SelectionMachine"
import ModificationMachine from "./components/ModificationMachine"
import AjoutMachine from "./components/AjoutMachine"
import SupressionMachine from "./components/SupressionMachine"

/*
Composant principal de la gestion des machines.
Il :
- Charge toutes les données nécessaires depuis l’API
- Gère la navigation entre les vues
- Transmet les données aux sous-composants
*/

export default function Machine() {

// ================================
// STATES PRINCIPAUX
// ================================

// Liste complète des machines
const [machines, setMachines] = useState([])

// Listes de référence (menus déroulants)
const [criticite, setCriticite] = useState([])
const [classe, setClasse] = useState([])
const [emplacement, setEmplacement] = useState([])
const [ur, setUr] = useState([])

// Vue active
// "selection" | "modification" | "ajout" | "supression"
const [view, setView] = useState("selection")



// ================================
// CHARGEMENT DES MACHINES
// ================================

/*
useCallback permet d'éviter
de recréer la fonction à chaque render.
*/
const loadMachines = useCallback(async () => {
    const data = await getMachines();
    console.log("LONGUEUR API :", data.length);
    console.log("DATA COMPLETE :", data);
    setMachines(data);
}, []);
// Debug du state machines
useEffect(() => {
    console.log("STATE MACHINES :", machines.length);
}, [machines]);

// ================================
// CHARGEMENT DES DONNEES DE REFERENCE
// ================================

const loadCriticite = async () => {
    const data = await getCriticite();
    setCriticite(data);
};
const loadClasse = async () => {
    const data = await getClasse();
    setClasse(data);
};
const loadEmplacement = async () => {
    const data = await getEmplacement();
    setEmplacement(data);
};
const loadUr = async () => {
    const data = await getUr();
    setUr(data);
};

// ================================
// CHARGEMENT INITIAL AU MONTAGE
// ================================

useEffect(() => {
    loadMachines();
    loadCriticite();
    loadClasse();
    loadEmplacement();
    loadUr();
}, []);


// ================================
// RENDER
// ================================

return(
    <div className="min-h-screen text-white">
        <Navbar/>

        {view === "selection" && (
            <SelectionMachine 
                machines={machines} 
                criticite={criticite}
                classe={classe}
                emplacement={emplacement}
                ur={ur}
                setView={setView}
            />
        )}

        {view === "modification" && (
            <ModificationMachine 
                machines={machines}
                loadMachines={loadMachines} //
                criticite={criticite}
                classe={classe}
                emplacement={emplacement}
                ur={ur}  
                setView={setView} />
        )}
        {view === "ajout" && (
            <AjoutMachine 
                machines={machines}
                loadMachines={loadMachines} //
                criticite={criticite}
                classe={classe}
                emplacement={emplacement}
                ur={ur}   
                setView={setView} />
        )}
        {view === "supression" && (
            <SupressionMachine 
            machines={machines}
            loadMachines={loadMachines} 
            setView={setView}
            />
        )}
    </div>
)
}
