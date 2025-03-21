import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import ModalAmbientes from "../modal/modal_ambientes";
import { FaTrash, FaPlus } from "react-icons/fa";
import { MdCreate } from "react-icons/md";
import { IoReaderSharp } from "react-icons/io5";
import axios from "axios";

export default function Ambiente() {
    const [dados, setDados] = useState([]); 
    const token = localStorage.getItem('token');
    const [modalOpen, setModalOpen] = useState(false);
    const [ambienteSelecionado, setAmbienteSelecionado] = useState(null);
    const [seta, setSeta] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) return;
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/ambientes', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setDados(response.data);
                setModalOpen(false);
            } catch (error) {
                console.log("Erro ao buscar dados:", error);
            }
        };
        fetchData();
    }, [token, seta]);

    const apagar = async (id) => {
        if (window.confirm("Deseja realmente apagar?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/ambiente/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setDados(dados.filter((dado) => dado.id !== id));
                setSeta(!seta);
            } catch (error) {
                console.log("Erro ao apagar dados:", error);
            }
        }
    };

    const criar = async (novoAmbiente) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/ambientes',
                novoAmbiente,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setDados([...dados, response.data]); 
            setModalOpen(false);
        } catch (error) {
            console.log("Erro ao criar ambiente:", error);
        }
    };

    const atualizar = async (ambienteAtualizado) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/ambiente/${ambienteAtualizado.id}`,
                ambienteAtualizado,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setDados(dados.map((ambiente) =>
                ambiente.id === ambienteAtualizado.id ? ambienteAtualizado : ambiente
            ));
            setModalOpen(false);
        } catch (error) {
            alert("Erro ao atualizar ambiente:", error);
        }
    };

    return (
        <>
            <Header />
            <h2>Lista de Ambientes</h2>
            <FaPlus className="icon" onClick={() => { setModalOpen(true), setAmbienteSelecionado(null) }} />
            <IoReaderSharp className="icon" /><br />
            <input type="text" placeholder="Buscar ID..." /> <br />
            <input type="text" placeholder="Buscar ambiente..." />
            <table>
                <thead>
                    <tr>
                        <th>Ações</th>
                        <th>ID</th>
                        <th>Código</th>
                        <th>Sala</th>
                        <th>Capacidade</th>
                        <th>Responsável</th>
                        <th>Período</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((dado) => (
                        <tr key={dado.id}>
                            <td>
                                <FaTrash className="icon" onClick={() => apagar(dado.id)} />
                                <MdCreate className="icon" onClick={() => {
                                    setModalOpen(true);
                                    setAmbienteSelecionado(dado);
                                }} />
                            </td>
                            <td>{dado.id}</td>
                            <td>{dado.codigo}</td>
                            <td>{dado.sala}</td>
                            <td>{dado.capacidade}</td>
                            <td>{dado.responsavel}</td>
                            <td>{dado.periodo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ModalAmbientes
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                ambienteSelecionado={ambienteSelecionado}
                criar={criar}
                atualizar={atualizar}
            />
            <Footer />
        </>
    );
}