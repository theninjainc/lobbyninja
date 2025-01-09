/* eslint-disable no-undef */
const express = require('express');
const serverless = require('serverless-http');

const authRoutes = require('./routes/authRoutes');
const torneioRoutes = require('./routes/torneioRoutes');
const alarmeRoutes = require('./routes/alarmeRoutes');
const lobbyRoutes = require('./routes/lobbyRoutes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/torneios', torneioRoutes);
app.use('/api/alarmes', alarmeRoutes);
app.use('/api/lobbys', lobbyRoutes);

// Configuração para rodar localmente ou no Serverless


// Exporta para o Serverless
module.exports.handler = serverless(app);
