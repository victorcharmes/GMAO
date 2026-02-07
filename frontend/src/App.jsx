import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Accueil from "./pages/accueil/Accueil";

function App() {
  return (
    <div className="min-h-screen bg-slate-700 pt-10">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/accueil" element={<Accueil />} />
      </Routes>
    </div>
  );
}

export default App;