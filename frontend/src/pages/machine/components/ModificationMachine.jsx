import { useState, useEffect } from "react"
import "../style.css"
import iconeFlecheEnArriere from "../style/iconeFlecheEnArriere.svg"

/*
  Composant permettant :
  - La sélection d'une machine
  - La modification de ses champs
  - La validation avec contrôle des erreurs
*/

function ModificationMachine({
  machines = [],
  loadMachines,
  criticite = [],
  classe = [],
  emplacement = [],
  ur = [],
  setView
}) {

  // ================================
  // ETAT INITIAL D'UNE MACHINE EDITEE
  // ================================
  
  const initialMachineState = {
    id: "",
    criticite: "",
    classeOuverture: "",
    emplacement: "",
    ur: "",
    description: ""
  };

  const [editedMachine, setEditedMachine] = useState(initialMachineState);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ================================
  // Sélection machine
  // ================================

  const handleSelectMachine = (e) => {
    const id = Number(e.target.value);
    const machine = machines.find(m => m.id === id);

    if (!machine) {
      setEditedMachine(initialMachineState);
      return;
    }

    // Conversion des libellés en IDs pour les <select>
    const criticiteObj = criticite.find(c => c.criticiteMachine === machine.criticite);
    const classeObj = classe.find(c => c.classeMachine === machine.classe);
    const emplacementObj = emplacement.find(e => e.nomEmplacement === machine.emplacement);
    const urObj = ur.find(u => u.nomUr === machine.ur);

    setEditedMachine({
      ...machine,
      criticite: criticiteObj?.idCriticiteMachine || "",
      classeOuverture: classeObj?.idClasseMachine || "",
      emplacement: emplacementObj?.idEmplacement || "",
      ur: urObj?.idUr || "",
    });
  };

  // ================================
  // Modification champs
  // ================================

  const numericFields = ["criticite", "classeOuverture", "emplacement", "ur"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditedMachine(prev => ({
      ...prev,
      [name]: numericFields.includes(name)
        ? Number(value)
        : value
    }));
  };

  // ================================
  // VALIDATION + ENVOI PUT
  // ================================

  const handleSubmit = async () => {

    // Vérification sélection machine
    if (!editedMachine.id) {
      setErrorMessage("❌ Veuillez sélectionner une machine");
      return;
    }

    // Champs obligatoires
    const requiredFields = [
      { key: "criticite", label: "Criticité" },
      { key: "classeOuverture", label: "Classe" },
      { key: "emplacement", label: "Emplacement" },
      { key: "ur", label: "Unité de Réalisation" },
      { key: "description", label: "Description" }
    ];

    for (let field of requiredFields) {
      if (!editedMachine[field.key] || editedMachine[field.key].toString().trim() === "") {
        setErrorMessage(`❌ Veuillez compléter le champ : ${field.label}`);
        return;
      }
    }

    try {
      const response = await fetch(
        `http://localhost:8081/machine/${editedMachine.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedMachine)
        }
      );

      if (!response.ok) throw new Error("Erreur serveur");

      await response.json();
      await loadMachines();

      setShowPopup(true);
      setEditedMachine(initialMachineState);

      setTimeout(() => {
        setShowPopup(false);
      }, 1500);

    } catch (error) {
      setErrorMessage("❌ Erreur lors de la modification");
    }
  };

  // ================================
  // RENDER
  // ================================

  return (
    <div className="mt-20 px-10">

      <div className="flex gap-10">

        {/* ================= COLONNE 1 ================= */}
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
              Modification de machine :
            </h1>
          </div>

          {/* Sélection machine */}
          <div>
            <h3>Nom de la machine :</h3>

            <select
              className="border-2 rounded border-slate-900 w-full text-white"
              value={editedMachine.id || ""}
              onChange={handleSelectMachine}
            >
              <option value="" className="bg-slate-900">-- Choisir une machine --</option>

              {machines.map(machine => (
                <option key={machine.id} value={machine.id} className="bg-slate-900">
                  {machine.nom}
                </option>
              ))}
            </select>
          </div>

          {/* Criticité */}
          <div>
            <h3>Criticité :</h3>
            <select
              name="criticite"
              className="border-2 rounded border-slate-900 w-full text-white"
              value={editedMachine.criticite}
              onChange={handleInputChange}
            >
              <option value="" className="bg-slate-900">-- Sélectionner --</option>

              {criticite.map(c => (
                <option
                  key={c.idCriticiteMachine}
                  value={c.idCriticiteMachine}
                  className="bg-slate-900"
                >
                  {c.criticiteMachine}
                </option>
              ))}
            </select>
          </div>

          {/* Classe */}
          <div>
            <h3>Classe :</h3>
            <select
              name="classeOuverture"
              className="border-2 rounded border-slate-900 w-full text-white"
              value={editedMachine.classeOuverture}
              onChange={handleInputChange}
            >
              <option value="" className="bg-slate-900">-- Sélectionner --</option>

              {classe.map(c => (
                <option
                  key={c.idClasseMachine}
                  value={c.idClasseMachine}
                  className="bg-slate-900"
                >
                  {c.classeMachine}
                </option>
              ))}
            </select>
          </div>

          {/* Emplacement */}
          <div>
            <h3>Emplacement :</h3>
            <select
              name="emplacement"
              className="border-2 rounded border-slate-900 w-full text-white"
              value={editedMachine.emplacement}
              onChange={handleInputChange}
            >
              <option value="" className="bg-slate-900">-- Sélectionner --</option>

              {emplacement.map(e => (
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

        </div>

        {/* ================= COLONNE 2 ================= */}
        <div className="w-1/3 flex flex-col gap-6">

          <div>
            <h3>UR :</h3>
            <select
              name="ur"
              className="border-2 rounded border-slate-900 w-full text-white"
              value={editedMachine.ur}
              onChange={handleInputChange}
            >
              <option value="" className="bg-slate-900">-- Sélectionner --</option>

              {ur.map(u => (
                <option
                  key={u.idUr}
                  value={u.idUr}
                  className="bg-slate-900"
                >
                  {u.nomUr}
                </option>
              ))}
            </select>

            <h3>Image :</h3>
            <p className="border-2 rounded border-slate-900 w-full text-white p-1.5">
              Pour modifier l'image, se rendre dans le dossier suivant:
              /GMAO/public/photosMachine/
            </p>
          </div>

        </div>

        {/* ================= COLONNE 3 ================= */}
        <div className="w-1/3">

          <h3>Description :</h3>
          <textarea
            name="description"
            className="border-2 rounded border-slate-900 w-full h-60 p-2 text-white"
            value={editedMachine.description}
            onChange={handleInputChange}
          />

          <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
            disabled={!editedMachine.id}
          >
            Valider
          </button>

        </div>

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

export default ModificationMachine;
