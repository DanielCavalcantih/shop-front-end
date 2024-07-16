import { useState } from "react";
import shop from "../images/shop.png";
import "../styles/login.css";
import { login, registerUser } from "../services/user";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../utils/validation";
import { errorAlert, successAlert } from "../utils/alets";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [loginRegister, setLoginRegister] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginRegister = async (e) => {
    e.preventDefault();
    if (loginRegister === "login") {
      try {
        const response = await login({ email, password });
        if (response) {
          navigate("/home");
        }
      } catch (error) {
        error.response
          ? errorAlert(error.response.data.message)
          : errorAlert("Problemas com a conexão com o servidor!");
      }
    } else {
      try {
        if (
          name.length > 3 &&
          validateEmail(email) &&
          validatePassword(password)
        ) {
          const response = await registerUser({ name, email, password });
          if (response) {
            successAlert(response.data.message);
            setEmail("");
            setPassword("");
            setName("");
            setShowPassword(false);
            setLoginRegister("login");
          }
        } else if (
          !validateEmail(email) ||
          !validatePassword(password) ||
          name.length < 3
        ) {
          errorAlert("Verifique os campos e tente novamente!");
        }
      } catch (error) {
        error.response
          ? errorAlert(error.response.data.message)
          : errorAlert("Problemas com a conexão com o servidor!");
      }
    }
  };

  return (
    <div className="container-login">
      <div className="img-title">
        <h1>Shop</h1>
        <img src={shop} alt="Imagem de shop" />
      </div>
      <div className="container-form">
        <form onSubmit={handleLoginRegister}>
          <h1 className="title">Shop</h1>
          <h2>Bem vindo(a)</h2>
          {loginRegister === "login" ? (
            <>
              <input
                placeholder="E-mail (exemplo@exemplo.com)"
                type="text"
                onChange={({ target }) => setEmail(target.value)}
                value={email}
              />
              <div className="password-input">
                <input
                  className="password-field"
                  placeholder="Senha (min 8 caracteres)"
                  type={showPassword ? "text" : "password"}
                  onChange={({ target }) => setPassword(target.value)}
                  value={password}
                />
                <button
                  className="eye"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
              <button type="submit" className="login-register-button">
                Entrar
              </button>
            </>
          ) : (
            <>
              <input
                placeholder="Nome"
                type="text"
                onChange={({ target }) => setName(target.value)}
                value={name}
              />
              <input
                placeholder="E-mail (exemplo@exemplo.com)"
                type="text"
                onChange={({ target }) => setEmail(target.value)}
                value={email}
              />
              <div>
                <div className="password-input">
                  <input
                    className="password-field"
                    placeholder="Senha (min 8 caracteres)"
                    type={showPassword ? "text" : "password"}
                    onChange={({ target }) => setPassword(target.value)}
                    value={password}
                  />
                  <button
                    className="eye"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>
                <p className="info-pass">
                  Deve conter caractere especial, letra maiúscula e número.
                </p>
              </div>
              <button className="login-register-button" type="submit">
                Cadastrar
              </button>
            </>
          )}
        </form>
        {loginRegister === "login" ? (
          <p className="text-account">
            Ainda não possui uma conta?{" "}
            <button
              className="register-button"
              onClick={() => {
                setPassword("");
                setShowPassword(false);
                setLoginRegister("register");
              }}
            >
              Cadastre-se
            </button>
          </p>
        ) : (
          <p>
            Já possui uma conta?{" "}
            <button
              className="register-button"
              onClick={() => {
                setEmail("");
                setPassword("");
                setName("");
                setShowPassword(false);
                setLoginRegister("login");
              }}
            >
              Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
