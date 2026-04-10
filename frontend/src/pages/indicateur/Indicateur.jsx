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
    }

    return(
        <div className="min-h-screen text-white" >
        <Navbar/>
            <div className="mt-20 px-10">
                <div className="flex gap-10">
                    {/* COLONNE 1 */}
                    <div className="w-1/3 space-y-6">
                        <div className="flex gap-4 items-center"></div>
                            <img src={iconeIndicateur} alt="Icone Indicateur" width="40" className="cursor-pointer"/>
                            
                            <h3> Moyen de visualisation des indicateurs : </h3>
                            <select
                                value={typeIndicateur}
                                onChange={handleTypeChange}
                                className="border-2 rounded border-slate-900 w-full text-white max-w-75"
                            >
                                <option value="" className="bg-slate-900">-- Sélectionner un type --</option>
                                {TYPES_INDICATEUR.map((type) => (
                                    <option className="bg-slate-900" key={type.value} value={type.value}>{type.label}</option>
                                ))}
                            </select>

                            {typeIndicateur && (
                                <div>
                                    <h3>Sélection de la portée des indicateurs: </h3>
                                    <select
                                        value={selectedItem}
                                        onChange={(e) => setSelectedItem(e.target.value)}
                                        className="border-2 rounded border-slate-900 w-full  text-white mt-4 max-w-75"
                                    >
                                        <option value="" className="bg-slate-900">-- Sélectionner --</option>
                                        {getOptions().map((opt) => (
                                            <option className="bg-slate-900" key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                    </div>
                </div>            
            </div>
        </div>
    )
}