import { useState } from "react"
import iconeFlecheEnArriere from "../style/iconeFlecheEnArriere.svg"

function ModificationPanne({setView}){
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
                    Modification d'une panne :
                </h1>
                </div>
            </div>
        </div>
    )
}export default ModificationPanne