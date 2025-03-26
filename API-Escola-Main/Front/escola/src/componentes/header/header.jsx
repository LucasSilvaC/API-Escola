import { useNavigate } from "react-router-dom";
import "../header/style.css";

export default function Header() {
    const navigate = useNavigate(); 
    return (
        <header>
            <h1>Escola</h1>
            <ul>
                <li onClick={() => navigate("/home")}>Home</li>
                <li onClick={() => navigate("/register")}>Registrar</li>
                <li onClick={() => navigate("/login")}>Login</li>
                <li onClick={() => navigate("/subject")}>Disciplinas</li>
                <li onClick={() => navigate("/ambiente")}>Ambientes</li>
                <li onClick={() => navigate("/cursos")}>Cursos</li>
                <li onClick={() => navigate("/turmas")}>Turmas</li>
            </ul>
        </header>
    );
}