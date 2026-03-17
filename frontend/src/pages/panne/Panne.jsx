import { useEffect, useState, useCallback  } from "react"
//import { getPannes, getMagasins, getSlots, getEmplacements } from "./service/panneApi"
import Navbar from "../../components/Navbar"
import SelectionPanne from "./components/SelectionPanne"
import SupressionPanne from "./components/SupressionPanne"
import AjoutPanne from "./components/AjoutPanne"
import ModificationPanne from "./components/ModificationPanne"

export default function Panne(){
    const [view, setView] = useState("selection")


    return(
        <div className="min-h-screen text-white" >
        <Navbar/>
            <div className="mt-20 px-10">
            {view === "selection" && (
                <SelectionPanne
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