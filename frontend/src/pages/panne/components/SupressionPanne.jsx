import { useState } from "react"
import iconeFlecheEnArriere from "../style/iconeFlecheEnArriere.svg"

function SupressionPanne({
    pannes=[], 
    loadPannes,
    setView
    }){

    const [selectedId, setSelectedId] = useState("");
    const [selectedPanne, setSelectedPanne] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // ================================
    // Sélection d'une panne
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
            setSelectedPanne(null);
            setSelectedId("");
        }
    };

    const handleSelectPanne = (panne) => {
        setSelectedId(panne.id);
        setSelectedPanne(panne);
        setSearchQuery(panne.nom);
        setShowSuggestions(false);

        console.log("Panne sélectionnée :", panne);
    };

    // Demande confirmation
    const handleDeleteClick = () => {
        if (!selectedId) {
        setErrorMessage("❌ Veuillez sélectionner une panne");
        return;
        }

        setShowConfirmPopup(true);
    };

    // Suppression réelle
    const confirmDelete = async () => {

        try {
        const response = await fetch(
            `http://localhost:8081/panne/${selectedId}`,
            { method: "DELETE" }
        );

        if (!response.ok) {
            throw new Error("Erreur serveur");
        }

        await loadPannes();

        setShowConfirmPopup(false);
        setShowPopup(true);
        setSelectedId("");
        setSelectedPanne(null);

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
                    Supression d'une panne :
                </h1>
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

                <button
                    onClick={handleDeleteClick}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
                >
                    Supprimer
                </button>
                </div>
            </div>

        {/* Popup confirmation */}
        {showConfirmPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-slate-600 bg-opacity-40 z-50">
                <div className="bg-white px-8 py-6 rounded-xl shadow-xl text-lg text-center text-black">
                    <p className="font-semibold mb-4">
                        ⚠️ Voulez-vous supprimer la panne :
                        <br />
                        <span className="text-red-600">
                            {selectedPanne?.nom}
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
                    ✅ Panne supprimée
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
}export default SupressionPanne