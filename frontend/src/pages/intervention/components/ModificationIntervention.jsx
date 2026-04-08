import { useState } from "react"
import iconeFlecheEnArriere from "../style/iconeFlecheEnArriere.svg"

function ModificationIntervention({
    interventions=[],
    loadInterventions, 
    setView
    }){

    const initialInterventionState={
        idIntervention: "",
        descriptionIntervention: "",
        dateDebutIntervention: "",
        dateFinIntervention: "",
        dureeIntervention: ""
    }

    const [editedIntervention, setEditedIntervention] = useState(initialInterventionState);
    const [showPopup, setShowPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    // ================================
    // Recherche intervention
    // ================================
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filteredInterventions = interventions
        .filter(p => p.nomIntervention.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => a.idIntervention - b.idIntervention);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setShowSuggestions(true);

        // Si le champ est vidInterventioné, réinitialiser l'intervention sélectionnée
        if (!e.target.value) {
            setEditedIntervention(initialInterventionState);
        }
    };

    const handleSelectIntervention = (intervention) => {
        setSearchQuery(intervention.nomIntervention);
        setShowSuggestions(false);

        setEditedIntervention({
            ...intervention,
            idIntervention: intervention.idIntervention
        });
    };

    // ================================
    // Modification champs
    // ================================

    const numericFields = [
        "idIntervention"
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedIntervention(prev => ({
            ...prev,
            [name]: numericFields.includes(name) ? Number(value) : value
        }));
    };
    // ================================
    // VALIDATION + PUT
    // ================================

    const handleSubmit = async () => {
        if (!editedIntervention.idIntervention) {
            setErrorMessage("❌ Veuillez sélectionner une intervention");
            return;
        }

        const requiredFields = [
            { key: "descriptionIntervention", label: "Description de l'intervention" },
            { key: "dateDebutIntervention", label: "Date de début de l'intervention'" },
            { key: "dateFinIntervention", label: "Date de fin de l'intervention" }
        ];

        for (let field of requiredFields) {
            const value = editedIntervention[field.key];
            if (value === "" || value === null || value === undefined) {
                setErrorMessage(`❌ Veuillez compléter : ${field.label}`);
                return;
            }
        }

        try {
            const response = await fetch(
                `http://localhost:8081/intervention/${editedIntervention.idIntervention}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(editedIntervention)
                }
            );

            if (!response.ok) throw new Error("Erreur serveur");

            await response.json();
            await loadInterventions();

            setShowPopup(true);
            setEditedIntervention(initialInterventionState);
            setSearchQuery("");

            setTimeout(() => setShowPopup(false), 1500);

        } catch (error) {
            setErrorMessage("❌ Erreur lors de la modification");
        }
        console.log("Intervention modif: ", editedIntervention)
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
                        Modification d'une intervention :
                    </h1>
                </div>
                {/* Recherche intervention */}
                <div className="relative">
                    <h3>Nom de la intervention :</h3>
                    <input
                        type="text"
                        placeholder="Rechercher une intervention..."
                        className="border-2 rounded border-slate-900 w-full px-2 py-1 max-w-75" 
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    />

                    {/* Liste de suggestions */}
                    {showSuggestions && searchQuery && (
                        <ul className="absolute z-10 w-full bg-slate-900 border border-slate-700 rounded mt-1 max-h-48 overflow-y-auto">
                            {filteredInterventions.length > 0 ? (
                                filteredInterventions.map(intervention => (
                                    <li
                                        key={intervention.idIntervention}
                                        className="px-3 py-2 cursor-pointer hover:bg-slate-700 text-white"
                                        onMouseDown={() => handleSelectIntervention(intervention)}
                                    >
                                        {intervention.nomIntervention}
                                    </li>
                                ))
                            ) : (
                                <li className="px-3 py-2 text-slate-400 italic">
                                    Aucune intervention trouvée
                                </li>
                            )}
                        </ul>
                    )}
                </div>
                {/* Description */}
                <div>
                    <h3>Description :</h3>
                    <input
                        name="descriptionIntervention"
                        className="border-2 rounded border-slate-900 w-full max-w-75"
                        value={editedIntervention.descriptionIntervention || ""}
                        onChange={handleInputChange}
                    />
                </div>
                {/* Date de début  */}
                <div>
                    <h3>Date de début :</h3>
                    <input
                        type = "datetime-local"
                        name="dateDebutIntervention"
                        className="border-2 rounded border-slate-900 w-full max-w-75"
                        value={editedIntervention.dateDebutIntervention || ""}
                        onChange={handleInputChange}
                    />
                </div>
                {/* Date de fin  */}
                <div>
                    <h3>Date de début :</h3>
                    <input
                        type = "datetime-local"
                        name="dateFinIntervention"
                        className="border-2 rounded border-slate-900 w-full max-w-75"
                        value={editedIntervention.dateFinIntervention || ""}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
                        {/* ================= COLONNE 2 ================= */}
            <div className="w-1/3 flex flex-col gap-6">
                <h3>Durée d'intervention :</h3>
                <p className="border-2 rounded border-slate-900 w-full max-w-75">Modifié automatiquement</p>

            </div>
            {/* ================= COLONNE 3 ================= */}
            <div className="w-1/3">
                <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-green-600 text-white disabled:bg-gray-400 rounded"
                disabled={!editedIntervention.idIntervention}
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
}export default ModificationIntervention