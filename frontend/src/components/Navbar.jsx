import { useState} from "react"
import hamburger from "../styles/assets/hamburger.svg"
import close from "../styles/assets/close.svg"
import { Link } from "react-router-dom"

export default function Navbar(){
    const[ showMenu, setShowMenu] = useState(false)
    return(
        <nav className="fixed top-0 w-full flex justify-center p-2 bg-slate-900">
            <img className="w-12 h-12  mx-auto pl-5" src="src/styles/logo/Logo.svg" alt="logo" />
            <ul className= {`${showMenu ? "flex" : "hidden"} flex-col items-center bg-slate-900 w-full absolute top-full pb-5 justify-center
            sm:flex sm:relative sm:flex-row sm:pb-0 `}>
                <li> 
                   <Link
                    to="/accueil"
                    className = "inline-block py-2 mx-6 text-lg sm:py-0"
                   >
                        Accueil
                   </Link>
                </li>
                <li> 
                   <Link
                    to="/machine"
                    className = "inline-block py-2 mx-6 text-lg sm:py-0"
                   >
                        Machine
                   </Link>
                </li>
                <li> 
                   <a className = "inline-block py-2 mx-6 text-lg sm:py-0" href="#"> Panne </a> 
                </li>
                <li> 
                   <a className = "inline-block py-2 mx-6 text-lg sm:py-0" href="#"> Intervention </a> 
                </li>
                <li> 
                   <a className = "inline-block py-2 mx-6 text-lg sm:py-0" href="#"> Stock </a> 
                </li>
                <li> 
                   <a className = "inline-block py-2 mx-6 text-lg sm:py-0" href="#"> Indicateur</a> 
                </li>
            </ul>
            <button
            onClick={()=> setShowMenu(!showMenu)}
            className="ml-auto sm:hidden"
            >
                <img 
                className="w-4"
                src={showMenu ? close : hamburger} alt={showMenu ? "Cacher le menu" : "Montrer le menu"} />
            </button>
        </nav>
    )

}