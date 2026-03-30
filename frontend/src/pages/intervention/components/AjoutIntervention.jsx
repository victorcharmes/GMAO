import { useState } from "react";
import iconeFlecheEnArriere from "../style/iconeFlecheEnArriere.svg"

function AjoutIntervention({setView}){

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
                        Ajout d'une intervention :
                    </h1>
                </div>
            </div>
        </div>
    )
}export default AjoutIntervention