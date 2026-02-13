import { useState } from "react"
import "../style.css"
import iconeFlecheEnArriere from "../style/iconeFlecheEnArriere.svg"

function AjoutMachine({setView}) {

    const [showPopup, setShowPopup] = useState(false)
    
    const initialState = {
        nom: "",
        criticite: "",
        descriptionClasseOuverture: "",
        emplacement: "",
        ur: "",
        descriptionUR: "",
        responsableProdMachine: "",
        description: ""
    }
    const [newMachine, setNewMachine] = useState(initialState)
    
    const handleSubmit = () => {
    console.log("Machine envoyée :", newMachine)

    setShowPopup(true)

    // Reset des inputs
    setNewMachine(initialState)

    setTimeout(() => {
        setShowPopup(false)
    }, 1500)
    }
    const handleChange = (e) => {
        const { name, value } = e.target

        setNewMachine(prev => ({
        ...prev,
        [name]: value
        }))

        console.log(name + " :", value)
    }

  return (
    <div className="mt-20 px-10">
      <div className="flex gap-10">

        {/* COLONNE 1 */}
        <div className="w-1/3 space-y-4">
            <div className="flex gap-4 items-center">
            <img
                src={iconeFlecheEnArriere}
                alt="Retour"
                width="40"
                className="cursor-pointer"
                onClick={() => setView("selection")}
            />
            <h1 className="text-xl font-bold">
                Ajout d'une machine :
            </h1>
            </div>
          <div>
            <h3>Nom de la machine :</h3>
            <input
              name="nom"
              className="border-2 rounded border-slate-900 w-full"
              value={newMachine.nom}
              onChange={handleChange}
            />
          </div>

          <div>
            <h3>Criticité :</h3>
            <input
              name="criticite"
              className="border-2 rounded border-slate-900 w-full"
              value={newMachine.criticite}
              onChange={handleChange}
            />
          </div>

          <div>
            <h3>Classe :</h3>
            <input
              name="descriptionClasseOuverture"
              className="border-2 rounded border-slate-900 w-full"
              value={newMachine.descriptionClasseOuverture}
              onChange={handleChange}
            />
          </div>

          <div>
            <h3>Emplacement :</h3>
            <input
              name="emplacement"
              className="border-2 rounded border-slate-900 w-full"
              value={newMachine.emplacement}
              onChange={handleChange}
            />
          </div>

        </div>

        {/* COLONNE 2 */}
        <div className="w-1/3 space-y-4">

          <div>
            <h3>Unité de Réalisation :</h3>
            <input
              name="ur"
              className="border-2 rounded border-slate-900 w-full"
              value={newMachine.ur}
              onChange={handleChange}
            />
          </div>

          <div>
            <h3>Description UR :</h3>
            <input
              name="descriptionUR"
              className="border-2 rounded border-slate-900 w-full"
              value={newMachine.descriptionUR}
              onChange={handleChange}
            />
          </div>

          <div>
            <h3>Responsable production :</h3>
            <input
              name="responsableProdMachine"
              className="border-2 rounded border-slate-900 w-full"
              value={newMachine.responsableProdMachine}
              onChange={handleChange}
            />
          </div>

        </div>

        {/* COLONNE 3 */}
        <div className="w-1/3">
          <h3>Description :</h3>
          <textarea
            name="description"
            className="border-2 rounded border-slate-900 w-full h-60 p-2"
            value={newMachine.description}
            onChange={handleChange}
          />

        <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        >
        Valider
        </button>
        </div>

      </div>
        {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-600 bg-opacity-40 z-50">
            <div className="bg-white px-8 py-6 rounded-xl shadow-xl text-lg font-semibold text-green-600">
            ✅ Machine ajouté
            </div>
        </div>
        )}
    </div>
  )
}

export default AjoutMachine
