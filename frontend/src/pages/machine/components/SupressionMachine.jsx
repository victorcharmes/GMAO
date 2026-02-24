import { useState } from "react"
import iconeFlecheEnArriere from "../style/iconeFlecheEnArriere.svg"

function SelectionMachine({
    machines = [],
    loadMachines,
    setView
}) {

  const [selectedId, setSelectedId] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Sélection machine
  const handleSelectMachine = (e) => {
    const id = Number(e.target.value);
    setSelectedId(id);

    const machine = machines.find(m => m.id === id);
    console.log("Machine sélectionnée :", machine);
  };

  // Suppression
  const handleDelete = async () => {

    if (!selectedId) {
      setErrorMessage("❌ Veuillez sélectionner une machine");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8081/machine/${selectedId}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        throw new Error("Erreur serveur");
      }

      // Recharge la liste
      await loadMachines();

      setShowPopup(true);
      setSelectedId("");

      setTimeout(() => {
        setShowPopup(false);
      }, 1500);

    } catch (error) {
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
                    onClick={handleDelete}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
                >
                    Supprimer
                </button>

            </div>
        </div>

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