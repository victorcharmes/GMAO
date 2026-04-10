import { useState } from "react";
import iconeIntervention from "../style/iconeIntervention.svg";
import iconeModification from "../style/iconeModification.svg";
import iconeAjout from "../style/iconeAjout.svg";
import iconeSupression from "../style/iconeSupression.svg";

function SelectionIntervention({
    interventions=[],
    pannes=[],
    machines=[],
    utilisateurs=[],
    setView
}){

    // ================================
    // Recherche panne
    // ================================
    const [selectedPanne, setSelectedPanne] = useState(null)
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filteredPannes = pannes
        .filter(p => p.nom.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => a.id - b.id);

    const handleSelectPanne = (panne) => {
        setSelectedPanne(panne);
        setSearchQuery(panne.nom);
        setShowSuggestions(false);
    };
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setShowSuggestions(true);
        if (!e.target.value) setSelectedPanne(null); // reset propre
    };
    const interventionsDePanne = selectedPanne
        ? interventions.filter(i => i.idPanneDeIntervention === selectedPanne.id)
        : [];
    console.log("Machines", machines)
    console.log("Utilsateurs", utilisateurs)
    return(
        <div className="space-y-6">
            <div className="flex gap-4">
                <img src={iconeIntervention} alt="Icone Intervention" width="40" className="cursor-pointer"/>
                <img src={iconeModification} alt="Modification panne" width="40" className="cursor-pointer"
                onClick={() => setView("modification")} />
                <img src={iconeAjout} alt="Ajout panne" width="40" className="cursor-pointer"
                onClick={() => setView("ajout")}/>
                <img src={iconeSupression} alt="Supression panne" width="40" className="cursor-pointer"
                onClick={() => setView("supression")}/>
            </div>

            {/* Recherche panne */}
            <div className="relative w-80">
                <h3>Nom de la panne :</h3>
                <input
                    type="text"
                    placeholder="Rechercher une panne..."
                    className="border-2 rounded border-slate-900 w-full px-2 py-1"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                />
                {showSuggestions && searchQuery && (
                    <ul className="absolute z-10 w-full bg-slate-900 border border-slate-700 rounded mt-1 max-h-48 overflow-y-auto">
                        {filteredPannes.length > 0 ? (
                            filteredPannes.map(panne => (
                                <li
                                    key={panne.id}
                                    className="px-3 py-2 cursor-pointer hover:bg-slate-700 text-white"
                                    onMouseDown={() => handleSelectPanne(panne)}
                                >
                                    {panne.nom}
                                </li>
                            ))
                        ) : (
                            <li className="px-3 py-2 text-slate-400 italic">Aucune panne trouvée</li>
                        )}
                    </ul>
                )}
            </div>

            {/* Tableau des interventions */}
            {selectedPanne && (
                <div>
                    <h3 className="mb-2">
                        Interventions associées à <span className="font-semibold">{selectedPanne.nom}</span>
                        {" "}({interventionsDePanne.length})
                    </h3>
                    {interventionsDePanne.length === 0 ? (
                        <p className="text-slate-400 italic">Aucune intervention pour cette panne.</p>
                    ) : (
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-slate-800 text-left">
                                    <th className="border border-slate-600 px-3 py-2">Nom</th>
                                    <th className="border border-slate-600 px-3 py-2">Description</th>
                                    <th className="border border-slate-600 px-3 py-2">Date début</th>
                                    <th className="border border-slate-600 px-3 py-2">Date fin</th>
                                    <th className="border border-slate-600 px-3 py-2">Durée (min)</th>
                                    <th className="border border-slate-600 px-3 py-2">Machine en panne</th>
                                    <th className="border border-slate-600 px-3 py-2">Intervenant</th>
                                </tr>
                            </thead>
                            <tbody>
                                {interventionsDePanne.map(i => (
                                    <tr key={i.idIntervention} className="hover:bg-slate-800">
                                        <td className="border border-slate-600 px-3 py-2">{i.nomIntervention}</td>
                                        <td className="border border-slate-600 px-3 py-2">{i.descriptionIntervention}</td>
                                        <td className="border border-slate-600 px-3 py-2">{i.dateDebutIntervention ? new Date(i.dateDebutIntervention).toLocaleString("fr-FR") : "-"}</td>
                                        <td className="border border-slate-600 px-3 py-2">{i.dateFinIntervention ? new Date(i.dateFinIntervention).toLocaleString("fr-FR") : "-"}</td>
                                        <td className="border border-slate-600 px-3 py-2">{i.dureeIntervention ?? "—"}</td>
                                        <td className="border border-slate-600 px-3 py-2">{machines.find(m => m.id === pannes.find(p => p.id === i.idPanneDeIntervention)?.idMachineEnPanne)?.nom ?? "—"}</td>
                                        <td className="border border-slate-600 px-3 py-2">{utilisateurs.find(u => u.idUtilisateur === i.idUtilisateurIntervenant)?.nomUtilisateur ?? "—"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    )
}export default SelectionIntervention