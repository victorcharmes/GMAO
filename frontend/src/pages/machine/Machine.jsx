import { useEffect, useState } from "react"
import { getMachines, getCriticite, getClasse, getEmplacement, getUr } from "./services/machineApi"
import Navbar from "../../components/Navbar"
import SelectionMachine from "./components/SelectionMachine"
import ModificationMachine from "./components/ModificationMachine"
import AjoutMachine from "./components/AjoutMachine"

export default function Machine() {
    const [machines, setMachines] = useState([]);
    const [criticite, setCriticite] = useState([]);
    const [classe, setClasse] = useState([]);
    const [emplacement, setEmplacement] = useState([]);
    const [ur, setUr] = useState([]);
    const [view, setView] = useState("selection"); 
    // "selection" | "modification" | "ajout"

    const loadMachines = async () => {
        const data = await getMachines();
        setMachines(data);
    };
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

    useEffect(() => {
        loadMachines();
        loadCriticite();
        loadClasse();
        loadEmplacement();
        loadUr();
    }, []);

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
                    loadMachines={loadMachines}
                    criticite={criticite}
                    classe={classe}
                    emplacement={emplacement}
                    ur={ur}  
                    setView={setView} />
            )}
            {view === "ajout" && (
                <AjoutMachine 
                    machines={machines}
                    loadMachines={loadMachines}
                    criticite={criticite}
                    classe={classe}
                    emplacement={emplacement}
                    ur={ur}   
                    setView={setView} />
            )}
        </div>
    )
}
