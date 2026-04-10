import { useState } from "react";
import iconePanne from "../style/iconePanne.svg";
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
    const [selectedMachine, setSelectedMachine] = useState(null)
    const [selectedPanne, setSelectedPanne] = useState(null)
    const [selectedNomPanne, setSelectedNomPanne] = useState(null)
    const [dateDebutFiltre, setDateDebutFiltre] = useState("")
    const [dateFinFiltre, setDateFinFiltre] = useState("")

    const pannesFiltres = (selectedNomPanne
        ? pannes.filter(p => p.nom === selectedNomPanne)
        : pannes.filter(p => String(p.idMachineEnPanne) === String(selectedMachine?.id))
    ).filter(p => {
        if (dateDebutFiltre && p.dateDebut < dateDebutFiltre) return false
        if (dateFinFiltre && p.dateDebut > dateFinFiltre) return false
        return true
    })

    const nomsUniques = [...new Set(pannes.map(p => p.nom).filter(Boolean))]
    return(
        <div className="space-y-6">
            <div className="flex gap-10">
                {/* ================= Colonne 1 ================= */}
                <div className="w-1/2 space-y-6">
                    {/* Icônes */}
                    <div className="flex gap-4">
                        <img src={iconePanne} alt="Icone Intervention" width="40" className="cursor-pointer"/>
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
                            value={selectedMachine?.id || ""}
                            onChange={(e) => {
                                const id = Number(e.target.value);
                                const machine = machines.find(m => m.id === id);
                                setSelectedMachine(machine || null);
                                setSelectedPanne(null);
                                setSelectedNomPanne(null);
                                setDateDebutFiltre("");
                                setDateFinFiltre("");
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
                    <div>
                        <h3>Nom de la panne :</h3>
                        <select
                            className="border-2 rounded border-slate-900 w-full text-white max-w-75"
                            value={selectedNomPanne || ""}
                            onChange={(e) => {
                                const nom = e.target.value;
                                setSelectedNomPanne(nom || null);
                                setSelectedMachine(null);
                                setSelectedPanne(null);
                                setDateDebutFiltre("");
                                setDateFinFiltre("");
                            }}
                        >
                            <option value="" className="bg-slate-900">-- Choisir une panne --</option>
                            {nomsUniques.map(nom => (
                                <option key={nom} value={nom} className="bg-slate-900">{nom}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* ================= COLONNE 2 ================= */}
                <div className="w-1/3 flex flex-col items-center gap-6">
                    <div>
                        <h3>Date de debut :</h3>
                        <input
                        type = "datetime-local"
                        value={dateDebutFiltre}
                        onChange={(e) => setDateDebutFiltre(e.target.value)}
                        className="border-2 rounded border-slate-900 w-full max-w-75"
                        />
                    </div>
                </div>
                {/* ================= COLONNE 3 ================= */}
                <div className="w-1/3 flex flex-col items-center gap-6">
                    <div>
                        <h3>Date de fin :</h3>
                        <input
                        type = "datetime-local"
                        value={dateFinFiltre}
                        onChange={(e) => setDateFinFiltre(e.target.value)}
                        className="border-2 rounded border-slate-900 w-full max-w-75"
                        />
                    </div>
                </div>
            </div>

            {/* ================= TABLEAU DES PANNES ================= */}
            {(selectedMachine || selectedNomPanne) && (
                <div>
                    <h3 className="mb-2">
                        {selectedNomPanne
                            ? `Panne : ${selectedNomPanne}`
                            : `Pannes de la machine : ${selectedMachine.nom}`}
                    </h3>
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
                                    <tr key={panne.id} className={`border-b border-slate-700 hover:bg-slate-800 cursor-pointer ${selectedPanne?.id === panne.id ? "bg-slate-700" : ""}`} onClick={() => setSelectedPanne(panne)}>
                                        <td className="py-2 pr-4">{panne.description}</td>
                                        <td className="py-2 pr-4">{new Date(panne.dateDebut).toLocaleString("fr-FR")}</td>
                                        <td className="py-2 pr-4">{new Date(panne.dateFin).toLocaleString("fr-FR") ?? "-"}</td>
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