const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
const User = require('./models/User');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('MiniCMS API 🎉'));

app.use('/api/auth', require('./routes/auth'));

db.sync().then(() => console.log('✅ DB синхронізовано'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер на порту ${PORT}`));