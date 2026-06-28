const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

// 1. डेटाबेस कनेक्ट करें
connectDB();

// 2. मिडलवेयर
app.use(cors());
app.use(express.json());

// 3. स्टेटिक फाइल सर्व करने के लिए (public फोल्डर में index.html होना चाहिए)
app.use(express.static(path.join(__dirname, 'public')));

// 4. राउट्स
app.use('/api/auth', require('./routes/authRoutes'));

// 5. मुख्य रूट - अब यह index.html दिखाएगा
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 6. पोर्ट सेटअप
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
