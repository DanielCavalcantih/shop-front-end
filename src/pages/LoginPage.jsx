import { useState } from "react";
import shop from "../images/shop.png";
import "../styles/login.css";
import { login } from "../services/login";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      if (response) {
        navigate("/home");
      }
    } catch (error) {
      setErrorText(error.response.data.message);
      setTimeout(() => {
        setErrorText(null);
      }, 4000);
    }
  };

  return (
    <div className="container-login">
      <div className="img-title">
        <h1>Shop</h1>
        <img src={shop} alt="Imagem de shop" />
      </div>
      <div className="container-form">
        <form onSubmit={handleLogin}>
          <h2>Bem vindo(a)</h2>
          <input
            placeholder="E-mail"
            type="email"
            onChange={({ target }) => setEmail(target.value)}
            value={email}
          />
          <input
            placeholder="Senha"
            type="password"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
          <button type="submit">Entrar</button>
          {errorText && <p className="error">{errorText}</p>}
        </form>
      </div>
    </div>
  );
}
