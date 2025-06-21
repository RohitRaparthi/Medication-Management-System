// utils/db.js
const sqlite3 = require('sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');
const { open } = require('sqlite');

const dbpath = path.join(__dirname, 'database.sqlite');

async function initDB() {
  const db = await open({
    filename: dbpath,
    driver: sqlite3.Database,
  });

  const johnHash = bcrypt.hashSync('patient123', 10);
  const nurseHash = bcrypt.hashSync('caretaker123', 10);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS medications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      dosage TEXT NOT NULL,
      frequency TEXT NOT NULL,
      taken_today INTEGER DEFAULT 0,
      date TEXT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `);

  await db.run(`INSERT OR IGNORE INTO users (username, password, role)
    VALUES 
      ('john', ?, 'patient'),
      ('nurse', ?, 'caretaker')
  `, [johnHash, nurseHash]);

  await db.run(`INSERT OR IGNORE INTO medications (user_id, name, dosage, frequency, taken_today, date)
    VALUES 
      (1, 'Paracetamol', '500mg', 'Twice a day', 0, date('now')),
      (1, 'Ibuprofen', '200mg', 'Once a day', 1, date('now'))
  `);

  return db;
}

module.exports = initDB();
