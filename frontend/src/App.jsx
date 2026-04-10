import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Accueil from "./pages/accueil/Accueil";
import Machine from "./pages/machine/Machine";
import Stock from "./pages/stock/Stock";
import Panne from "./pages/panne/Panne";
import Intervention from "./pages/intervention/Intervention";
import Indicateur from "./pages/indicateur/Indicateur";

function App() {
  return (
    <div className="h-screen flex flex-col flex-1 overflow-y-auto"> 
    {/*Scroll bloqué si pas d'éléments, permet si éléments */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/machine" element={<Machine />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/panne" element={<Panne />} />
        <Route path="/intervention" element={<Intervention />} />
        <Route path="/indicateur" element={<Indicateur />} />
      </Routes>
    </div>
  );
}

export default App;