/* eslint-disable no-undef */
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const torneioRoutes = require('./routes/torneioRoutes');
const alarmeRoutes = require('./routes/alarmeRoutes');
const lobbyRoutes = require('./routes/lobbyRoutes');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/torneios', torneioRoutes);
app.use('/api/alarmes', alarmeRoutes);
app.use('/api/lobbys', lobbyRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
