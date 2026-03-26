import { useState } from "react"
import iconeFlecheEnArriere from "../style/iconeFlecheEnArriere.svg"

function AjoutPanne({
    pannes=[], 
    loadPannes,
    etatPannes=[],
    urgencePannes=[], 
    machines=[],
    utilisateurs=[],
    setView
    }){
    // ================================
    // STATES
    // ================================

    // Popup succès
    const [showPopup, setShowPopup] = useState(false)

    // Message d'erreur
    const [errorMessage, setErrorMessage] = useState("")

    // Etat initial du formulaire
    const initialState = {
        id: "",
        nom: "",
        description: "",
        dateDebut: "",
        dateFin:"",
        tpsArret:"",
        tpsReparation:"",
        idUrgence:"",
        idEtatPanne:"",
        idUtilisateurDemandeur:"",
        idMachineEnPanne:""
    };

    // Panne en cours de création
    const [newPanne, setNewPanne] = useState(initialState)
        
    // ================================
    // VALIDATION + ENVOI POST
    // ================================
    const handleSubmit = async () => {

        // Liste des champs obligatoires
        const requiredFields = [
            { key: "idMachineEnPanne", label: "Nom de la machine en panne" },
            { key: "description", label: "Description de la panne" },
            { key: "dateDebut", label: "Date de début de la panne" },
            { key: "idUrgence", label: "Urgence de la panne" },
            { key: "idEtatPanne", label: "État de la panne" },
            { key: "idUtilisateurDemandeur", label: "Saisir votre identité" }
        ];

        // Vérification des champs vides
        for (let field of requiredFields) {
        if (!newPanne[field.key] || newPanne[field.key].toString().trim() === "") {
            setErrorMessage(`❌ Veuillez compléter le champ : ${field.label}`);
            return;
        }
        }
        // Envoi POST vers le backend
        try {
        console.log(newPanne)
        const response = await fetch("http://localhost:8081/panne", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(newPanne)
        });

        if (!response.ok) throw new Error("Erreur serveur");

        await response.json();

        // Recharge la liste des pannes dans le composant parent
        await loadPannes();

        // Affichage popup succès
        setShowPopup(true);
        // Reset formulaire
        setNewPanne(initialState);

        // Disparition automatique popup
        setTimeout(() => {
            setShowPopup(false);
        }, 1500);

        } catch (error) {
        // Gestion erreur backend
        setErrorMessage("❌ Erreur lors de l'enregistrement");
        }
    }
        const handleChange = (e) => {
            const { name, value } = e.target

            setNewPanne(prev => ({
            ...prev,
            [name]: value
            }))

            console.log(name + " :", value)
        }

    // ================================
    // RENDER
    // ================================
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
                    Ajout d'une panne :
                </h1>
                </div>

                {/* Nom machine */}
                <div>
                    <h3>Nom de la machine en panne :</h3>
                    <select
                        name="idMachineEnPanne"
                        className="border-2 rounded border-slate-900 w-full text-white max-w-75"
                        value={newPanne.idMachineEnPanne}
                        onChange={handleChange}
                    >
                        <option value="" className="bg-slate-900">-- Sélectionner --</option>
                        {machines.map(m => (
                            <option key={m.id} value={m.id} className="bg-slate-900">
                                {m.nom}
                            </option>
                        ))}
                    </select>
                </div>
                
                {/* Description */}
                <div>
                    <h3>Description :</h3>
                    <textarea
                        name="description"
                        className="border-2 rounded border-slate-900 w-full text-white max-w-75"
                        value={newPanne.description}
                        onChange={handleChange}
                    />
                </div>

                {/* Urgence */}
                <div>
                    <h3>Urgence :</h3>
                    <select
                        name="idUrgence"
                        className="border-2 rounded border-slate-900 w-full text-white max-w-75"
                        value={newPanne.idUrgence}
                        onChange={handleChange}
                    >
                        <option value="" className="bg-slate-900">-- Sélectionner --</option>
                        {urgencePannes.map(u => (
                            <option key={u.idUrgencePanne} value={u.idUrgencePanne } className="bg-slate-900">
                                {u.urgencePanne + ": " + u.descriptionUrgencePanne}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Etat Panne */}
                <div>
                    <h3>État panne :</h3>
                    <select
                        name="idEtatPanne"
                        className="border-2 rounded border-slate-900 w-full text-white max-w-75"
                        value={newPanne.idEtatPanne}
                        onChange={handleChange}
                    >
                        <option value="" className="bg-slate-900">-- Sélectionner --</option>
                        {etatPannes.map(e => (
                            <option key={e.idEtatPanne} value={e.idEtatPanne } className="bg-slate-900">
                                {e.etatPanne + ": " + e.descriptionEtatPanne}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Utilisateur */}
                <div>
                    <h3>Saisir votre identité :</h3>
                    <select
                        name="idUtilisateurDemandeur"
                        className="border-2 rounded border-slate-900 w-full text-white max-w-75"
                        value={newPanne.idUtilisateurDemandeur}
                        onChange={handleChange}
                    >
                        <option value="" className="bg-slate-900">-- Sélectionner --</option>
                        {utilisateurs.map(u => (
                            <option key={u.idUtilisateur} value={u.idUtilisateur } className="bg-slate-900">
                                {u.nomUtilisateur}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {/* ================= COLONNE 2 ================= */}
            <div className="w-1/3 flex flex-col gap-6">
            {/* Date de début */}
                <div>
                    <h3>Date de début :</h3>
                    <input
                        type = "datetime-local"
                        name="dateDebut"
                        className="border-2 rounded border-slate-900 w-full text-white max-w-75"
                        value={newPanne.dateDebut}
                        onChange={handleChange}
                    />
                </div>
            </div>
            {/* ================= COLONNE 3 ================= */}
            <div className="w-1/3">
                <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
                >
                Valider
                </button>
            </div>

            {/* Popup scuccès */}
            {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-slate-600 bg-opacity-40 z-50">
                <div className="bg-white px-8 py-6 rounded-xl shadow-xl text-lg font-semibold text-green-600">
                ✅ Machine ajouté
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
}export default AjoutPanne