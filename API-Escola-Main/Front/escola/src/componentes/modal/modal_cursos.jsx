import React, { useEffect, useState } from "react";

const ModalCursos = ({
    isOpen = false,
    onClose = () => {}, 
    cursoSelecionado, 
    criar,
    atualizar,
}) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        codigo: "",
        curso: "",
        sigla: "",
        tipo: "FIC", 
        hora_aula: "",
    });

    useEffect(() => {
        if (cursoSelecionado) {
            setFormData({
                codigo: cursoSelecionado.codigo || "",
                curso: cursoSelecionado.curso || "",
                sigla: cursoSelecionado.sigla || "",
                tipo: cursoSelecionado.tipo || "FIC",
                hora_aula: cursoSelecionado.hora_aula || "",
            });
        } else {
            setFormData({
                codigo: "",
                curso: "",
                sigla: "",
                tipo: "FIC",
                hora_aula: "",
            });
        }
    }, [cursoSelecionado]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cursoSelecionado) {
            atualizar({ ...cursoSelecionado, ...formData });
        } else {
            criar(formData);
        }
        onClose();
    };

    return (
        <div className="container-modal">
            <div className="modal">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>{cursoSelecionado ? "Editar Curso" : "Cadastrar Curso"}</h2>
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
                        name="curso"
                        placeholder="Curso"
                        value={formData.curso}
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

                    <select
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                        required
                    >
                        <option value="FIC">FIC</option>
                        <option value="CS">CS</option>
                        <option value="CT">CT</option>
                        <option value="CAI">CAI</option>
                    </select> <br />

                    <input
                        type="time"
                        name="hora_aula"
                        placeholder="Hora da Aula"
                        value={formData.hora_aula}
                        onChange={handleChange}
                        required
                    /> <br />

                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>
    );
};

export default ModalCursos;