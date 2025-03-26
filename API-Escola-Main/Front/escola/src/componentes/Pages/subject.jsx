import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import ModalDisciplinas from "../modal/modal_sub";
import { FaTrash, FaPlus } from "react-icons/fa";
import { MdCreate } from "react-icons/md";
import { IoReaderSharp } from "react-icons/io5";
import axios from "axios";

export default function Disciplina() {
    const [dados, setDados] = useState([]); // Dados da tabela Disciplina
    const [filtroId, setFiltroId] = useState("");
    const [filtroNome, setFiltroNome] = useState("");
    const token = localStorage.getItem('token');
    const [modalOpen, setModalOpen] = useState(false);
    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);
    const [seta, setSeta] = useState(false); // Atualiza a tabela sem precisar de f5
    const navigate = useNavigate();

    // Redirecionar para login caso o token não esteja presente
    useEffect(() => {
        if (!token) {
            navigate("/login"); // Substitua '/login' pela rota do seu login
        }
    }, [token, navigate]);

    useEffect(() => {
        if (!token) return;
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/disciplinas', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setDados(response.data);
            } catch (error) {
                console.error("Erro ao buscar dados:", error.response ? error.response.data : error.message);
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
                setSeta(!seta); // Atualiza a tabela
            } catch (error) {
                console.error("Erro ao apagar disciplina:", error.response ? error.response.data : error.message);
            }
        }
    };

    const criar = async (novaDisciplina) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/disciplinas', novaDisciplina, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDados([...dados, response.data]);
            setModalOpen(false);
        } catch (error) {
            console.error("Erro ao criar disciplina:", error.response ? error.response.data : error.message);
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
            alert("Erro ao atualizar disciplina:", error.response ? error.response.data : error.message);
        }
    };

    // Função para filtrar os dados
    const filtrarDados = () => {
        return dados.filter((dado) =>
            (filtroId ? dado.id.toString().includes(filtroId) : true) &&
            (filtroNome ? dado.nome.toLowerCase().includes(filtroNome.toLowerCase()) : true)
        );
    };

    return (
        <>
            <Header />
            <h2>Lista de Disciplinas</h2>
            <FaPlus className="icon" onClick={() => { setModalOpen(true), setDisciplinaSelecionada(null) }} />
            <IoReaderSharp className="icon" /><br />
            <input
                type="text"
                placeholder="Buscar ID..."
                value={filtroId}
                onChange={(e) => setFiltroId(e.target.value)}
            /><br />
            <input
                type="text"
                placeholder="Buscar disciplina..."
                value={filtroNome}
                onChange={(e) => setFiltroNome(e.target.value)}
            />
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
                    {filtrarDados().map((dado) => (
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