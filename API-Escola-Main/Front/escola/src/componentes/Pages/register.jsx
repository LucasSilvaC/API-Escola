import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const register = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("As senhas não coincidem!");
            return;
        }

        try {
            await axios.post("http://127.0.0.1:8000/api/register/", {
                username: formData.username,
                password: formData.password
            });

            const response = await axios.post("http://127.0.0.1:8000/api/token/", {
                username: formData.username,
                password: formData.password
            });

            localStorage.setItem("token", response.data.access);

            alert("Cadastro e login realizados com sucesso!");
            navigate("/login"); 
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            if (error.response && error.response.data) {
                setError(error.response.data.detail || "Erro ao criar conta. Tente novamente.");
            } else {
                setError("Erro ao criar conta. Tente novamente.");
            }
        }
    };

    return (
        <section style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        }}>
            <h1>Registrar</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={register}>
                <label style={{
                    display: "flex",
                    justifyContent: "center"
                }}>
                    Usuário:
                </label><br />
                <input
                    type="text"
                    name="username"
                    autoComplete="off"
                    required
                    placeholder="Digite seu nome"
                    value={formData.username}
                    onChange={handleChange}
                /><br />
                <label style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px"
                }}>
                    Senha:
                </label><br />
                <input
                    type="password"
                    name="password"
                    autoComplete="off"
                    required
                    placeholder="Digite sua senha"
                    value={formData.password}
                    onChange={handleChange}
                /><br />
                <label style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px"
                }}>
                    Confirme a senha:
                </label><br />
                <input
                    type="password"
                    name="confirmPassword"
                    autoComplete="off"
                    required
                    placeholder="Confirme sua senha"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                /><br />
                <button>Registre-se</button>
            </form>
            <button onClick={() => navigate("/")}>Voltar</button>
        </section>
    );
}