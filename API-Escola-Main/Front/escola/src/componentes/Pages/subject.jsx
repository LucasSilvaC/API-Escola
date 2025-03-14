import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import ModalDisciplinas from "../modal/modal_sub";
import { FaTrash, FaPlus } from "react-icons/fa";
import { MdCreate } from "react-icons/md";
import { IoReaderSharp } from "react-icons/io5";
import axios from "axios";

export default function DisciplinaHome() {
    const [dados, setDados] = useState([]); // Dados da tabela Disciplina
    const token = localStorage.getItem('token');
    const [modalOpen, setModalOpen] = useState(false);
    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);
    const [seta, setSeta] = useState(false); // Atualiza a tabela sem precisar de f5
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) return;
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/disciplinas', {
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
                await axios.delete(`http://127.0.0.1:8000/api/disciplina/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setDados(dados.filter((dado) => dado.id !== id));
                setSeta(!seta);
            } catch (error) {
                console.log("Erro ao apagar dados:", error);
            }
        }
    };

    const criar = async (novaDisciplina) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/disciplinas',
                novaDisciplina,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setDados([...dados, response.data]); // Adiciona a nova disciplina na lista
            setModalOpen(false);
        } catch (error) {
            console.log("Erro ao criar disciplina:", error);
        }
    };

    const atualizar = async (disciplinaAtualizada) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/disciplina/${disciplinaAtualizada.id}`,
                disciplinaAtualizada,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setDados(dados.map((disciplina) =>
                disciplina.id === disciplinaAtualizada.id ? disciplinaAtualizada : disciplina
            ));
            setModalOpen(false);
        } catch (error) {
            alert("Erro ao atualizar disciplina:", error);
        }
    };

    return (
        <>
            <Header />
            <h2>Lista de Disciplinas</h2>
            <FaPlus className="icon" onClick={() => { setModalOpen(true), setDisciplinaSelecionada(null) }} />
            <IoReaderSharp className="icon" /><br />
            <input type="text" placeholder="Buscar ID..." /> <br />
            <input type="text" placeholder="Buscar disciplina..." />
            <table>
                <thead>
                    <tr>
                        <th>Ações</th>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Sigla</th>
                        <th>Código da Sigla</th>
                        <th>Carga Horária</th>
                        <th>Professor</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((dado) => (
                        <tr key={dado.id}>
                            <td>
                                <FaTrash className="icon" onClick={() => apagar(dado.id)} />
                                <MdCreate className="icon" onClick={() => {
                                    setModalOpen(true);
                                    setDisciplinaSelecionada(dado);
                                }} />
                            </td>
                            <td>{dado.id}</td>
                            <td>{dado.nome}</td>
                            <td>{dado.sigla}</td>
                            <td>{dado.cod_sigla}</td>
                            <td>{dado.carga_horaria}</td>
                            <td>{dado.professor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ModalDisciplinas
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                disciplinaSelecionada={disciplinaSelecionada}
                criar={criar}
                atualizar={atualizar}
            />
            <Footer />
        </>
    );
}