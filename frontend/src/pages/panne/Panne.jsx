import { useEffect, useState, useCallback  } from "react"
import { getPannes } from "./service/panneApi"
import Navbar from "../../components/Navbar"
import SelectionPanne from "./components/SelectionPanne"
import SupressionPanne from "./components/SupressionPanne"
import AjoutPanne from "./components/AjoutPanne"
import ModificationPanne from "./components/ModificationPanne"

export default function Panne(){
    // Liste complète des pièces
    const[pannes, setPannes] = useState([])

    // Listes de référence (menus déroulants)
    
    //const [magasins, setMagasin] = useState([])
    
    // Vue active
    // "selection" | "modification" | "ajout" | "supression"
    const [view, setView] = useState("selection")

    // ================================
    // CHARGEMENT DES PIECES
    // ================================
    
    /*
    useCallback permet d'éviter
    de recréer la fonction à chaque render.
    */
    const loadPannes = useCallback(async () => {
        const data = await getPannes();
        console.log("LONGUEUR API :", data.length);
        console.log("DATA COMPLETE :", data);
        setPannes(data);
    }, []);
    // Debug du state pieces
    useEffect(() => {
        console.log("STATE MACHINES :", pannes.length);
    }, [pannes]);

    // ================================
    // CHARGEMENT DES DONNEES DE REFERENCE
    // ================================
    
    /*const loadMagasin = async () => {
        const data = await getMagasins();
        setMagasin(data);
    };*/

    // ================================
    // CHARGEMENT INITIAL AU MONTAGE
    // ================================
    
    useEffect(() => {
        loadPannes();
    }, []);

// ================================
// RENDER
// ================================

    return(
        <div className="min-h-screen text-white" >
        <Navbar/>
            <div className="mt-20 px-10">
            {view === "selection" && (
                <SelectionPanne
                    pannes ={pannes}
                    setView={setView}
                />
            )}
            {view === "modification" && (
                <ModificationPanne
                    setView={setView}
                />
            )}
            {view === "ajout" && (
                <AjoutPanne
                    setView={setView}
                />
            )}
            {view === "supression" && (
                <SupressionPanne
                    setView={setView}
                />  
            )}
            </div>
        </div>
    )
}