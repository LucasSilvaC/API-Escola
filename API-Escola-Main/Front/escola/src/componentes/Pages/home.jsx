import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import ModalProfessores from "../modal/modal.jsx";
import { FaTrash, FaPlus } from "react-icons/fa";
import { MdCreate } from "react-icons/md";
import { IoReaderSharp } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import axios from "axios";

export default function Home() {
    const [dados, setDados] = useState([]); //setDados coloca os dados do JSON na variável dados que é uma lista
    const token = localStorage.getItem('token');
    const [modalOpen, setmodalOpen] = useState(false)
    const [professorSelecionado, setProfessorSelecionado] = useState(null)
    const [seta, setSeta] = useState(false) //Atualiza a tabela sem precisar de f5
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    useEffect(() => {
        if (!token) return;
        const fetchData = async () => {  //Async = assincrona, que é executada em segundo plano
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/professores', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setDados(response.data);
                setmodalOpen(false);
            } catch (error) {
                console.log("Erro ao buscar dados:", error);
            }
        };
        fetchData(); //Chamando ela para executar
    }, [token, seta]);

    const apagar = async (id) => {
        if (window.confirm("Deseja realmente apagar?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/professor/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setDados(dados.filter((dado) => dado.ni !== id));
                setSeta(!seta)
            } catch (error) {
                console.log("Erro ao apagar dados:", error);
            }
        }
    };

    const criar = async (novoProfessor) => {
        console.log("Enviando dados para criação/atualização do professor:", novoProfessor);
        try {
            const formData = new FormData();
            formData.append("nome", novoProfessor.nome);
            formData.append("email", novoProfessor.email);
            formData.append("tel", novoProfessor.tel);
            formData.append("ocupacao", novoProfessor.ocupacao);
            formData.append("carga_horaria_prof", novoProfessor.carga_horaria_prof);
            
            if (novoProfessor.foto) {
                formData.append("foto", novoProfessor.foto);
            }
            
            const response = await axios.post('http://127.0.0.1:8000/api/professores', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data' 
                }
            });
    
            setDados([...dados, response.data]); 
            setmodalOpen(false);
        } catch (error) {
            console.log("Erro ao criar professor:", error.response ? error.response.data : error.message);
        }        
    };

    const atualizar = async (ProfessorAtualizado) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/professor/${ProfessorAtualizado.id}`,
                ProfessorAtualizado,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
    
            setDados(dados.map((professor) =>
                professor.id === ProfessorAtualizado.id ? ProfessorAtualizado : professor
            ));
            setmodalOpen(false);
        } catch (error) {
            alert("Erro ao atualizar professor:", error);
        }
    };    

    return (
        <>
            <Header />
            <h2>Lista de Professores</h2>
            <FaPlus className="icon" onClick={() => { setmodalOpen(true), setProfessorSelecionado(null) }} />
            <IoReaderSharp className="icon" />
            <IoIosLogOut className="icon" onClick={logout} /><br />
            <input type="text" placeholder="Buscar ID..." /> <br />
            <input type="text" placeholder="Buscar professor..." />
            <table>
                <thead>
                    <tr>
                        <th>Ações</th>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Ocupação</th>
                        <th>Carga Horária</th> 
                    </tr>
                </thead>
                <tbody>
                    {dados.map((dado) => (
                        <tr key={dado.ni}>
                            <td>
                                <FaTrash className="icon" onClick={() => apagar(dado.id)} />
                                <MdCreate className="icon" onClick={() => {
                                    setmodalOpen(true);
                                    setProfessorSelecionado(dado);
                                }} />
                            </td>
                            <td>{dado.ni}</td>
                            <td>{dado.nome}</td>
                            <td>{dado.email}</td>
                            <td>{dado.tel}</td>
                            <td>{dado.ocupacao}</td>
                            <td>{dado.carga_horaria_prof}</td> 
                        </tr>
                    ))}
                </tbody>
            </table>
            <ModalProfessores
                isOpen={modalOpen}
                onClose={() => setmodalOpen(false)}
                professorSelecionado={professorSelecionado}
                setProfessorSelecionado={setProfessorSelecionado}
                criar={criar}
                atualizar={atualizar}
            />
            <Footer />
        </>
    );
}