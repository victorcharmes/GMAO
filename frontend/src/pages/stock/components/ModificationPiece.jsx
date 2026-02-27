import { useState } from "react";

import iconeFlecheEnArriere from "../style/iconeFlecheEnArriere.svg"
/*
  Composant permettant :
  - La sélection d'une pièce
  - La modification de ses champs
  - La validation avec contrôle des erreurs
*/
function ModificationPiece({ pieces=[], magasins=[], slots=[], loadPieces, setView}){

    // ================================
    // ETAT INITIAL D'UNE piece EDITEE
    // ================================

    const initialPieceState = {
        id: "",
        nom: "",
        description: "",
        quantite: "",
        prixAchat: "",
        nomMagasin: "",
        nomEmplacement: "",
        nomSlot: ""
    };

    const [editedPiece, setEditedPiece] = useState(null)
    const [showPopup, setShowPopup] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    // ================================
    // Sélection piece
    // ================================
    const handleSelectPiece = (e) => {
        const id = Number(e.target.value);
        const piece = pieces.find(p => p.id === id);
        setEditedPiece(piece || null);
    };

    // ================================
    // VALIDATION + ENVOI PUT
    // ================================

    const handleSubmit = async () => {

        // Vérification sélection piece
        if (!editedPiece || !editedPiece.id) {
        setErrorMessage("❌ Veuillez sélectionner une piece");
        return;
        }

        // Champs obligatoires
        const requiredFields = [
        { key: "description", label: "Description" },
        { key: "quantite", label: "PrixAchat" },
        { key: "nomMagasin", label: "NomMagasin" },
        { key: "nomEmplacement", label: "NomEmplacement" },
        { key: "nomSlot", label: "NomSlot" }
        ];

        for (let field of requiredFields) {
        if (!editedPiece[field.key] || editedPiece[field.key].toString().trim() === "") {
            setErrorMessage(`❌ Veuillez compléter le champ : ${field.label}`);
            return;
        }
        }

        try {
        const response = await fetch(
            `http://localhost:8081/piece/${editedPiece.id}`,
            {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedPiece)
            }
        );

        if (!response.ok) throw new Error("Erreur serveur");

        await response.json();
        await loadPieces();

        setShowPopup(true);
        setEditedPiece(null);

        setTimeout(() => {
            setShowPopup(false);
        }, 1500);

        } catch (error) {
        setErrorMessage("❌ Erreur lors de la modification");
        }
    };
    console.log(magasins)
    console.log(slots)
    return(
    <div className="flex gap-10">

        {/* ================= COLONNE 1 ================= */}
        <div className="w-1/2 space-y-6">
            {/* Icônes */}
            <div className="flex gap-4">
                <img src={iconeFlecheEnArriere} alt="Retour en arrière" width="40"     className="cursor-pointer" onClick={() => setView("selection")} />
                <h1 className="text-xl font-bold">
                    Modification de piece :
                </h1>
            </div>

            {/* Sélection piece */}
            <div>
                <h3>Nom de la Piece :</h3>

                <select
                    className="border-2 rounded border-slate-900 w-full max-w-75 text-white"
                    value={editedPiece?.id || ""}
                    onChange={(e) => {
                    const id = Number(e.target.value);
                    const piece = pieces.find(m => m.id === id);
                    setEditedPiece(piece || null);
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
                value={editedPiece?.description || ""}
                />
            </div>
            </div>

            <div className="space-y-4">
            <div>
                <h3>Quantite :</h3>
                <input
                className="border-2 rounded border-slate-900 w-full max-w-75"
                value={editedPiece?.quantite || ""}
                readOnly
                />
            </div>
            </div>

            <div className="space-y-4">
            <div>
                <h3>Prix d'achat :</h3>
                <input
                className="border-2 rounded border-slate-900 w-full max-w-75"
                value={
                editedPiece?.prixAchat != null
                    ? editedPiece.prixAchat + " €"
                    : ""
                }
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
                value={editedPiece?.nomMagasin || ""}
                readOnly
            />
            </div>

            <div className="w-full">
            <h3>Emplacement :</h3>
            <input
                className="border-2 rounded border-slate-900 w-full max-w-75"
                value={editedPiece?.nomEmplacement || ""}
                readOnly
            />
            </div>

            <div className="w-full">
            <h3>Localisation :</h3>
            <input
                className="border-2 rounded border-slate-900 w-full max-w-75"
                value={editedPiece?.nomSlot || ""}
                readOnly
            />
            </div>
        </div>

    </div>
    )
}  
export default ModificationPiece