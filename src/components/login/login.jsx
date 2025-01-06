import React, { useState } from 'react';
import { Client, Account } from 'appwrite';

const Login = () => {
    // Estados para os campos do formulário e mensagens
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Configurando o cliente do Appwrite
    const client = new Client();
    const account = new Account(client);

    client
        .setProject('lobbyninja'); // Altere para o ID do seu projeto

    // Função para manipular o login
    const handleLogin = async (e) => {
        e.preventDefault();

        // Validação básica
        if (!email || !password) {
            setErrorMessage('Por favor, preencha todos os campos.');
            return;
        }

        // Limpa mensagem de erro anterior
        setErrorMessage('');

        try {
            // Tentando criar uma sessão com email e senha
            await account.createEmailPasswordSession(email, password);

            // Redireciona para o dashboard em caso de sucesso
            window.location.href = '/dashboard'; 
        } catch (error) {
            // Exibe mensagem de erro caso as credenciais estejam incorretas
            setErrorMessage('Email ou senha inválidos. Tente novamente.');
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Login</h2>

            {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

            <form onSubmit={handleLogin} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label htmlFor="email" style={styles.label}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        placeholder="Digite seu email"
                        required
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label htmlFor="password" style={styles.label}>Senha:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        placeholder="Digite sua senha"
                        required
                    />
                </div>

                <button type="submit" style={styles.button}>Entrar</button>
            </form>
        </div>
    );
};

// Estilos da tela de login
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f7f9fc',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '20px',
        fontWeight: 'bold',
        color: '#333',
    },
    form: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '300px',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    label: {
        fontSize: '0.9rem',
        fontWeight: '600',
        marginBottom: '5px',
        display: 'block',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #ccc',
        outline: 'none',
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1.1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    errorMessage: {
        color: 'red',
        fontSize: '1rem',
        marginBottom: '15px',
        textAlign: 'center',
    },
};

export default Login;
