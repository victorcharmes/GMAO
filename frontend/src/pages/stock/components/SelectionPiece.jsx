import iconeModification from "../style/iconeModification.svg";
import iconeAjout from "../style/iconeAjout.svg";
import iconeSupression from "../style/iconeSupression.svg";

function SelectionPiece({setView}){

    return(
    <div className="flex gap-10">

        {/* ================= COLONNE 1 ================= */}
        <div className="w-1/3 space-y-6">
            {/* Icônes */}
            <div className="flex gap-4">
                <img src={iconeModification} alt="Modification piece" width="40"     className="cursor-pointer" onClick={() => setView("modification")} />
                <img src={iconeAjout} alt="Ajout piece" width="40"     className="cursor-pointer"
                onClick={() => setView("ajout")}/>
                <img src={iconeSupression} alt="Supression piece" width="40"     className="cursor-pointer"
                onClick={() => setView("supression")}/>
            </div>
        </div>
        {/* ================= COLONNE 2 ================= */}
        <div className="w-1/3 flex flex-col items-center gap-6">
        </div>
        {/* ================= COLONNE 3 ================= */}
        <div className="w-1/3">
        </div>
    </div>
    )
}
export default SelectionPiece