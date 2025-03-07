import React, { useEffect, useState } from "react";
import "./style.css";

const ModalProfessores = ({
    isOpen = true,
    onClose = () => { },
    professorSelecionado,
    criar,
    atualizar,
}) => {
    if (!isOpen) return null;

    const [id, setId] = useState("");
    const [ni, setNi] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [ocupacao, setOcupacao] = useState("");

    useEffect(() => {
        if (professorSelecionado) {
            setId(professorSelecionado.id || '');
            setNi(professorSelecionado.ni || '');
            setNome(professorSelecionado.nome || '');
            setEmail(professorSelecionado.email || '');
            setTel(professorSelecionado.tel || '');
            setOcupacao(professorSelecionado.ocupacao || '');
        } else {
            setId('');
            setNi('');
            setNome('');
            setEmail('');
            setTel('');
            setOcupacao('');
        }
    }, [professorSelecionado]); // <- Adicionado professorSelecionado como dependência

    const handleSubmit = (e) => { // Alterado para "handleSubmit" com "h" minúsculo
        e.preventDefault();
        const novoProfessor = { ni, nome, email, tel, ocupacao };
    
        if (professorSelecionado) {
            atualizar({ ...professorSelecionado, ...novoProfessor }); // Atualiza corretamente
        } else {
            criar(novoProfessor);
        }
    };

    return (
        <div className="container-modal">
            <div className="modal">
                <button onClick={() => onClose()}>X</button>
                <h2>{professorSelecionado ? "Editar Professor" : "Cadastrar Professor"}</h2>

                <form onSubmit={handleSubmit} className="container-input">
                    <input type="text" placeholder="NI" value={ni} onChange={(e) => setNi(e.target.value)} /> <br />
                    <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} /> <br />
                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
                    <input type="text" placeholder="Telefone" value={tel} onChange={(e) => setTel(e.target.value)} /> <br />
                    <input type="text" placeholder="Ocupação" value={ocupacao} onChange={(e) => setOcupacao(e.target.value)} /> <br />

                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>
    );
};

export default ModalProfessores;