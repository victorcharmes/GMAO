import iconeFlecheEnArriere from "../style/iconeFlecheEnArriere.svg";

function ModificationMachine({ setView }) {
    return(
        <div className="pt-20">
            Modif

            <img 
                src={iconeFlecheEnArriere} 
                alt="Retour"
                width="40"
                className="cursor-pointer"
                onClick={() => setView("selection")}
            />
        </div>
    )
}

export default ModificationMachine;
