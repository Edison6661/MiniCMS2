// backend/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Тестовий маршрут
app.get('/', (req, res) => {
  res.send('🎉 MiniCMS API працює!');
});

// Підключення до БД
db.authenticate()
  .then(() => console.log('✅ Підключено до бази даних'))
  .catch((err) => console.error('❌ Помилка підключення до БД:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Сервер запущено на порту ${PORT}`));