import { useNavigate } from "react-router-dom";
import "./style.css";

export default function Header() {
  const navigate = useNavigate();

  const handleLeave = () => {
    localStorage.removeItem("shop_token");
    navigate("/");
  }

  return (
    <header>
      <h1>Storage</h1>
      <button onClick={handleLeave}>Sair</button>
    </header>
  );
}
