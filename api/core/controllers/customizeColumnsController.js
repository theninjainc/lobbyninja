// controllers/customizeColumnsController.js
const { fetchColumns, storeColumns } = require('../services/costumizeColumnsService');

const getColumns = async (req, res) => {
    try {
        const { userEmail } = req.query; // Obtém o userID da query string
        console.log(userEmail)
        if (!userEmail) return res.status(400).json({ error: 'email é obrigatório' });

        const columns = await fetchColumns(userEmail);
        res.json(columns);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const saveColumns = async (req, res) => {
    try {
        const { userEmail, columns } = req.body; // Obtém userID e colunas do corpo da requisição
        if (!userEmail || !columns) return res.status(400).json({ error: 'Email e columns são obrigatórios' });

        const response = await storeColumns(userEmail, columns);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getColumns, saveColumns };
