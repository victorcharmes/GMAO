import { useState } from "react"
import iconeFlecheEnArriere from "../style/iconeFlecheEnArriere.svg"

function ModificationPanne({
    pannes=[], 
    loadPannes,
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
    nomUrgence:"",
    nomEtatPanne:"",
    nomUtilisateurDemandeur:"",
    nomMachineEnPanne:""
    };
    const [editedPanne, setEditedPanne] = useState(initialPanneState);
    const [showPopup, setShowPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // ================================
    // Sélection panne
    // ================================

    const handleSelectPanne = (e) => {

        const id = Number(e.target.value);
        const panne = pannes.find(p => p.id === id);

        if (!panne) {
        setEditedPanne(initialPanneState);
        return;
        }

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
        [name]: numericFields.includes(name)
            ? Number(value)
            : value
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
        { key: "description", label: "Description" },
        { key: "dateDebut", label: "DateDebut" },
        { key: "dateFin", label: "DateFin" },
        { key: "nomUrgence", label: "NomUrgence" },
        { key: "nomEtatPanne", label: "NomEtatPanne" }
        ];

        for (let field of requiredFields) {

        if (!editedPanne[field.key]) {

            setErrorMessage(`❌ Veuillez compléter : ${field.label}`);
            return;

        }
        }

        try {

        const response = await fetch(
            `http://localhost:8081/panne/${editedPanne.id}`,
            {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedPanne)
            }
        );

        if (!response.ok) throw new Error("Erreur serveur");

        await response.json();
        await loadPannes();

        setShowPopup(true);
        setEditedPanne(initialPanneState);

        setTimeout(() => {
            setShowPopup(false);
        }, 1500);

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
            {/* Sélection panne */}
            <div>
                <h3>Nom de la panne :</h3>
                <select
                className="border-2 rounded border-slate-900 w-full text-white"
                value={editedPanne.id || ""}
                onChange={handleSelectPanne}
                >
                <option value="" className="bg-slate-900">-- Choisir une panne --</option>

                {pannes.map(panne => (
                    <option key={panne.id} value={panne.id} className="bg-slate-900">
                    {panne.nom}
                    </option>
                ))}
                </select>
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
                className="border-2 rounded border-slate-900 w-full text-white"
                value={editedPanne.idUrgence}
                onChange={handleInputChange}
                >
                <option value="" className="bg-slate-900">-- Sélectionner --</option>

                {urgencePannes.map(u => (
                    <option
                    key={u.idUrgencePanne}
                    value={u.idUrgencePanne}
                    className="bg-slate-900"
                    >
                    {u.urgencePanne}
                    </option>
                ))}
                </select>
            </div>
            {/* Urgence */}
            <div>
                <h3>État panne :</h3>
                <select
                name="idEtatPanne"
                className="border-2 rounded border-slate-900 w-full text-white"
                value={editedPanne.idEtatPanne}
                onChange={handleInputChange}
                >
                <option value="" className="bg-slate-900">-- Sélectionner --</option>

                {urgencePannes.map(u => (
                    <option
                    key={u.idUrgencePanne}
                    value={u.idUrgencePanne}
                    className="bg-slate-900"
                    >
                    {u.urgencePanne}
                    </option>
                ))}
                </select>
            </div>
            </div>
        </div>
    )
}export default ModificationPanne