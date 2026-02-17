import { useState } from "react"
import "../style.css"
import iconeModificationMachine from "../style/iconeModificationMachine.svg";
import iconeAjoutMachine from "../style/iconeAjoutMachine.svg";




function SelectionMachine({ machines = [], criticite = [], classe = [], emplacement = [], ur = [], setView  }) {
  const [selectedMachine, setSelectedMachine] = useState(null)

  const handleChange = (e) => {
    const selectedName = e.target.value

    const machine = machines.find(
      (m) => m.nom === selectedName
    )

    setSelectedMachine(machine)
  }

return (
  <div className="mt-20 px-10">

    <div className="flex gap-10">

      {/* ================= COLONNE 1 ================= */}
      <div className="w-1/3 space-y-6">

        {/* Icônes */}
        <div className="flex gap-4">
          <img src={iconeModificationMachine} alt="Modification machine" width="40"     className="cursor-pointer" onClick={() => setView("modification")} />
          <img src={iconeAjoutMachine} alt="Ajout machine" width="40"     className="cursor-pointer"
          onClick={() => setView("ajout")}/>
        </div>

        {/* Sélection machine */}
        <div>
          <h3>Nom de la machine :</h3>
          <input
            list="machinesList"
            className="border-2 rounded border-slate-900 w-full"
            placeholder="Choisir ou saisir..."
            onChange={handleChange}
          />

          <datalist id="machinesList">
            {machines.map(machine => (
              <option key={machine.id} value={machine.nom} />
            ))}
          </datalist>
        </div>

        {/* Infos machine */}
        <div className="space-y-4">
          <div>
            <h3>Criticité :</h3>
            <input
              className="border-2 rounded border-slate-900 w-full"
              value={selectedMachine?.criticite || ""}
              readOnly
            />
          </div>

          <div>
            <h3>Classe :</h3>
            <input
              className="border-2 rounded border-slate-900 w-full"
              value={selectedMachine?.descriptionClasseOuverture || ""}
              readOnly
            />
          </div>

          <div>
            <h3>Emplacement :</h3>
            <input
              className="border-2 rounded border-slate-900 w-full"
              value={selectedMachine?.emplacement || ""}
              readOnly
            />
          </div>
        </div>
        


      </div>

      {/* ================= COLONNE 2 ================= */}
      <div className="w-1/3 flex flex-col items-center gap-6">

        <div className="w-full">
          <h3>Unité de Réalisation :</h3>
          <input
            className="border-2 rounded border-slate-900 w-full"
            value={
            selectedMachine?.ur && selectedMachine?.descriptionUR
              ? `${selectedMachine.ur}, ${selectedMachine.descriptionUR}`
              : ""
          }
            readOnly
          />
        </div>

        <div className="w-full">
          <h3>Responsable production :</h3>
          <input
            className="border-2 rounded border-slate-900 w-full"
            value={selectedMachine?.responsableProdMachine || ""}
            readOnly
          />
        </div>

        <div className="w-full">
          <h3>UR :</h3>
          <input
            className="border-2 rounded border-slate-900 w-full"
            value={selectedMachine?.ur || ""}
            readOnly
          />
        </div>

        {selectedMachine && (
          <div className="border-2 rounded border-slate-900 p-2">
            <img
              src={`/photosMachines/${selectedMachine.nom}.jpg`}
              alt={selectedMachine.nom}
              className="max-w-full"
            />
          </div>
        )}

      </div>

      {/* ================= COLONNE 3 ================= */}
      <div className="w-1/3">
        <h3>Description :</h3>
        <textarea
          className="border-2 rounded border-slate-900 w-full h-60 p-2"
          value={selectedMachine?.description || ""}
          readOnly
        />
      </div>

    </div>

  </div>
)

}

export default SelectionMachine
