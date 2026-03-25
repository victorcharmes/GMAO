import { useState } from "react"
import iconeFlecheEnArriere from "../style/iconeFlecheEnArriere.svg"

function ModificationPanne({
    pannes=[], 
    loadPannes,
    etatPannes=[],
    urgencePannes=[], 
    setView
    }){

    const initialPanneState = {
        id: "",
        nom: "",
        description: "",
        dateDebut: "",
        dateFin:"",
        tpsArret:"",
        tpsReparation:"",
        idUrgence:"",
        idEtatPanne:"",
        nomUtilisateurDemandeur:"",
        nomMachineEnPanne:""
    };

    const [editedPanne, setEditedPanne] = useState(initialPanneState);
    const [showPopup, setShowPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // ================================
    // Recherche panne
    // ================================
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filteredPannes = pannes
        .filter(p => p.nom.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => a.id - b.id);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setShowSuggestions(true);

        // Si le champ est vidé, réinitialiser la panne sélectionnée
        if (!e.target.value) {
            setEditedPanne(initialPanneState);
        }
    };

    const handleSelectPanne = (panne) => {
        setSearchQuery(panne.nom);
        setShowSuggestions(false);

        setEditedPanne({
            ...panne,
            idUrgence: panne.idUrgence,
            idEtatPanne: panne.idEtatPanne,
            idUtilisateurDemandeur: panne.idUtilisateurDemandeur,
            idMachineEnPanne: panne.idMachineEnPanne
        });
    };

    // ================================
    // Modification champs
    // ================================

    const numericFields = [
        "idUrgence",
        "idEtatPanne",
        "idUtilisateurDemandeur",
        "idMachineEnPanne"
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedPanne(prev => ({
            ...prev,
            [name]: numericFields.includes(name) ? Number(value) : value
        }));
    };

    // ================================
    // VALIDATION + PUT
    // ================================

    const handleSubmit = async () => {
        if (!editedPanne.id) {
            setErrorMessage("❌ Veuillez sélectionner une panne");
            return;
        }

        const requiredFields = [
            { key: "description", label: "Description de la panne" },
            { key: "dateDebut", label: "Date de début de la panne" },
            { key: "idUrgence", label: "Urgence de la panne" },
            { key: "idEtatPanne", label: "État de la panne" }
        ];

        for (let field of requiredFields) {
            const value = editedPanne[field.key];
            if (value === "" || value === null || value === undefined) {
                setErrorMessage(`❌ Veuillez compléter : ${field.label}`);
                return;
            }
        }

        try {
            const response = await fetch(
                `http://localhost:8081/panne/${editedPanne.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(editedPanne)
                }
            );

            if (!response.ok) throw new Error("Erreur serveur");

            await response.json();
            await loadPannes();

            setShowPopup(true);
            setEditedPanne(initialPanneState);
            setSearchQuery("");

            setTimeout(() => setShowPopup(false), 1500);

        } catch (error) {
            setErrorMessage("❌ Erreur lors de la modification");
        }
    };

    return(
        <div className="flex gap-10">
            {/* COLONNE 1 */}
            <div className="w-1/3 space-y-6">
                <div className="flex gap-4 items-center">
                    <img
                        src={iconeFlecheEnArriere}
                        alt="Retour"
                        width="40"
                        className="cursor-pointer"
                        onClick={() => setView("selection")}
                    />
                    <h1 className="text-xl font-bold">
                        Modification d'une panne :
                    </h1>
                </div>

                {/* Recherche panne */}
                <div className="relative">
                    <h3>Nom de la panne :</h3>
                    <input
                        type="text"
                        placeholder="Rechercher une panne..."
                        className="border-2 rounded border-slate-900 w-full px-2 py-1 max-w-75" 
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    />

                    {/* Liste de suggestions */}
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
                                <li className="px-3 py-2 text-slate-400 italic">
                                    Aucune panne trouvée
                                </li>
                            )}
                        </ul>
                    )}
                </div>

                {/* Description */}
                <div>
                    <h3>Description :</h3>
                    <input
                        name="description"
                        className="border-2 rounded border-slate-900 w-full max-w-75"
                        value={editedPanne.description || ""}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Urgence */}
                <div>
                    <h3>Urgence :</h3>
                    <select
                        name="idUrgence"
                        className="border-2 rounded border-slate-900 w-full text-white max-w-75"
                        value={editedPanne.idUrgence}
                        onChange={handleInputChange}
                    >
                        <option value="" className="bg-slate-900">-- Sélectionner --</option>
                        {urgencePannes.map(u => (
                            <option key={u.idUrgencePanne} value={u.idUrgencePanne} className="bg-slate-900">
                                {u.urgencePanne}
                            </option>
                        ))}
                    </select>
                </div>

                {/* État panne */}
                <div>
                    <h3>État panne :</h3>
                    <select
                        name="idEtatPanne"
                        className="border-2 rounded border-slate-900 w-full text-white max-w-75"
                        value={editedPanne.idEtatPanne}
                        onChange={handleInputChange}
                    >
                        <option value="" className="bg-slate-900">-- Sélectionner --</option>
                        {etatPannes.map(e => (
                            <option key={e.idEtatPanne} value={e.idEtatPanne} className="bg-slate-900">
                                {e.etatPanne}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {/* ================= COLONNE 2 ================= */}
            <div className="w-1/3 flex flex-col gap-6">
                {/* Date de début  */}
                <div>
                    <h3>Date de début :</h3>
                    <input
                        type = "datetime-local"
                        name="dateDebut"
                        className="border-2 rounded border-slate-900 w-full max-w-75"
                        value={editedPanne.dateDebut || ""}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            {/* ================= COLONNE 3 ================= */}
            <div className="w-1/3">
                {/* Date de fin  */}
                <div>
                    <h3>Date de fin :</h3>
                    <input
                        type = "datetime-local"
                        name="dateFin"
                        className="border-2 rounded border-slate-900 w-full max-w-75"
                        value={editedPanne.dateFin || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-green-600 text-white disabled:bg-gray-400 rounded"
                disabled={!editedPanne.id}
                >
                    Valider
                </button>
            </div>
            
            {/* Popup succès */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-slate-600 bg-opacity-40 z-50">
                <div className="bg-white px-8 py-6 rounded-xl shadow-xl text-lg font-semibold text-green-600">
                    ✅ Modifications prises en compte
                </div>
                </div>
            )}
            {/* Popup erreur */}
            {errorMessage && (
                <div className="fixed inset-0 flex items-center justify-center bg-slate-600 bg-opacity-40 z-50">
                <div className="bg-white px-8 py-6 rounded-xl shadow-xl text-lg font-semibold text-red-600 text-center">
                    {errorMessage}
                    <div className="mt-4">
                    <button
                        onClick={() => setErrorMessage("")}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                        OK
                    </button>
                    </div>
                </div>
                </div>
            )}
        </div>
    )
}

export default ModificationPanne