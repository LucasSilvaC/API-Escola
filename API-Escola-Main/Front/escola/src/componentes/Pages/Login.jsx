import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');

    const logar = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/token/',
                {
                    username: user,
                    password: password
                }
            );
            console.log("Token Login: ", response.data.access);
            localStorage.setItem("token", response.data.access); 

            navigate("/");  
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert("Usuário ou senha incorretos!");
        }
    };

    return (
        <section style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        }}>
            <h1>Login</h1>
            <form onSubmit={logar}>
                <label htmlFor="name">
                    <span>Usuário:</span>
                </label><br />
                <input
                    type="text"
                    name="nome"
                    autoComplete="off"
                    required
                    placeholder="Digite seu nome"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                /><br />
                <label htmlFor="password">
                    <span>Senha:</span>
                </label><br />
                <input
                    type="password"
                    name="senha"
                    autoComplete="off"
                    required
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br />
                <button type="submit">Login</button>
            </form>

            <button onClick={() => navigate("/")}>Voltar</button>
        </section>
    );
}