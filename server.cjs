// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv'); // ✅ correct for .cjs
dotenv.config();
const brevoRouter = require('./src/routes/brevo.cjs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/brevo', brevoRouter);

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
