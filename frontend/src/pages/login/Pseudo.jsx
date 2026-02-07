export default function Pseudo ({inputStates, setInputsStates, showValidation}){
    return(
        <>
            <label htmlFor="userName" className="text-slate-50">Votre identifiant                
            </label>
            <input 
            id="userName"
            type="text"
            className="rounded w-full p-1 mt-2 border border-slate-300"
            value={inputStates.pseudo}
            onChange={e => setInputsStates({...inputStates, pseudo: e.target.value})}
            />
            {(showValidation.pseudo) && (
                <p className="text-red-400 font-bold">
                    Pseudo non conforme
                </p>
            )}
        </>
    )
}