import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";
import { FaTrash, FaSearch } from "react-icons/fa";
import { MdCreate } from "react-icons/md";
import { IoReaderSharp } from "react-icons/io5";

export default function Home() {
    const [dados, setDados] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    console.log("Token Home", token);

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/professores', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setDados(response.data);
            } catch (error) {
                console.log("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, [token]);

    return (
        <>
            <Header />
            <h2>Lista de Professores</h2>
            <table>
                <thead>
                    <tr>
                        <th>Ações</th>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Ocupação</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((dado) => (
                        <tr key={dado.ni}>
                            <td>
                                <FaSearch className="icon" /> 
                                <FaTrash className="icon" /> 
                                <MdCreate className="icon" /> 
                                <IoReaderSharp className="icon" />
                            </td>
                            <td>{dado.ni}</td>
                            <td>{dado.nome}</td>
                            <td>{dado.email}</td>
                            <td>{dado.tel}</td>
                            <td>{dado.ocupacao}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}