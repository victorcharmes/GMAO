import { useEffect, useState } from "react"
import { getMachines } from "./services/machineApi"
import Navbar from "../../components/Navbar"
import SelectionMachine from "./components/SelectionMachine"
import ModificationMachine from "./components/ModificationMachine"
import AjoutMachine from "./components/AjoutMachine"

export default function Machine() {
    const [machines, setMachines] = useState([]);
    const [view, setView] = useState("selection"); 
    // "selection" | "modification" | "ajout"

    const loadMachines = async () => {
        const data = await getMachines();
        setMachines(data);
    };

    useEffect(() => {
        loadMachines();
    }, []);

    return(
        <div className="min-h-screen text-white">
            <Navbar/>

            {view === "selection" && (
                <SelectionMachine 
                    machines={machines} 
                    setView={setView}
                />
            )}

            {view === "modification" && (
                <ModificationMachine setView={setView} />
            )}
            {view === "ajout" && (
                <AjoutMachine setView={setView} />
            )}
        </div>
    )
}
