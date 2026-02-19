import { useState, useEffect } from "react"
import "../style.css"
import iconeFlecheEnArriere from "../style/iconeFlecheEnArriere.svg"

function ModificationMachine({
  machines = [],
  loadMachines,
  criticite = [],
  classe = [],
  emplacement = [],
  ur = [],
  setView
}) {

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
  // Validation
  // ================================
  const handleSubmit = async () => {
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
      console.error("Erreur :", error);
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
              className="border-2 rounded border-slate-900 w-full text-black"
              value={editedMachine.id || ""}
              onChange={handleSelectMachine}
            >
              <option value="">-- Choisir une machine --</option>

              {machines.map(machine => (
                <option key={machine.id} value={machine.id}>
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
              className="border-2 rounded border-slate-900 w-full text-black bg-gray-200"
              value={editedMachine.criticite}
              onChange={handleInputChange}
            >
              <option value="">-- Sélectionner --</option>

              {criticite.map(c => (
                <option
                  key={c.idCriticiteMachine}
                  value={c.idCriticiteMachine}
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
              className="border-2 rounded border-slate-900 w-full text-black bg-gray-200"
              value={editedMachine.classeOuverture}
              onChange={handleInputChange}
            >
              <option value="">-- Sélectionner --</option>

              {classe.map(c => (
                <option
                  key={c.idClasseMachine}
                  value={c.idClasseMachine}
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
              className="border-2 rounded border-slate-900 w-full text-black bg-gray-200"
              value={editedMachine.emplacement}
              onChange={handleInputChange}
            >
              <option value="">-- Sélectionner --</option>

              {emplacement.map(e => (
                <option
                  key={e.idEmplacement}
                  value={e.idEmplacement}
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
              className="border-2 rounded border-slate-900 w-full text-black bg-gray-200"
              value={editedMachine.ur}
              onChange={handleInputChange}
            >
              <option value="">-- Sélectionner --</option>

              {ur.map(u => (
                <option
                  key={u.idUr}
                  value={u.idUr}
                >
                  {u.nomUr}
                </option>
              ))}
            </select>

            <h3>Image :</h3>
            <p className="border-2 rounded border-slate-900 w-full bg-gray-200 text-slate-900 p-1.5">
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
            className="border-2 rounded border-slate-900 w-full h-60 p-2 bg-gray-200 text-slate-900"
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

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-600 bg-opacity-40 z-50">
          <div className="bg-white px-8 py-6 rounded-xl shadow-xl text-lg font-semibold text-green-600">
            ✅ Modifications prises en compte
          </div>
        </div>
      )}

    </div>
  );
}

export default ModificationMachine;
