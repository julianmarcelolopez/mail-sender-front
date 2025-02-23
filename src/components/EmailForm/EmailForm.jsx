import { useState } from 'react';
import './EmailForm.css'; // Asegúrate de importar el CSS

const EmailForm = () => {
    const [formData, setFormData] = useState({
        to: '',
        subject: '',
        message: '',
        title: '',
        footer: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);

        try {
            await axios.post('http://localhost:8080/api/email/html', formData);
            setSuccess(true);
            setFormData({ to: '', subject: '', message: '', title: '', footer: '' });
        } catch (error) {
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2 className="title">Enviar Email HTML</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className="input"
                    type="email"
                    name="to"
                    value={formData.to}
                    onChange={handleChange}
                    placeholder="Para"
                    required
                />
                <input
                    className="input"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Asunto"
                    required
                />
                <input
                    className="input"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Título"
                />
                <textarea
                    className="textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Mensaje"
                    required
                />
                <input
                    className="input"
                    type="text"
                    name="footer"
                    value={formData.footer}
                    onChange={handleChange}
                    placeholder="Pie de página"
                />
                <button
                    type="submit"
                    className="button buttonHtml"
                >
                    {loading ? 'Enviando...' : 'Enviar Email'}
                </button>
                {success !== null && (
                    <div className={`responseMessage ${success ? 'success' : 'error'}`}>
                        {success ? '¡Email enviado con éxito!' : 'Error al enviar el email.'}
                    </div>
                )}
            </form>
        </div>
    );
};

export default EmailForm;
