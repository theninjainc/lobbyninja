const authService = require('../services/authService');

const loginHandler = async (req, res) => {
    const { email, password } = req.body;
    try {
        const session = await authService.login(email, password);
        res.status(200).json({ message: 'Login successful', session });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

const registerHandler = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const user = await authService.register(email, password, name);
        res.status(201).json({ message: 'Registration successful', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAccountHandler = async (req, res) => {
    try {
        const user = await authService.getAccount();
        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = { loginHandler, registerHandler, getAccountHandler };
