import { useState } from "react"

import Navbar from "../../components/Navbar"
import SelectionPiece from "./components/SelectionPiece"
import AjoutPiece from "./components/AjoutPiece"
import ModificationPiece from "./components/ModificationPiece"
import SupressionPiece from "./components/SupressionPiece"

export default function Stock() {

    // Vue active
    // "selection" | "modification" | "ajout" | "supression"
    const [view, setView] = useState("selection")

return(
    <div className="min-h-screen text-white" >
        <Navbar/>
        <div className="mt-20 px-10">
            {view === "selection" && (
                <SelectionPiece
                    setView={setView}
                />
            )}
            {view === "modification" && (
                <ModificationPiece
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
                    setView={setView}
                />
            )}
        </div>
    </div>
)
}
