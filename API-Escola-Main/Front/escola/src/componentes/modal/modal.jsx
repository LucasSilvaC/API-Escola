import React, { useEffect, useState } from "react";

const ModalProfessores = ({
    isOpen = false, //Define se o modal está aberto ou fechado
    onClose = () => {}, //fechar o modal
    professorSelecionado, 
    criar,
    atualizar,
}) => {
    // Se o modal não estiver aberto, não renderiza nada
    if (!isOpen) return null;

    // Armazena os dados do formulário
    const [formData, setFormData] = useState({
        id: "",
        ni: "",
        nome: "",
        email: "",
        tel: "",
        ocupacao: "",
        carga_horaria_prof: "" // Adicionando campo carga_horaria_prof
    });

    // useEffect executa toda vez que professorSelecionado muda
    useEffect(() => {
        if (professorSelecionado) {
            setFormData({
                id: professorSelecionado.id || "",
                ni: professorSelecionado.ni || "",
                nome: professorSelecionado.nome || "",
                email: professorSelecionado.email || "",
                tel: professorSelecionado.tel || "",
                ocupacao: professorSelecionado.ocupacao || "",
                carga_horaria_prof: professorSelecionado.carga_horaria_prof || "", // Preenchendo o campo carga_horaria_prof
            });
        } else {
            setFormData({
                id: "",
                ni: "",
                nome: "",
                email: "",
                tel: "",
                ocupacao: "",
                carga_horaria_prof: "", // Resetando o campo carga_horaria_prof
            });
        }
    }, [professorSelecionado]); 

    // Atualiza o estado conforme os inputs do formulário são alterados
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Se estiver editando um professor, chama a função atualizar() e se criar chama a criar()
    const handleSubmit = (e) => {
        e.preventDefault();
        if (professorSelecionado) {
            atualizar({ ...professorSelecionado, ...formData });
        } else {
            criar(formData);
        }
        onClose();
    };

    return (
        <div className="container-modal">
            <div className="modal">
                <button className="close-button" onClick={onClose}>X</button>
                
                <h2>{professorSelecionado ? "Editar Professor" : "Cadastrar Professor"}</h2>

                <form onSubmit={handleSubmit} className="container-input">
                    <input
                        type="text"
                        name="ni"
                        placeholder="NI"
                        value={formData.ni}
                        onChange={handleChange}
                        required
                    /> <br />

                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    /> <br />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    /> <br />

                    <input
                        type="tel"
                        name="tel"
                        placeholder="Telefone"
                        value={formData.tel}
                        onChange={handleChange}
                        required
                    /> <br />

                    <input
                        type="text"
                        name="ocupacao"
                        placeholder="Ocupação"
                        value={formData.ocupacao}
                        onChange={handleChange}
                        required
                    /> <br />

                    <input
                        type="number"
                        name="carga_horaria_prof" 
                        placeholder="Carga Horária"
                        value={formData.carga_horaria_prof}
                        onChange={handleChange}
                        required
                    /> <br />

                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>
    );
};

export default ModalProfessores;