const express = require('express');
const router = express.Router();

// Add a medication
router.post('/', async (req, res) => {
  const db = req.db;
  const { name, dosage, frequency } = req.body;
  const userId = req.user.id;
  const date = new Date().toISOString().split('T')[0];

  try {
    await db.run(
      `INSERT INTO medications (user_id, name, dosage, frequency, date) VALUES (?, ?, ?, ?, ?)`,
      [userId, name, dosage, frequency, date]
    );
    res.status(201).json({ message: 'Medication added' });
  } catch (err) {
    console.error('Error adding medication:', err.message);
    res.status(500).json({ error: 'Failed to add medication' });
  }
});

// Get today's medications
router.get('/', async (req, res) => {
  const db = req.db;
  const userId = req.user.id;
  const date = new Date().toISOString().split('T')[0];
  console.log(userId, date)
  try {
    const meds = await db.all(
      `SELECT * FROM medications WHERE user_id = ? AND date = ?`,
      [userId, date]
    );
    console.log(meds)
    res.json(meds);
  } catch (err) {
    console.error('Error fetching medications:', err.message);
    res.status(500).json({ error: 'Failed to fetch medications' });
  }
});

// Mark medication as taken
router.patch('/:id/take', async (req, res) => {
  const db = req.db;
  const medId = req.params.id;
  const userId = req.user.id;

  try {
    await db.run(
      `UPDATE medications SET taken_today = 1 WHERE id = ? AND user_id = ?`,
      [medId, userId]
    );
    res.json({ message: 'Marked as taken' });
  } catch (err) {
    console.error('Error updating medication:', err.message);
    res.status(500).json({ error: 'Failed to mark as taken' });
  }
});

module.exports = (req, res, next) => router(req, res, next); // Middleware-compatible export
