import { useState } from "react";
import iconeModification from "../style/iconeModification.svg";
import iconeAjout from "../style/iconeAjout.svg";
import iconeSupression from "../style/iconeSupression.svg";

function SelectionPiece({setView, pieces=[]}){
    const [selectedPiece, setSelectedPiece] = useState(null)
    
    return(
    <div className="flex gap-10">

        {/* ================= COLONNE 1 ================= */}
        <div className="w-1/2 space-y-6">
            {/* Icônes */}
            <div className="flex gap-4">
                <img src={iconeModification} alt="Modification piece" width="40"     className="cursor-pointer" onClick={() => setView("modification")} />
                <img src={iconeAjout} alt="Ajout piece" width="40"     className="cursor-pointer"
                onClick={() => setView("ajout")}/>
                <img src={iconeSupression} alt="Supression piece" width="40"     className="cursor-pointer"
                onClick={() => setView("supression")}/>
            </div>

            {/* Sélection piece */}
            <div>
                <h3>Nom de la Piece :</h3>

                <select
                    className="border-2 rounded border-slate-900 w-full max-w-75 text-white"
                    value={selectedPiece?.id || ""}
                    onChange={(e) => {
                    const id = Number(e.target.value);
                    const piece = pieces.find(m => m.id === id);
                    setSelectedPiece(piece || null);
                    }}
                >
                    <option value="" className="bg-slate-900">-- Choisir une piece --</option>

                    {pieces.map(piece => (
                    <option key={piece.id} value={piece.id} className="bg-slate-900"> 
                        {piece.nom}
                    </option>
                    ))}
                </select>
            </div>

            {/* Infos Piece */}
            <div className="space-y-4">
            <div>
                <h3>Description :</h3>
                <input
                className="border-2 rounded border-slate-900 w-full max-w-75"
                value={selectedPiece?.description || ""}
                readOnly
                />
            </div>
            </div>

            <div className="space-y-4">
            <div>
                <h3>Quantite :</h3>
                <input
                className="border-2 rounded border-slate-900 w-full max-w-75"
                value={selectedPiece?.quantite || ""}
                readOnly
                />
            </div>
            </div>

            <div className="space-y-4">
            <div>
                <h3>Prix d'achat :</h3>
                <input
                className="border-2 rounded border-slate-900 w-full max-w-75"
                value={selectedPiece?.prixAchat + " €" || ""}
                readOnly
                />
            </div>
            </div>

        </div>
            
        {/* ================= COLONNE 2 ================= */}
        <div className="w-1/2 flex flex-col items-center gap-6">
            <div className="w-full">
            <h3>Magasin :</h3>
            <input
                className="border-2 rounded border-slate-900 w-full max-w-75"
                value={selectedPiece?.nomMagasin || ""}
                readOnly
            />
            </div>

            <div className="w-full">
            <h3>Emplacement :</h3>
            <input
                className="border-2 rounded border-slate-900 w-full max-w-75"
                value={selectedPiece?.nomEmplacement || ""}
                readOnly
            />
            </div>

            <div className="w-full">
            <h3>Localisation :</h3>
            <input
                className="border-2 rounded border-slate-900 w-full max-w-75"
                value={selectedPiece?.nomSlot || ""}
                readOnly
            />
            </div>
        </div>

    </div>
    )
}
export default SelectionPiece