import iconeFlecheEnArriere from "../style/iconeFlecheEnArriere.svg"

function SupressionPiece({setView}) {
    return(
        <div className="flex gap-10">

            {/* ================= COLONNE 1 ================= */}
            <div className="w-1/3 space-y-6">
                {/* Icônes */}
                <div className="flex gap-4 items-center">
                <img
                    src={iconeFlecheEnArriere}
                    alt="Retour"
                    width="40"
                    className="cursor-pointer"
                    onClick={() => setView("selection")}
                />
                <h1 className="text-xl font-bold">
                    Supression d'une pièce :
                </h1>
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
export default SupressionPiece