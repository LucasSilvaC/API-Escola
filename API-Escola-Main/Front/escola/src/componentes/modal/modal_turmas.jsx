import React, { useEffect, useState } from "react";

const ModalTurmas = ({
    isOpen = false, // Define se o modal está aberto ou fechado
    onClose = () => {}, // Função para fechar o modal
    turmaSelecionada, 
    criar,
    atualizar,
}) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        codigo: "",
        turma: "",
    });

    useEffect(() => {
        if (turmaSelecionada) {
            setFormData({
                codigo: turmaSelecionada.codigo || "",
                turma: turmaSelecionada.turma || "",
            });
        } else {
            setFormData({
                codigo: "",
                turma: "",
            });
        }
    }, [turmaSelecionada]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (turmaSelecionada) {
            atualizar({ ...turmaSelecionada, ...formData });
        } else {
            criar(formData);
        }
        onClose();
    };

    return (
        <div className="container-modal">
            <div className="modal">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>{turmaSelecionada ? "Editar Turma" : "Cadastrar Turma"}</h2>
                <form onSubmit={handleSubmit} className="container-input">
                    <input
                        type="text"
                        name="codigo"
                        placeholder="Código"
                        value={formData.codigo}
                        onChange={handleChange}
                        required
                    /> <br />

                    <input
                        type="text"
                        name="turma"
                        placeholder="Turma"
                        value={formData.turma}
                        onChange={handleChange}
                        required
                    /> <br />

                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>
    );
};

export default ModalTurmas;