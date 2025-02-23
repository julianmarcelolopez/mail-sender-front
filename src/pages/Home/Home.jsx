import React, { useState } from 'react';
import EmailForm from '../../components/EmailForm/EmailForm';
import SimpleMail from '../../components/SimpleMail/SimpleMail';
import './Home.css'; // Asegúrate de importar los estilos

const Home = () => {
    const [activeTab, setActiveTab] = useState('emailForm'); // Controlamos el tab activo

    return (
        <div className="home-container">
            <div className="tabs">
                <button
                    className={`tab-button ${activeTab === 'emailForm' ? 'active' : ''}`}
                    onClick={() => setActiveTab('emailForm')}
                >
                    HTML Mail
                </button>
                <button
                    className={`tab-button ${activeTab === 'simpleMail' ? 'active' : ''}`}
                    onClick={() => setActiveTab('simpleMail')}
                >
                    Simple Mail
                </button>
            </div>
            <div className="tab-content">
                {activeTab === 'emailForm' && <EmailForm />}
                {activeTab === 'simpleMail' && <SimpleMail />}
            </div>

            <footer className="scanner-footer">
                <p>&copy; 2024 JPDevs</p>
            </footer>
        </div>
    );
};

export default Home;
