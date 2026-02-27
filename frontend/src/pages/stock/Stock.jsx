import { useEffect, useState, useCallback  } from "react"
import { getPieces, getMagasins, getSlots } from "./service/pieceApi"
import Navbar from "../../components/Navbar"
import SelectionPiece from "./components/SelectionPiece"
import AjoutPiece from "./components/AjoutPiece"
import ModificationPiece from "./components/ModificationPiece"
import SupressionPiece from "./components/SupressionPiece"

export default function Stock() {

    // Liste complète des pièces
    const[pieces, setPieces] = useState([])

    // Listes de référence (menus déroulants)
    const [magasins, setMagasin] = useState([])
    const [slots, setSlot] = useState([])
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
    const loadPieces = useCallback(async () => {
        const data = await getPieces();
        console.log("LONGUEUR API :", data.length);
        console.log("DATA COMPLETE :", data);
        setPieces(data);
    }, []);
    // Debug du state pieces
    useEffect(() => {
        console.log("STATE MACHINES :", pieces.length);
    }, [pieces]);

    // ================================
    // CHARGEMENT DES DONNEES DE REFERENCE
    // ================================
    
    const loadMagasin = async () => {
        const data = await getMagasins();
        setMagasin(data);
    };
    const loadSlot = async () => {
        const data = await getSlots();
        setSlot(data);
    };

    // ================================
    // CHARGEMENT INITIAL AU MONTAGE
    // ================================
    
    useEffect(() => {
        loadPieces();
        loadMagasin();
        loadSlot();
    }, []);

// ================================
// RENDER
// ================================

return(
    <div className="min-h-screen text-white" >
        <Navbar/>
        <div className="mt-20 px-10">
            {view === "selection" && (
                <SelectionPiece
                    pieces = {pieces}
                    setView={setView}
                />
            )}
            {view === "modification" && (
                <ModificationPiece
                    pieces={pieces}
                    magasins={magasins}
                    slots={slots}
                    loadPieces={loadPieces}
                    setView={setView}
                />
            )}
            {view === "ajout" && (
                <AjoutPiece
                    setView={setView}
                />
            )}
            {view === "supression" && (
                <SupressionPiece
                    pieces={pieces}
                    loadPieces={loadPieces}
                    setView={setView}
                />  
            )}
        </div>
    </div>
)
}
