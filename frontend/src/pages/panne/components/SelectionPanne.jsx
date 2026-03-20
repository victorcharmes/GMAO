import { useState } from "react";
import iconeModification from "../style/iconeModification.svg";
import iconeAjout from "../style/iconeAjout.svg";
import iconeSupression from "../style/iconeSupression.svg";

function SelectionPanne({
    pannes=[], 
    utilisateurs=[], 
    etatPannes=[], 
    urgencePannes=[], 
    interventions=[], 
    machines= [],
    setView
    }){
    const [selectedPanne, setSelectedPanne] = useState(null)

    const pannesFiltres = pannes.filter(p => String(p.idMachineEnPanne) === String(selectedPanne?.id))
    return(
        <div className="space-y-6">
            <div className="flex gap-10">
                {/* ================= Colonne 1 ================= */}
                <div className="w-1/2 space-y-6">
                    {/* Icônes */}
                    <div className="flex gap-4">
                        <img src={iconeModification} alt="Modification panne" width="40" className="cursor-pointer"
                        onClick={() => setView("modification")} />
                        <img src={iconeAjout} alt="Ajout panne" width="40" className="cursor-pointer"
                        onClick={() => setView("ajout")}/>
                        <img src={iconeSupression} alt="Supression panne" width="40" className="cursor-pointer"
                        onClick={() => setView("supression")}/>
                    </div>

                    {/* Sélection machine */}
                    <div>
                        <h3>Machine pour visualiser pannes :</h3>
                        <select
                            className="border-2 rounded border-slate-900 w-full text-white max-w-75"
                            value={selectedPanne?.id || ""}
                            onChange={(e) => {
                                const id = Number(e.target.value);
                                const machine = machines.find(m => m.id === id);
                                setSelectedPanne(machine || null);
                            }}
                        >
                            <option value="" className="bg-slate-900">-- Choisir une machine --</option>
                            {machines.map(machine => (
                                <option key={machine.id} value={machine.id} className="bg-slate-900">
                                    {machine.nom}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* ================= COLONNE 2 ================= */}
                <div className="w-1/3 flex flex-col items-center gap-6">
                    colonne 2
                </div>
                {/* ================= COLONNE 3 ================= */}
                <div className="w-1/3 flex flex-col items-center gap-6">
                    colonne 3
                </div>
            </div>

            {/* ================= TABLEAU DES PANNES ================= */}
            {selectedPanne && (
                <div>
                    <h3 className="mb-2">Pannes de la machine : {selectedPanne.nom}</h3>
                    {pannesFiltres.length === 0 ? (
                        <p className="text-slate-400">Aucune panne enregistrée pour cette machine.</p>
                    ) : (
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="border-b border-slate-600 text-left">
                                    <th className="py-2 pr-4">Description</th>
                                    <th className="py-2 pr-4">Date début</th>
                                    <th className="py-2 pr-4">Date fin</th>
                                    <th className="py-2 pr-4">Urgence</th>
                                    <th className="py-2 pr-4">État</th>
                                    <th className="py-2 pr-4">Demandeur</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pannesFiltres.map(panne => (
                                    <tr key={panne.id} className="border-b border-slate-700 hover:bg-slate-800">
                                        <td className="py-2 pr-4">{panne.description}</td>
                                        <td className="py-2 pr-4">{panne.dateDebut}</td>
                                        <td className="py-2 pr-4">{panne.dateFin ?? "-"}</td>
                                        <td className="py-2 pr-4">{panne.nomUrgence}</td>
                                        <td className="py-2 pr-4">{panne.nomEtatPanne}</td>
                                        <td className="py-2 pr-4">{panne.nomUtilisateurDemandeur}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    )
}export default SelectionPanne