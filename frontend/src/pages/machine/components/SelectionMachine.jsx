import { useState } from "react"
import "../style.css"

function SelectionMachine({ machines = [] }) {
  const [selectedMachine, setSelectedMachine] = useState(null)

  const handleChange = (e) => {
    const selectedName = e.target.value

    const machine = machines.find(
      (m) => m.nom === selectedName
    )

    setSelectedMachine(machine)
  }

  return (
    <div className="mt-25">
      <h3 className="ml-15">Nom de la machine:</h3>

      <input
        list="machinesList"
        className="border-2 rounded border-slate-900 ml-15"
        placeholder="Choisir ou saisir..."
        onChange={handleChange}
      />

      <datalist id="machinesList">
        {machines.map(machine => (
          <option key={machine.id} value={machine.nom} />
        ))}
      </datalist>

      <h3 className="ml-15 mt-10">Criticité :</h3>

      <input
        className="border-2 rounded border-slate-900 ml-15"
        value={selectedMachine?.criticite || ""}
        readOnly
      />
    </div>
  )
}

export default SelectionMachine
