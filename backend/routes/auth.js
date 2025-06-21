const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET = 'your_secret_key';

router.post('/signup', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    await req.db.run(
      `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`,
      [username, hash, role]
    );
    res.status(201).json({ message: 'User created' });
  } catch (e) {
    console.error('Signup Error:', e.message);
    res.status(500).json({ error: 'User creation failed' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await req.db.get(`SELECT * FROM users WHERE username = ?`, [username]);
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '1d' });
      res.json({ token, user: { id: user.id, role: user.role } });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (e) {
    console.error('Login Error:', e.message);
    res.status(500).json({ error: 'Login error' });
  }
});

module.exports = router;
