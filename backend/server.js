const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const medicationRoutes = require('./routes/medications');
const { verifyToken } = require('./middleware/auth');
const initDB = require('./utils/db'); // this should export a function that returns a db instance

const app = express();
app.use(cors());
app.use(express.json());

initDB.then((db) => {
  // Attach db to every request
  app.use((req, res, next) => {
    req.db = db;
    next();
  });

  // Routes
  app.use('/auth', authRoutes);
  app.use('/medications', verifyToken, medicationRoutes);

  // Start server only after DB is ready
  app.listen(5000, () => {
    console.log('✅ Server is running at http://localhost:5000');
  });
}).catch((err) => {
  console.error('❌ Failed to initialize database:', err.message);
});
