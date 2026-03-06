import { useState } from "react";
import iconeFlecheEnArriere from "../style/iconeFlecheEnArriere.svg";

/*
  Composant permettant :
  - La sélection d'une pièce
  - La modification de ses champs
  - La validation avec contrôle des erreurs
*/

function ModificationPiece({
  pieces = [],
  magasins = [],
  slots = [],
  loadPieces,
  setView
}) {

  const initialPieceState = {
    id: "",
    nom: "",
    description: "",
    quantite: "",
    prixAchat: "",
    idSlotDePiece: "",
    idMagasinDeSlot: "",
    idEmplacementDeMagasin: ""
  };

  const [editedPiece, setEditedPiece] = useState(initialPieceState);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ================================
  // Sélection pièce
  // ================================

  const handleSelectPiece = (e) => {

    const id = Number(e.target.value);
    const piece = pieces.find(p => p.id === id);

    if (!piece) {
      setEditedPiece(initialPieceState);
      return;
    }

    setEditedPiece({
      ...piece,
      idSlotDePiece: piece.idSlotDePiece,
      idMagasinDeSlot: piece.idMagasinDeSlot,
      idEmplacementDeMagasin: piece.idEmplacementDeMagasin
    });
  };

  // ================================
  // Modification champs
  // ================================

  const numericFields = [
    "quantite",
    "prixAchat",
    "idSlotDePiece",
    "idMagasinDeSlot",
    "idEmplacementDeMagasin"
  ];

  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setEditedPiece(prev => ({
      ...prev,
      [name]: numericFields.includes(name)
        ? Number(value)
        : value
    }));
  };

  // ================================
  // VALIDATION + PUT
  // ================================

  const handleSubmit = async () => {

    if (!editedPiece.id) {
      setErrorMessage("❌ Veuillez sélectionner une pièce");
      return;
    }

    const requiredFields = [
      { key: "description", label: "Description" },
      { key: "quantite", label: "Quantité" },
      { key: "prixAchat", label: "Prix d'achat" },
      { key: "idSlotDePiece", label: "Slot" }
    ];

    for (let field of requiredFields) {

      if (!editedPiece[field.key]) {

        setErrorMessage(`❌ Veuillez compléter : ${field.label}`);
        return;

      }
    }

    try {

      const response = await fetch(
        `http://localhost:8081/stock/${editedPiece.id}`,
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
      setEditedPiece(initialPieceState);

      setTimeout(() => {
        setShowPopup(false);
      }, 1500);

    } catch (error) {

      setErrorMessage("❌ Erreur lors de la modification");

    }
  };

  // ================================
  // Slots filtrés par magasin
  // ================================

  const filteredSlots = slots.filter(
    s => s.magasinDeSlot === editedPiece.idMagasinDeSlot
  );

  // ================================
  // RENDER
  // ================================

  return (

    <div className="flex gap-10">

      {/* ================= COLONNE 1 ================= */}

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
            Modification de pièce :
          </h1>

        </div>

        {/* Sélection pièce */}

        <div>

          <h3>Nom de la pièce :</h3>

          <select
            className="border-2 rounded border-slate-900 w-full max-w-75  text-white"
            value={editedPiece.id || ""}
            onChange={handleSelectPiece}
          >

            <option className="bg-slate-900" value="">-- Choisir une pièce --</option>

            {pieces.map(piece => (

              <option key={piece.id} value={piece.id} className="bg-slate-900 ">

                {piece.nom}

              </option>

            ))}

          </select>

        </div>

        {/* Description */}

        <div>

          <h3>Description :</h3>

          <input
            name="description"
            className="border-2 rounded border-slate-900 w-full max-w-75"
            value={editedPiece.description || ""}
            onChange={handleInputChange}
          />

        </div>

        {/* Quantité */}

        <div>

          <h3>Quantité :</h3>

          <input
            name="quantite"
            className="border-2 rounded border-slate-900 w-full max-w-75"
            value={editedPiece.quantite || ""}
            onChange={handleInputChange}
          />

        </div>

        {/* Prix */}

        <div>

          <h3>Prix d'achat :</h3>

          <input
            name="prixAchat"
            className="border-2 rounded border-slate-900 w-full max-w-75"
            value={editedPiece.prixAchat || ""}
            onChange={handleInputChange}
          />

        </div>

      </div>


      {/* ================= COLONNE 2 ================= */}

      <div className="w-1/2 flex flex-col gap-6">

        {/* Magasin */}

        <div>

          <h3>Magasin :</h3>

          <select
            name="idMagasinDeSlot"
            className="border-2 rounded border-slate-900 w-full max-w-75 text-white"
            value={editedPiece.idMagasinDeSlot || ""}
            onChange={handleInputChange}
          >

            <option className="bg-slate-900" value="">-- Sélectionner un magasin --</option>

            {magasins.map(m => (

              <option
                key={m.idMagasin}
                value={m.idMagasin}
                className="bg-slate-900"
              >

                {m.nomMagasin}

              </option>

            ))}

          </select>

        </div>


        {/* Slot */}

        <div>

          <h3>Slot :</h3>

          <select
            name="idSlotDePiece"
            className="border-2 rounded border-slate-900 w-full max-w-75 text-white"
            value={editedPiece.idSlotDePiece || ""}
            onChange={handleInputChange}
          >

            <option className="bg-slate-900" value="">-- Sélectionner un slot --</option>

            {filteredSlots.map(s => (

              <option
                key={s.idSlot}
                value={s.idSlot}
                className="bg-slate-900"
              >

                {s.nomSlot}

              </option>

            ))}

          </select>

        </div>


        {/* Bouton validation */}

        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400 w-32"
          disabled={!editedPiece.id}
        >

          Valider

        </button>

      </div>


      {/* Popup succès */}

      {showPopup && (

        <div className="fixed inset-0 flex items-center justify-center bg-slate-600 bg-opacity-40 z-50">

          <div className="bg-white px-8 py-6 rounded-xl shadow-xl text-lg font-semibold text-green-600">

            ✅ Modifications prises en compte

          </div>

        </div>

      )}


      {/* Popup erreur */}

      {errorMessage && (

        <div className="fixed inset-0 flex items-center justify-center bg-slate-600 bg-opacity-40 z-50">

          <div className="bg-white px-8 py-6 rounded-xl shadow-xl text-lg font-semibold text-red-600 text-center">

            {errorMessage}

            <div className="mt-4">

              <button
                onClick={() => setErrorMessage("")}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >

                OK

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}

export default ModificationPiece;