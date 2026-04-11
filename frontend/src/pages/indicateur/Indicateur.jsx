import { useEffect, useState } from "react"
import { getMachines, getCriticite, getUR } from "./service/indicateurApi"
import Navbar from "../../components/Navbar"
import iconeIndicateur from "./style/iconeIndicateur.svg";
import iconeCriticite from "./style/iconeCriticite.svg";
import iconeUR from "./style/iconeUR.svg";

const TYPES_INDICATEUR = [
    { value: "machine", label: "Machine" },
    { value: "criticite", label: "Criticité Machine" },
    { value: "ur", label: "UR" },
]

export default function Indicateur(){
    // ================================
    // STATES PRINCIPAUX
    // ================================

    // Liste complète des machines
    const [machines, setMachines] = useState([])
    const [criticites, setCriticites] = useState([])
    const [urs, setURs] = useState([])
    const [typeIndicateur, setTypeIndicateur] = useState("")
    const [selectedItem, setSelectedItem] = useState("")

    // Popup succès
    const [showPopup, setShowPopup] = useState(false)

    // Message d'erreur
    const [errorMessage, setErrorMessage] = useState("")

    // Indicateurs en cours de demande
    const [newIndicateur, setNewIndicateur] = useState("")

    // ================================
    // CHARGEMENT DES DONNEES 
    // ================================

    const loadMachine = async () => {
        const data = await getMachines();
        setMachines(data);
    };
    const loadCriticite = async () => {
        const data = await getCriticite();
        setCriticites(data);
    };
    const loadUR = async () => {
        const data = await getUR();
        setURs(data);
    };

    // ================================
    // CHARGEMENT INITIAL AU MONTAGE
    // ================================
    useEffect(() => {
        loadMachine();
        loadCriticite();
        loadUR();
    }, []);

    const getOptions = () => {
        switch (typeIndicateur) {
            case "machine":
                return machines.map((m) => ({ value: m.id, label: m.nom }))
            case "criticite":
                return criticites.map((c) => ({ value: c.idCriticiteMachine, label: c.criticiteMachine }))
            case "ur":
                return urs.map((u) => ({ value: u.idUr, label: u.nomUr }))
            default:
                return []
        }
    }

    const handleTypeChange = (e) => {
        setTypeIndicateur(e.target.value)
        setSelectedItem("")
        setNewIndicateur(prev => ({
            ...prev,
            typeDesIndicateur: e.target.value,
            porteeIndicateur: ""
        }))
    }

    // ================================
    // VALIDATION + ENVOI POST
    // ================================
    const handleSubmit = async () => {

        // Liste des champs obligatoires
        const requiredFields = [
            { key: "typeDesIndicateur", label: "Type d'indicateur à réaliser" },
            { key: "porteeIndicateur", label: "Portée des indicateurs" },
            { key: "dateDebut", label: "Date de début des indicateurs" },
            { key: "dateFin", label: "Date de fin des indicateurs" }
        ];

        // Vérification des champs vides
        for (let field of requiredFields) {
        if (!newIndicateur[field.key] || newIndicateur[field.key].toString().trim() === "") {
            setErrorMessage(`❌ Veuillez compléter le champ : ${field.label}`);
            return;
        }
        }
        // Envoi POST vers le backend
        try {
        console.log(newIndicateur)
        const response = await fetch("http://localhost:8081/indicateur", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(newIndicateur)
        });

        if (!response.ok) throw new Error("Erreur serveur");

        await response.json();

        // Affichage popup succès
        setShowPopup(true);

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

            setNewIndicateur(prev => ({
            ...prev,
            [name]: value
            }))

            console.log(name + " :", value)
        }

    // ================================
    // RENDER
    // ================================
    return(
        <div className="min-h-screen text-white" >
        <Navbar/>
            <div className="mt-20 px-10">
                <div className="flex gap-10">
                    {/* COLONNE 1 */}
                    <div className="w-1/2 space-y-6">
                        <div className="flex gap-4 items-center">
                            <img src={iconeIndicateur} alt="Icone Indicateur" width="40" className="cursor-pointer"/>
                            <h1 className="text-2xl">Mise en forme des indicateurs</h1>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <h3 className="mb-1">Moyen de visualisation des indicateurs :</h3>
                                <select
                                    value={typeIndicateur}
                                    name="typeDesIndicateur" 
                                    onChange={handleTypeChange}
                                    className="border-2 rounded border-slate-900 w-full text-white max-w-75"
                                >
                                    <option value="" className="bg-slate-900">-- Sélectionner un type --</option>
                                    {TYPES_INDICATEUR.map((type) => (
                                        <option 
                                            onChange={handleChange} 
                                            className="bg-slate-900" 
                                            key={type.value} 
                                            value={type.value}>{type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {typeIndicateur && (
                                <>
                                    <div>
                                        <h3 className="mb-1">Sélection de la portée des indicateurs :</h3>
                                        <select
                                            value={selectedItem}
                                            name="porteeIndicateur"
                                            onChange={(e) => { setSelectedItem(e.target.value); handleChange(e); }}
                                            className="border-2 rounded border-slate-900 w-full text-white max-w-75"
                                        >
                                            <option value="" className="bg-slate-900">-- Sélectionner --</option>
                                            {getOptions().map((opt) => (
                                                <option
                                                    className="bg-slate-900"
                                                    key={opt.value} value={opt.value}>{opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <h3 className="mb-1">Date de début :</h3>
                                        <input
                                            type="datetime-local"
                                            name="dateDebut"
                                            className="border-2 rounded border-slate-900 w-full text-white max-w-75"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="mb-1">Date de fin :</h3>
                                        <input
                                            type="datetime-local"
                                            name="dateFin"
                                            className="border-2 rounded border-slate-900 w-full text-white max-w-75"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>            
                </div>
                {/* ================= COLONNE 2 ================= */}
                <div className="w-1/3 flex flex-col gap-6">
                    <button
                        onClick={handleSubmit}
                        className="max-w-75 mt-4 px-4 py-2 bg-green-600 text-white rounded"
                        >
                        Valider
                    </button>
                    {/* Popup scuccès */}
                    {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-slate-600 bg-opacity-40 z-50">
                        <div className="bg-white px-8 py-6 rounded-xl shadow-xl text-lg font-semibold text-green-600">
                        ✅ Indicateur en cours de création ...
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
            </div>
        </div>
    </div>
    )
}