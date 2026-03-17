import { useState } from "react";
import iconeModification from "../style/iconeModification.svg";
import iconeAjout from "../style/iconeAjout.svg";
import iconeSupression from "../style/iconeSupression.svg";

function SelectionPanne({setView, pannes=[]}){
    const [selectedPanne, setSelectedPanne] = useState(null)
    return(
        <div className="flex gap-10">
            {/* ================= COLONNE 1 ================= */}
            <div className="w-1/2 space-y-6">
                {/* Icônes */}
                <div className="flex gap-4">
                    <img src={iconeModification} alt="Modification panne" width="40"     className="cursor-pointer" 
                    onClick={() => setView("modification")} />
                    <img src={iconeAjout} alt="Ajout panne" width="40"     className="cursor-pointer"
                    onClick={() => setView("ajout")}/>
                    <img src={iconeSupression} alt="Supression panne" width="40"     className="cursor-pointer"
                    onClick={() => setView("supression")}/>
                </div>
            </div>
        </div>
    )
}export default SelectionPanne