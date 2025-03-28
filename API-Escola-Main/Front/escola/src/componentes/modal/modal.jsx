import React, { useEffect, useState } from "react";

const ModalProfessores = ({
    isOpen = false,
    onClose = () => { },
    professorSelecionado,
    criar,
    atualizar,
}) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        id: "",
        ni: "",
        nome: "",
        email: "",
        tel: "",
        ocupacao: "",
        carga_horaria_prof: "",
        foto: null,
    });

    const [imagePreview, setImagePreview] = useState("../images/ni1.png");

    useEffect(() => {
        if (professorSelecionado) {
            setFormData({
                id: professorSelecionado.id || "",
                ni: professorSelecionado.ni ? String(professorSelecionado.ni) : "",
                nome: professorSelecionado.nome || "",
                email: professorSelecionado.email || "",
                tel: professorSelecionado.tel || "",
                ocupacao: professorSelecionado.ocupacao || "",
                carga_horaria_prof: professorSelecionado.carga_horaria_prof || "",
                foto: professorSelecionado.foto || null,
            });
    
            if (professorSelecionado.foto) {
                setImagePreview(`http://127.0.0.1:8000${professorSelecionado.foto}`);
            } else {
                setImagePreview("../images/ni1.png"); 
            }
        } else {
            setFormData({
                id: "",
                ni: "",
                nome: "",
                email: "",
                tel: "",
                ocupacao: "",
                carga_horaria_prof: "",
                foto: null,
            });
            setImagePreview("../images/ni1.png");
        }
    }, [professorSelecionado]);
     
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            const file = files[0];
            if (file) {
                setFormData((prev) => ({
                    ...prev,
                    foto: file,
                }));

                const objectUrl = URL.createObjectURL(file);
                setImagePreview(objectUrl);

                return () => URL.revokeObjectURL(objectUrl);
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const niValue = formData.ni.trim();
        if (!niValue || isNaN(niValue)) {
            console.log("O campo NI é obrigatório e deve conter apenas números.");
            return;
        }

        const dataToSend = {
            ...formData,
            ni: niValue,
        };

        console.log("Enviando dados:", dataToSend);

        if (professorSelecionado) {
            atualizar({ ...professorSelecionado, ...dataToSend });
        } else {
            criar(dataToSend);
        }

        handleClose();
    };

    const handleClose = () => {
        setFormData({
            id: "",
            ni: "",
            nome: "",
            email: "",
            tel: "",
            ocupacao: "",
            carga_horaria_prof: "",
            foto: null,
        });
        setImagePreview("../images/ni1.png");
        onClose();
    };

    return (
        <div className="container-modal-prof">
            <div className="modal">
                <button className="close-button" onClick={handleClose}>X</button>

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

                    <input
                        type="file"
                        name="foto"
                        onChange={handleChange}
                    /> <br />

                    <button type="submit">Salvar</button>
                </form>
            </div>

            <div className="modal">
                <h2>Professor: {formData.nome}</h2>
                <div className="itemframe">
                    <img src={imagePreview} alt="Foto do Professor" />
                </div>
            </div>
        </div>
    );
};

export default ModalProfessores;