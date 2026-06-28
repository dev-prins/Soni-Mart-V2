const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

// 1. डेटाबेस कनेक्ट करें
connectDB();

// 2. मिडलवेयर
app.use(cors());
app.use(express.json());

// 3. राउट्स (Auth Routes)
app.use('/api/auth', require('./routes/authRoutes'));

// 4. बेसिक रूट
app.get('/', (req, res) => {
    res.send("Soni Mart V2 Backend is Active and Running!");
});

// 5. पोर्ट सेटअप
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
