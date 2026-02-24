import iconeFlecheEnArriere from "../style/iconeFlecheEnArriere.svg"

function SelectionMachine({
    machines = [],
    setView
}) {

return(
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
                        Suppression de machine :
                    </h1>
                </div>

                {/* Liste des machines */}
                <div>
                    <h3>Liste des machines :</h3>

                    <select
                        className="border-2 rounded border-slate-900 w-full text-white"
                        defaultValue=""
                    >
                        <option value="" className="bg-slate-900">
                            -- Choisir une machine --
                        </option>

                        {machines.map(machine => (
                            <option
                                key={machine.id}
                                value={machine.id}
                                className="bg-slate-900"
                            >
                                {machine.nom}
                            </option>
                        ))}
                    </select>
                </div>

            </div>
        </div>
    </div>
)
}

export default SelectionMachine