import React, { useEffect, useState } from "react";

const ModalDisciplinas = ({
    isOpen = false,
    onClose = () => { },
    disciplinaSelecionada,
    criar,
    atualizar,
}) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        id: "",
        nome: "",
        sigla: "",
        cod_sigla: "",
        carga_horaria: "",
        professor: "",
    });

    useEffect(() => {
        if (disciplinaSelecionada) {
            setFormData({
                id: disciplinaSelecionada.id || "",
                nome: disciplinaSelecionada.nome || "",
                sigla: disciplinaSelecionada.sigla || "",
                cod_sigla: disciplinaSelecionada.cod_sigla || "",
                carga_horaria: disciplinaSelecionada.carga_horaria || "",
                professor: disciplinaSelecionada.professor ? String(disciplinaSelecionada.professor) : "",
            });
        } else {
            setFormData({
                id: "",
                nome: "",
                sigla: "",
                cod_sigla: "",
                carga_horaria: "",
                professor: "",
            });
        }
    }, [disciplinaSelecionada]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const disciplinaCorrigida = {
            ...formData,
            professor: formData.professor ? Number(formData.professor) : null,
        };

        console.log("Enviando dados para criação:", disciplinaCorrigida);

        if (disciplinaSelecionada) {
            atualizar(disciplinaCorrigida);
        } else {
            criar(disciplinaCorrigida);
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
                        type="number"
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