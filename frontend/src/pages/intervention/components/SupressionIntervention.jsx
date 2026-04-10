import { useState } from "react";
import iconeFlecheEnArriere from "../style/iconeFlecheEnArriere.svg"

function SuppressionIntervention({
    interventions=[],
    loadInterventions,
    setView
    }){

    const [selectedId, setSelectedId] = useState("");
    const [selectedIntervention, setSelectedIntervention] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // ================================
    // Sélection d'une intervention
    // ================================
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filteredInterventions = interventions
        .filter(i => i.nomIntervention.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => a.idIntervention - b.idIntervention);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setShowSuggestions(true);

        // Si le champ est vidé, réinitialiser la intervention sélectionnée
        if (!e.target.value) {
            setSelectedIntervention(null);
            setSelectedId("");
        }
    };

    const handleSelectIntervention = (intervention) => {
        setSelectedId(intervention.idIntervention);
        setSelectedIntervention(intervention);
        setSearchQuery(intervention.nomIntervention);
        setShowSuggestions(false);

        console.log("Intervention sélectionnée :", intervention);
    };

    // Demande confirmation
    const handleDeleteClick = () => {
        if (!selectedId) {
        setErrorMessage("❌ Veuillez sélectionner une intervention");
        return;
        }

        setShowConfirmPopup(true);
    };

    // Suppression réelle
    const confirmDelete = async () => {

        try {
        const response = await fetch(
            `http://localhost:8081/intervention/${selectedId}`,
            { method: "DELETE" }
        );

        if (!response.ok) {
            throw new Error("Erreur serveur");
        }

        await loadInterventions();

        setShowConfirmPopup(false);
        setShowPopup(true);
        setSelectedId("");
        setSelectedIntervention(null);
        setSearchQuery("");

        setTimeout(() => {
            setShowPopup(false);
        }, 1500);

        } catch (error) {
        setShowConfirmPopup(false);
        setErrorMessage("❌ Erreur lors de la suppression");
        }
    };

    return(
        <div className="flex gap-10">
            {/* COLONNE 1 */}
            <div className="w-1/2 space-y-6">
                <div className="flex gap-4 items-center">
                <img
                    src={iconeFlecheEnArriere}
                    alt="Retour"
                    width="40"
                    className="cursor-pointer"
                    onClick={() => setView("selection")}
                />
                <h1 className="text-xl font-bold">
                    Supression d'une intervention :
                </h1>
                </div>
                {/* Recherche intervention */}
                <div className="relative">
                    <h3>Nom de l'intervention :</h3>
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

                <button
                    onClick={handleDeleteClick}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
                >
                    Supprimer
                </button>
            </div>

        {/* Popup confirmation */}
        {showConfirmPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-slate-600 bg-opacity-40 z-50">
                <div className="bg-white px-8 py-6 rounded-xl shadow-xl text-lg text-center text-black">
                    <p className="font-semibold mb-4">
                        ⚠️ Voulez-vous supprimer l'intervention :
                        <br />
                        <span className="text-red-600">
                            {selectedIntervention?.nomIntervention}
                        </span> ?
                    </p>

                    <div className="flex justify-center gap-4 mt-4">
                        <button
                            onClick={confirmDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded"
                        >
                            Oui
                        </button>

                        <button
                            onClick={() => setShowConfirmPopup(false)}
                            className="px-4 py-2 bg-gray-400 text-white rounded"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Popup succès */}
        {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-slate-600 bg-opacity-40 z-50">
                <div className="bg-white px-8 py-6 rounded-xl shadow-xl text-lg font-semibold text-green-600">
                    ✅ Intervention supprimée
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
}export default SuppressionIntervention