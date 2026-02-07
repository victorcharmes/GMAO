import Validation from "./Validation";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  function handleSuccess() {
    navigate("/accueil");
  }

  return (
    <div className="min-h-screen bg-slate-700 pt-10 text-white">
      <h1 className="text-center text-2xl mb-6">Login</h1>
      <Validation onSuccess={handleSuccess} />
    </div>
  );
}
