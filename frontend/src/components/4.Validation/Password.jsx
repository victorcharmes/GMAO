export default function Password ({inputStates, setInputsStates, showValidation}){
    return(
        <>
            <label htmlFor="password" className="text-slate-50 inline-block mt-5">Saisir votre mot de passe
            </label>
            <input 
            id="password"
            type="password"
            className="rounded w-full p-1 mt-2 border border-slate-300"
            value={inputStates.password}
            onChange={e => setInputsStates({...inputStates, password: e.target.value})}
            />
            {(showValidation.password) && (
                <p className="text-red-400 font-bold">
                    Mdp non conforme
                </p>
            )}
        </>
    )
}