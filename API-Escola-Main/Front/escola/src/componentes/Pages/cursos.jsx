import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import ModalCursos from "../modal/modal_cursos";  // Componente ModalCursos
import { FaTrash, FaPlus } from "react-icons/fa";
import { MdCreate } from "react-icons/md";
import { IoReaderSharp } from "react-icons/io5";
import axios from "axios";

export default function Cursos() {
    const [dados, setDados] = useState([]); 
    const token = localStorage.getItem('token');
    const [modalOpen, setModalOpen] = useState(false);
    const [cursoSelecionado, setCursoSelecionado] = useState(null);
    const [seta, setSeta] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) return;
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/cursos', {
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
                await axios.delete(`http://127.0.0.1:8000/api/curso/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setDados(dados.filter((dado) => dado.id !== id));
                setSeta(!seta);
            } catch (error) {
                console.log("Erro ao apagar dados:", error);
            }
        }
    };

    const criar = async (novoCurso) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/cursos',
                novoCurso,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setDados([...dados, response.data]); 
            setModalOpen(false);
        } catch (error) {
            console.log("Erro ao criar curso:", error);
        }
    };

    const atualizar = async (cursoAtualizado) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/curso/${cursoAtualizado.id}`,
                cursoAtualizado,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setDados(dados.map((curso) =>
                curso.id === cursoAtualizado.id ? cursoAtualizado : curso
            ));
            setModalOpen(false);
        } catch (error) {
            alert("Erro ao atualizar curso:", error);
        }
    };

    return (
        <>
            <Header />
            <h2>Lista de Cursos</h2>
            <FaPlus className="icon" onClick={() => { setModalOpen(true), setCursoSelecionado(null) }} />
            <IoReaderSharp className="icon" /><br />
            <input type="text" placeholder="Buscar ID..." /> <br />
            <input type="text" placeholder="Buscar curso..." />
            <table>
                <thead>
                    <tr>
                        <th>Ações</th>
                        <th>ID</th>
                        <th>Código</th>
                        <th>Curso</th>
                        <th>Sigla</th>
                        <th>Tipo</th>
                        <th>Hora Aula</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((dado) => (
                        <tr key={dado.id}>
                            <td>
                                <FaTrash className="icon" onClick={() => apagar(dado.id)} />
                                <MdCreate className="icon" onClick={() => {
                                    setModalOpen(true);
                                    setCursoSelecionado(dado);
                                }} />
                            </td>
                            <td>{dado.id}</td>
                            <td>{dado.codigo}</td>
                            <td>{dado.curso}</td>
                            <td>{dado.sigla}</td>
                            <td>{dado.tipo}</td>
                            <td>{dado.hora_aula}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ModalCursos
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                cursoSelecionado={cursoSelecionado}
                criar={criar}
                atualizar={atualizar}
            />
            <Footer />
        </>
    );
}