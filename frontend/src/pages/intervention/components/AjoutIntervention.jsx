import { useState } from "react";
import iconeFlecheEnArriere from "../style/iconeFlecheEnArriere.svg"

function AjoutIntervention({
    loadInterventions, 
    pannes=[],
    utilisateurs=[],
    setView
    }){
    const [showPopup, setShowPopup] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const initialState = {
        idIntervention: "",
        nomIntervention: "",
        descriptionIntervention: "",
        dateDebutIntervention: "",
        dateFinIntervention: "",
        dureeIntervention: "",
        idPanneDeIntervention: "",
        idUtilisateurIntervenant: ""
    };

    const [newIntervention, setNewIntervention] = useState(initialState)

    // ================================
    // Recherche panne (autocomplete)
    // ================================
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filteredPannes = pannes
        .filter(p => p.nom.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => a.id - b.id);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setShowSuggestions(true);
        if (!e.target.value) {
            setNewIntervention(prev => ({ ...prev, idPanneDeIntervention: "" }));
        }
    };

    const handleSelectPanne = (panne) => {
        setSearchQuery(panne.nom);
        setShowSuggestions(false);
        setNewIntervention(prev => ({ ...prev, idPanneDeIntervention: panne.id }));
    };

    // ================================
    // VALIDATION + ENVOI POST
    // ================================
    const handleSubmit = async () => {
        const requiredFields = [
            { key: "idPanneDeIntervention", label: "Saisir la panne associée à cette intervention" },
            { key: "descriptionIntervention", label: "Description de l'intervention" },
            { key: "dateDebutIntervention", label: "Date de début de l'intervention" },
            { key: "dateFinIntervention", label: "Date de fin de l'intervention" },
            { key: "idUtilisateurIntervenant", label: "Saisir votre identité" }
        ];

        for (let field of requiredFields) {
            if (!newIntervention[field.key] || newIntervention[field.key].toString().trim() === "") {
                setErrorMessage(`❌ Veuillez compléter le champ : ${field.label}`);
                return;
            }
        }

        try {
            const response = await fetch("http://localhost:8081/intervention", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newIntervention)
            });

            if (!response.ok) throw new Error("Erreur serveur");
            await response.json();
            await loadInterventions();

            setShowPopup(true);
            setNewIntervention(initialState);
            setSearchQuery("");
            setTimeout(() => setShowPopup(false), 1500);

        } catch (error) {
            setErrorMessage("❌ Erreur lors de l'enregistrement");
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewIntervention(prev => ({ ...prev, [name]: value }))
    }

    return(
        <div className="flex gap-10">
            {/* COLONNE 1 */}
            <div className="w-1/2 space-y-6">
                <div className="flex gap-4 items-center">
                    <img src={iconeFlecheEnArriere} alt="Retour" width="40"
                        className="cursor-pointer" onClick={() => setView("selection")} />
                    <h1 className="text-xl font-bold">Ajout d'une intervention :</h1>
                </div>

                {/* Recherche panne */}
                <div className="relative">
                    <h3>Nom de la panne en lien avec l'intervention :</h3>
                    <input
                        type="text"
                        placeholder="Rechercher une panne..."
                        className="border-2 rounded border-slate-900 w-full px-2 py-1 max-w-75"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    />
                    {showSuggestions && searchQuery && (
                        <ul className="absolute z-10 w-full bg-slate-900 border border-slate-700 rounded mt-1 max-h-48 overflow-y-auto">
                            {filteredPannes.length > 0 ? (
                                filteredPannes.map(panne => (
                                    <li key={panne.id}
                                        className="px-3 py-2 cursor-pointer hover:bg-slate-700 text-white"
                                        onMouseDown={() => handleSelectPanne(panne)}>
                                        {panne.nom}
                                    </li>
                                ))
                            ) : (
                                <li className="px-3 py-2 text-slate-400 italic">Aucune panne trouvée</li>
                            )}
                        </ul>
                    )}
                </div>

                {/* Description */}
                <div>
                    <h3>Description de l'intervention :</h3>
                    <textarea name="descriptionIntervention"
                        className="border-2 rounded border-slate-900 w-full text-white max-w-75"
                        value={newIntervention.descriptionIntervention}
                        onChange={handleChange} />
                </div>

                {/* Date de début */}
                <div>
                    <h3>Date de début de l'intervention :</h3>
                    <input type="datetime-local" name="dateDebutIntervention"
                        className="border-2 rounded border-slate-900 w-full text-white max-w-75"
                        value={newIntervention.dateDebutIntervention}
                        onChange={handleChange} />
                </div>

                {/* Date de fin */}
                <div>
                    <h3>Date de fin de l'intervention :</h3>
                    <input type="datetime-local" name="dateFinIntervention"
                        className="border-2 rounded border-slate-900 w-full text-white max-w-75"
                        value={newIntervention.dateFinIntervention}
                        onChange={handleChange} />
                </div>
            </div>

            {/* COLONNE 2 */}
            <div className="w-1/3 flex flex-col gap-6">
                <div>
                    <h3>Saisir votre identité :</h3>
                    <select name="idUtilisateurIntervenant"
                        className="border-2 rounded border-slate-900 w-full text-white max-w-75"
                        value={newIntervention.idUtilisateurIntervenant}
                        onChange={handleChange}>
                        <option value="" className="bg-slate-900">-- Sélectionner --</option>
                        {utilisateurs.map(u => (
                            <option key={u.idUtilisateur} value={u.idUtilisateur} className="bg-slate-900">
                                {u.nomUtilisateur}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* COLONNE 3 */}
            <div className="w-1/3">
                <button onClick={handleSubmit}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded">
                    Valider
                </button>
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-slate-600 bg-opacity-40 z-50">
                    <div className="bg-white px-8 py-6 rounded-xl shadow-xl text-lg font-semibold text-green-600">
                        ✅ Intervention ajoutée
                    </div>
                </div>
            )}
            {errorMessage && (
                <div className="fixed inset-0 flex items-center justify-center bg-slate-600 bg-opacity-40 z-50">
                    <div className="bg-white px-8 py-6 rounded-xl shadow-xl text-lg font-semibold text-red-600 text-center">
                        {errorMessage}
                        <div className="mt-4">
                            <button onClick={() => setErrorMessage("")}
                                className="px-4 py-2 bg-red-500 text-white rounded">OK</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default AjoutIntervention