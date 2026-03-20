import { useState } from "react";
import iconeModification from "../style/iconeModification.svg";
import iconeAjout from "../style/iconeAjout.svg";
import iconeSupression from "../style/iconeSupression.svg";

function SelectionPanne({pannes=[], utilisateurs=[], etatPannes=[], urgencePannes=[], interventions=[], setView}){
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
               
                {/* Sélection machine */}
                <div>
                    <h3>Machine pour visualiser pannes :</h3>

                    <select
                    className="border-2 rounded border-slate-900 w-full text-white"
                    value={selectedPanne?.id || ""}
                    onChange={(e) => {
                        const id = Number(e.target.value);
                        const machine = machines.find(m => m.id === id);
                        setSelectedPanne(panne || null);
                    }}
                    >
                    <option value="" className="bg-slate-900">-- Choisir une machine --</option>

                    {pannes.map(panne => (
                        <option key={panne.id} value={panne.id} className="bg-slate-900 "> 
                        {panne.description}
                        </option>
                    ))}
                    </select>
                </div>
            </div>
        </div>
    )
}export default SelectionPanne