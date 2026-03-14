import { useState } from "react"
import iconeFlecheEnArriere from "../style/iconeFlecheEnArriere.svg"

/*
  Composant permettant :
  - La création d'une nouvelle machine
  - La validation des champs obligatoires
  - L'affichage d'un popup succès ou erreur
*/

function AjoutPiece({ magasins = [], slots = [], emplacements = [], setView  }) {
  // ================================
  // STATES
  // ================================
    console.log(magasins)
    console.log(slots)
    console.log(emplacements)
  // Popup succès
  const [showPopup, setShowPopup] = useState(false)

  // Message d'erreur
  const [errorMessage, setErrorMessage] = useState("")

  // Etat initial du formulaire
  const initialState = {
    nom: "",
    description: "",
    quantite: "",
    prixAchat: "",
    dateMiseEnStock: "",
    nomMagasin: "",
    nomSlot: "",
    nomEmplacement: ""
  }

  // Piece en cours de création
  const [newPiece, setNewPiece] = useState(initialState)
    
  // ================================
  // VALIDATION + ENVOI POST
  // ================================
  const handleSubmit = async () => {

    // Liste des champs obligatoires
    const requiredFields = [
      { key: "nom", label: "Nom de la piece" },
      { key: "quantite", label: "Quantite" },
      { key: "prixAchat", label: "Prix d'achat" },
      { key: "dateMiseEnStock", label: "Date mise en stock de la piece" },
      { key: "nomMagasin", label: "nom du magasin " },
      { key: "nomSlot", label: "nom du slot" },
      { key: "nomEmplacement", label: "nom de l'emplacement" }
    ];

    // Vérification des champs vides
    for (let field of requiredFields) {
      if (!newPiece[field.key] || newPiece[field.key].toString().trim() === "") {
        setErrorMessage(`❌ Veuillez compléter le champ : ${field.label}`);
        return;
      }
    }
    // Envoi POST vers le backend
    try {
      const response = await fetch("http://localhost:8081/stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newPiece)
      });

      if (!response.ok) throw new Error("Erreur serveur");

      await response.json();

      // Recharge la liste des machines dans le composant parent
      await loadPieces();

      // Affichage popup succès
      setShowPopup(true);
      // Reset formulaire
      setNewPiece(initialState);

      // Disparition automatique popup
      setTimeout(() => {
        setShowPopup(false);
      }, 1500);

    } catch (error) {
      // Gestion erreur backend
      setErrorMessage("❌ Erreur lors de l'enregistrement");
    }
  }
    const handleChange = (e) => {
        const { name, value } = e.target

        setNewPiece(prev => ({
        ...prev,
        [name]: value
        }))

        console.log(name + " :", value)
    }

  // ================================
  // RENDER
  // ================================
  return (
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
                Ajout d'une piece :
            </h1>
            </div>
          <div>
            <h3>Nom de la piece :</h3>
            <input
              name="nom"
              className="border-2 rounded border-slate-900 w-full max-w-75"
              value={newPiece.nom}
              onChange={handleChange}
            />
          </div>

          <div>
            <h3>Description :</h3>
            <input
              name="description"
              className="border-2 rounded border-slate-900 w-full max-w-75"
              value={newPiece.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <h3>Quantite :</h3>
            <input
              name="quantite"
              className="border-2 rounded border-slate-900 w-full max-w-75"
              value={newPiece.quantite}
              onChange={handleChange}
            />
          </div>

          <div>
            <h3>Prix d'achat :</h3>
            <input
              name="prixAchat"
              className="border-2 rounded border-slate-900 w-full max-w-75"
              value={newPiece.prixAchat}
              onChange={handleChange}
            />
          </div>

        </div>

        {/* COLONNE 2 */}
        <div className="w-1/2 flex flex-col gap-6">
          
          <div>
            <h3>Magasin :</h3>
              <select
                name="Magasin"
                className="border-2 rounded border-slate-900 w-full max-w-75 text-white"
                value={newPiece.nomMagasin}
                onChange={handleChange}
              >
                <option value="" className="bg-slate-900">-- Sélectionner --</option>

                {magasins.map((m) => (
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

          <div>
            <h3>Slot :</h3>
              <select
                name="nomSlot"
                className="border-2 rounded border-slate-900 w-full max-w-75 text-white"
                value={newPiece.nomSlot}
                onChange={handleChange}
              >
                <option value="" className="bg-slate-900">-- Sélectionner --</option>

                {slots.map((s) => (
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

          <div>
            <h3>Emplacement :</h3>
              <select
                name="nomEmplacement"
                className="border-2 rounded border-slate-900 w-full max-w-75 text-white"
                value={newPiece.nomEmplacement}
                onChange={handleChange}
              >
                <option value="" className="bg-slate-900">-- Sélectionner --</option>

                {emplacements.map((e) => (
                  <option
                    key={e.idEmplacement}
                    value={e.idEmplacement}
                    className="bg-slate-900"
                  >
                    {e.nomEmplacement}
                  </option>
                ))}
              </select>
          </div>
          <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded w-32"
          >
          Valider
          </button>
        </div>


      
        {/* Popup scuccès */}
        {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-600 bg-opacity-40 z-50">
            <div className="bg-white px-8 py-6 rounded-xl shadow-xl text-lg font-semibold text-green-600">
            ✅ Pièce ajoutée
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
  )
}

export default AjoutPiece