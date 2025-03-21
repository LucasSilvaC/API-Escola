import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import ModalTurmas from "../modal/modal_turmas";  
import { FaTrash, FaPlus } from "react-icons/fa";
import { MdCreate } from "react-icons/md";
import { IoReaderSharp } from "react-icons/io5";
import axios from "axios";

export default function Turma() {
    const [dados, setDados] = useState([]); 
    const token = localStorage.getItem('token');
    const [modalOpen, setModalOpen] = useState(false);
    const [turmaSelecionada, setTurmaSelecionada] = useState(null); 
    const [seta, setSeta] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) return;
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/turmas', {  
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
                await axios.delete(`http://127.0.0.1:8000/api/turma/${id}`, {  
                    headers: { Authorization: `Bearer ${token}` }
                });
                setDados(dados.filter((dado) => dado.id !== id));
                setSeta(!seta);
            } catch (error) {
                console.log("Erro ao apagar dados:", error);
            }
        }
    };

    const criar = async (novaTurma) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/turmas',  
                novaTurma,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setDados([...dados, response.data]); 
            setModalOpen(false);
        } catch (error) {
            console.log("Erro ao criar turma:", error);
        }
    };

    const atualizar = async (turmaAtualizada) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/turma/${turmaAtualizada.id}`,  
                turmaAtualizada,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setDados(dados.map((turma) =>
                turma.id === turmaAtualizada.id ? turmaAtualizada : turma
            ));
            setModalOpen(false);
        } catch (error) {
            alert("Erro ao atualizar turma:", error);
        }
    };

    return (
        <>
            <Header />
            <h2>Lista de Turmas</h2>
            <FaPlus className="icon" onClick={() => { setModalOpen(true), setTurmaSelecionada(null) }} />
            <IoReaderSharp className="icon" /><br />
            <input type="text" placeholder="Buscar ID..." /> <br />
            <input type="text" placeholder="Buscar turma..." />
            <table>
                <thead>
                    <tr>
                        <th>Ações</th>
                        <th>ID</th>
                        <th>Código</th>
                        <th>Turma</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((dado) => (
                        <tr key={dado.id}>
                            <td>
                                <FaTrash className="icon" onClick={() => apagar(dado.id)} />
                                <MdCreate className="icon" onClick={() => {
                                    setModalOpen(true);
                                    setTurmaSelecionada(dado);
                                }} />
                            </td>
                            <td>{dado.id}</td>
                            <td>{dado.codigo}</td>
                            <td>{dado.turma}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ModalTurmas 
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                turmaSelecionada={turmaSelecionada} 
                criar={criar}
                atualizar={atualizar}
            />
            <Footer />
        </>
    );
}