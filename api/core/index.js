const express = require('express');
const authRoutes = require('./routes/authRoutes');
const torneioRoutes = require('./routes/torneioRoutes');
const alarmeRoutes = require('./routes/alarmeRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/torneios', torneioRoutes);
app.use('/api/alarmes', alarmeRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
