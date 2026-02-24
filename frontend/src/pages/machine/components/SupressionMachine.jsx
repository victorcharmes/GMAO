import { useState } from "react"
import iconeFlecheEnArriere from "../style/iconeFlecheEnArriere.svg"

function SelectionMachine({
    machines = [],
    loadMachines,
    setView
}) {

  const [selectedId, setSelectedId] = useState("");
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Sélection machine
  const handleSelectMachine = (e) => {
    const id = Number(e.target.value);
    setSelectedId(id);

    const machine = machines.find(m => m.id === id) || null;
    setSelectedMachine(machine);

    console.log("Machine sélectionnée :", machine);
  };

  // Demande confirmation
  const handleDeleteClick = () => {
    if (!selectedId) {
      setErrorMessage("❌ Veuillez sélectionner une machine");
      return;
    }

    setShowConfirmPopup(true);
  };

  // Suppression réelle
  const confirmDelete = async () => {

    try {
      const response = await fetch(
        `http://localhost:8081/machine/${selectedId}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Erreur serveur");
      }

      await loadMachines();

      setShowConfirmPopup(false);
      setShowPopup(true);
      setSelectedId("");
      setSelectedMachine(null);

      setTimeout(() => {
        setShowPopup(false);
      }, 1500);

    } catch (error) {
      setShowConfirmPopup(false);
      setErrorMessage("❌ Erreur lors de la suppression");
    }
  };

return(
    <div className="mt-20 px-10">

        <div className="flex gap-10">

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
                        Suppression de machine :
                    </h1>
                </div>

                <div>
                    <h3>Liste des machines :</h3>

                    <select
                        className="border-2 rounded border-slate-900 w-full text-black"
                        value={selectedId}
                        onChange={handleSelectMachine}
                    >
                        <option value="">
                            -- Choisir une machine --
                        </option>

                        {machines.map(machine => (
                            <option
                                key={machine.id}
                                value={machine.id}
                            >
                                {machine.nom}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={handleDeleteClick}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
                >
                    Supprimer
                </button>

            </div>
        </div>

        {/* Popup confirmation */}
        {showConfirmPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-slate-600 bg-opacity-40 z-50">
                <div className="bg-white px-8 py-6 rounded-xl shadow-xl text-lg text-center text-black">
                    <p className="font-semibold mb-4">
                        ⚠️ Voulez-vous supprimer la machine :
                        <br />
                        <span className="text-red-600">
                            {selectedMachine?.nom}
                        </span> ?
                    </p>

                    <div className="flex justify-center gap-4 mt-4">
                        <button
                            onClick={confirmDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded"
                        >
                            Oui
                        </button>

                        <button
                            onClick={() => setShowConfirmPopup(false)}
                            className="px-4 py-2 bg-gray-400 text-white rounded"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Popup succès */}
        {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-slate-600 bg-opacity-40 z-50">
                <div className="bg-white px-8 py-6 rounded-xl shadow-xl text-lg font-semibold text-green-600">
                    ✅ Machine supprimée
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

export default SelectionMachine