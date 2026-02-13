import { useState } from "react"
import "../style.css"
import iconeFlecheEnArriere from "../style/iconeFlecheEnArriere.svg"

function ModificationMachine({ machines = [], setView }) {

  const [selectedMachine, setSelectedMachine] = useState(null)
  const [editedMachine, setEditedMachine] = useState(null)
  const [selectedName, setSelectedName] = useState("")
  const [showPopup, setShowPopup] = useState(false)
  
  // ================================
  // Sélection machine
  // ================================
  const handleSelectMachine = (e) => {
    const selectedName = e.target.value

    const machine = machines.find(
      (m) => m.nom === selectedName
    )

    setSelectedMachine(machine)
    setEditedMachine(machine ? { ...machine } : null)
  }

  // ================================
  // Modification des champs
  // ================================
  const handleInputChange = (e) => {
    const { name, value } = e.target

    setEditedMachine(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // ==========
  // Validation
  // ==========
    const handleSubmit = () => {
    if (!editedMachine) return

    console.log("========== DONNÉES À ENVOYER ==========")
    console.log(editedMachine)
    console.log("========================================")

    // ffiche popup
    setShowPopup(true)

    // Disparition après 2 secondes
    setTimeout(() => {
        setShowPopup(false)

        // Reset formulaire
        setSelectedMachine(null)
        setEditedMachine(null)
        setSelectedName("")
    }, 1500)
    }

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
            <input
            list="machinesList"
            className="border-2 rounded border-slate-900 w-full"
            placeholder="Choisir..."
            value={selectedName}
            onChange={(e) => {
                setSelectedName(e.target.value)
                handleSelectMachine(e)
            }}
            />

            <datalist id="machinesList">
              {machines.map(machine => (
                <option key={machine.id} value={machine.nom} />
              ))}
            </datalist>
          </div>

          {/* Champs modifiables */}
          {editedMachine && (
            <div className="space-y-4">

              <div>
                <h3>Criticité :</h3>
                <input
                  name="criticite"
                  className="border-2 rounded border-slate-900 w-full bg-gray-200 text-slate-900"
                  value={editedMachine.criticite || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <h3>Classe :</h3>
                <input
                  className="border-2 rounded border-slate-900 w-full bg-gray-200 text-slate-900" 
                  value={editedMachine.descriptionClasseOuverture || ""}
                  readOnly
                />
              </div>

              <div>
                <h3>Emplacement :</h3>
                <input
                  name="emplacement"
                  className="border-2 rounded border-slate-900 w-full bg-gray-200 text-slate-900"
                  value={editedMachine.emplacement || ""}
                  onChange={handleInputChange}
                />
              </div>

            </div>
          )}
        </div>

        {/* ================= COLONNE 2 ================= */}
        <div className="w-1/3 flex flex-col gap-6">

          {editedMachine && (
            <div>
              <h3>Responsable production :</h3>
              <input
                name="responsableProdMachine"
                className="border-2 rounded border-slate-900 w-full bg-gray-200 text-slate-900"
                value={editedMachine.responsableProdMachine || ""}
                onChange={handleInputChange}
              />

              <h3>Image :</h3>
              <p className="border-2 rounded border-slate-900 w-full bg-gray-200 text-slate-900">Pour modifier l'image, se rendre dans le dossier suivant: /GMAO/public/photosMachine/ (Attention à bien faire correspondre le nom de la machine).</p>
            </div>
            )}
        </div>

        {/* ================= COLONNE 3 ================= */}
        <div className="w-1/3">

          {editedMachine && (
            <>
              <h3>Description :</h3>
              <textarea
                name="description"
                className="border-2 rounded border-slate-900 w-full h-60 p-2 bg-gray-200 text-slate-900"
                value={editedMachine.description || ""}
                onChange={handleInputChange}
              />

              <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
              >
                Valider
              </button>
            </>
          )}

        </div>

      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-600 bg-opacity-40 z-50">
            <div className="bg-white px-8 py-6 rounded-xl shadow-xl text-lg font-semibold text-green-600">
            ✅ Modifications prise en compte
            </div>
        </div>
        )}
    </div>
  )
}

export default ModificationMachine
