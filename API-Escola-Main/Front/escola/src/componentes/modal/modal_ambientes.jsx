import React, { useEffect, useState } from "react";

const ModalAmbientes = ({
    isOpen = false, 
    onClose = () => {}, 
    ambienteSelecionado, 
    criar,
    atualizar,
}) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        codigo: "",
        sala: "",
        capacidade: "",
        responsavel: "",
        periodo: "M",
    });

    useEffect(() => {
        if (ambienteSelecionado) {
            setFormData({
                codigo: ambienteSelecionado.codigo || "",
                sala: ambienteSelecionado.sala || "",
                capacidade: ambienteSelecionado.capacidade || "",
                responsavel: ambienteSelecionado.responsavel || "",
                periodo: ambienteSelecionado.periodo || "M",
            });
        } else {
            setFormData({
                codigo: "",
                sala: "",
                capacidade: "",
                responsavel: "",
                periodo: "M",
            });
        }
    }, [ambienteSelecionado]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ambienteSelecionado) {
            atualizar({ ...ambienteSelecionado, ...formData });
        } else {
            criar(formData);
        }
        onClose();
    };

    return (
        <div className="container-modal">
            <div className="modal">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>{ambienteSelecionado ? "Editar Ambiente" : "Cadastrar Ambiente"}</h2>
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
                        name="sala"
                        placeholder="Sala"
                        value={formData.sala}
                        onChange={handleChange}
                        required
                    /> <br />

                    <input
                        type="number"
                        name="capacidade"
                        placeholder="Capacidade"
                        value={formData.capacidade}
                        onChange={handleChange}
                        required
                    /> <br />

                    <input
                        type="text"
                        name="responsavel"
                        placeholder="Responsável"
                        value={formData.responsavel}
                        onChange={handleChange}
                        required
                    /> <br />

                    <select
                        name="periodo"
                        value={formData.periodo}
                        onChange={handleChange}
                        required
                    >
                        <option value="M">Manhã</option>
                        <option value="T">Tarde</option>
                        <option value="N">Noite</option>
                        <option value="S">Sábado</option>
                    </select> <br />

                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>
    );
};

export default ModalAmbientes;