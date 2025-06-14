const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const candidate = await User.findOne({ where: { email } });
    if (candidate) return res.status(400).json({ message: 'Користувач вже існує' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: 'Успішна реєстрація', userId: user.id });
  } catch (err) {
    res.status(500).json({ message: 'Помилка сервера', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Користувача не знайдено' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Невірний пароль' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (err) {
    res.status(500).json({ message: 'Помилка сервера', error: err.message });
  }
};