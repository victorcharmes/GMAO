import { useEffect, useState, useCallback  } from "react"
import { getPieces } from "./service/pieceApi"
import Navbar from "../../components/Navbar"
import SelectionPiece from "./components/SelectionPiece"
import AjoutPiece from "./components/AjoutPiece"
import ModificationPiece from "./components/ModificationPiece"
import SupressionPiece from "./components/SupressionPiece"

export default function Stock() {

    // Liste complète des pièces
    const[pieces, setPieces] = useState([])

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
    // CHARGEMENT INITIAL AU MONTAGE
    // ================================
    
    useEffect(() => {
        loadPieces();
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
                    pieces = {pieces}
                    loadPieces
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
                    pieces = {pieces}
                    loadPieces
                    setView={setView}
                />
            )}
        </div>
    </div>
)
}
