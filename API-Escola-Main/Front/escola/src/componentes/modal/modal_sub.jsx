import React, { useEffect, useState } from "react";
import "./style.css"; 

const ModalDisciplinas = ({
    isOpen = false, // Define se o modal está aberto ou fechado
    onClose = () => {}, // Função para fechar o modal
    disciplinaSelecionada, 
    criar,
    atualizar,
}) => {
    // Se o modal não estiver aberto, não renderiza nada
    if (!isOpen) return null;

    // Armazena os dados do formulário
    const [formData, setFormData] = useState({
        id: "",
        nome: "",
        sigla: "",
        cod_sigla: "",
        carga_horaria: "",
        professor: "", // Adicionado o campo para professor
    });

    // useEffect executa toda vez que disciplinaSelecionada muda
    useEffect(() => {
        if (disciplinaSelecionada) {
            setFormData({
                id: disciplinaSelecionada.id || "",
                nome: disciplinaSelecionada.nome || "",
                sigla: disciplinaSelecionada.sigla || "",
                cod_sigla: disciplinaSelecionada.cod_sigla || "",
                carga_horaria: disciplinaSelecionada.carga_horaria || "",
                professor: disciplinaSelecionada.professor || "", // Preenche com o professor
            });
        } else {
            setFormData({
                id: "",
                nome: "",
                sigla: "",
                cod_sigla: "",
                carga_horaria: "",
                professor: "", // Reseta o professor
            });
        }
    }, [disciplinaSelecionada]); 

    // Atualiza o estado conforme os inputs do formulário são alterados
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Se estiver editando uma disciplina, chama a função atualizar() e se criar chama a criar()
    const handleSubmit = (e) => {
        e.preventDefault();
        if (disciplinaSelecionada) {
            atualizar({ ...disciplinaSelecionada, ...formData });
        } else {
            criar(formData);
        }
        onClose();
    };

    return (
        <div className="container-modal">
            <div className="modal">
                <button className="close-button" onClick={onClose}>X</button>
                
                <h2>{disciplinaSelecionada ? "Editar Disciplina" : "Cadastrar Disciplina"}</h2>

                <form onSubmit={handleSubmit} className="container-input">
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    /> <br />

                    <input
                        type="text"
                        name="sigla"
                        placeholder="Sigla"
                        value={formData.sigla}
                        onChange={handleChange}
                        required
                    /> <br />

                    <input
                        type="number"
                        name="cod_sigla"
                        placeholder="Código da Sigla"
                        value={formData.cod_sigla}
                        onChange={handleChange}
                        required
                    /> <br />

                    <input
                        type="number"
                        step="0.1"
                        name="carga_horaria"
                        placeholder="Carga Horária"
                        value={formData.carga_horaria}
                        onChange={handleChange}
                        required
                    /> <br />

                    <input
                        type="text"
                        name="professor"
                        placeholder="ID do Professor"
                        value={formData.professor}
                        onChange={handleChange}
                        required
                    /> <br />

                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>
    );
};

export default ModalDisciplinas;