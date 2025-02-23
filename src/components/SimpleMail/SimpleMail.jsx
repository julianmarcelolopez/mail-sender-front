import { useState } from 'react';
import './SimpleMail.css';

const SimpleMail = () => {
    const [formData, setFormData] = useState({
        to: '',
        subject: '',
        message: ''
    });

    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/email/simple', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setResponseMessage('Correo enviado con éxito');
                setFormData({ to: '', subject: '', message: '' });
            } else {
                setResponseMessage('Hubo un error al enviar el correo');
            }
        } catch (error) {
            setResponseMessage('Error de conexión con el servidor');
        }
    };

    return (
        <div className="container">
            <h2 className="title">Enviar Correo Simple</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className="input"
                    type="email"
                    name="to"
                    placeholder="Destinatario"
                    value={formData.to}
                    onChange={handleChange}
                    required
                />
                <input
                    className="input"
                    type="text"
                    name="subject"
                    placeholder="Asunto"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                />
                <textarea
                    className="textarea"
                    name="message"
                    placeholder="Mensaje"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    className="button buttonSimple"
                >
                    Enviar
                </button>
            </form>
            {responseMessage && <p className="responseMessage">{responseMessage}</p>}
        </div>
    );
};

export default SimpleMail;
