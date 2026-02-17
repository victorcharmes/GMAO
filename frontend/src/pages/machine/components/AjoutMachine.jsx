import { useState } from "react"
import "../style.css"
import iconeFlecheEnArriere from "../style/iconeFlecheEnArriere.svg"

function AjoutMachine({ machines = [], criticite = [], classe = [], emplacement = [], ur = [], setView  }) {

    const [showPopup, setShowPopup] = useState(false)
    
    const initialState = {
      nom: "",
      criticite: "",
      classeOuverture: "",
      emplacement: "",
      ur: "",
      descriptionUR: "",
      responsableProdMachine: "",
      description: "",
      dateImplementation: ""
    }
    const [newMachine, setNewMachine] = useState(initialState)
    
    const handleSubmit = async () => {
      try {
        const response = await fetch("http://localhost:8081/machine", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newMachine)
        });

        if (!response.ok) {
          throw new Error("Erreur serveur");
        }

        const data = await response.json();
        console.log("Machine enregistrée :", data);

        setShowPopup(true);
        setNewMachine(initialState);

        setTimeout(() => {
          setShowPopup(false);
        }, 1500);

      } catch (error) {
        console.error("Erreur :", error);
      }
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
              <select
                name="criticite"
                className="border-2 rounded border-slate-900 w-full text-black bg-gray-200"
                value={newMachine.criticite}
                onChange={handleChange}
              >
                <option value="">-- Sélectionner --</option>

                {criticite.map((c) => (
                  <option
                    key={c.idCriticiteMachine} //key
                    value={c.idCriticiteMachine} //valeur envoyé dans le State
                  >
                    {c.criticiteMachine} {/*valeur affiché */}
                  </option>
                ))}
              </select>
          </div>

          <div>
            <h3>Classe :</h3>
              <select
                name="classeOuverture"
                className="border-2 rounded border-slate-900 w-full text-black bg-gray-200"
                value={newMachine.classeOuverture}
                onChange={handleChange}
              >
                <option value="">-- Sélectionner --</option>

                {classe.map((c) => (
                  <option
                    key={c.idClasseMachine}
                    value={c.idClasseMachine}
                  >
                    {c.classeMachine}
                  </option>
                ))}
              </select>
          </div>

          <div>
            <h3>Emplacement :</h3>
              <select
                name="emplacement"
                className="border-2 rounded border-slate-900 w-full text-black bg-gray-200"
                value={newMachine.emplacement}
                onChange={handleChange}
              >
                <option value="">-- Sélectionner --</option>

                {emplacement.map((e) => (
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

        {/* COLONNE 2 */}
        <div className="w-1/3 space-y-4">

          <div>
            <h3>Unité de Réalisation :</h3>
              <select
                name="ur"
                className="border-2 rounded border-slate-900 w-full text-black bg-gray-200"
                value={newMachine.ur}
                onChange={handleChange}
              >
                <option value="">-- Sélectionner --</option>

                {ur.map((u) => (
                  <option
                    key={u.idUr}
                    value={u.idUr}
                  >
                    {u.nomUr}
                  </option>
                ))}
              </select>
              <h3>Date d'implémentation :</h3>
              <input
                type="date"
                name="dateImplementation"
                className="border-2 rounded border-slate-900 w-full text-black bg-gray-200"
                value={newMachine.dateImplementation}
                onChange={handleChange}
              />
              <h3>Image :</h3>
              <p className="border-2 rounded border-slate-900 w-full bg-gray-200 text-slate-900 p-1.5">Pour l'image, se rendre dans le dossier suivant: /GMAO/public/photosMachine/ (Attention à bien faire correspondre le nom de la machine).</p>
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
