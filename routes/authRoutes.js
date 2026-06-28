const express = require('express');
const router = express.Router();

// टेस्ट के लिए छोटा राउट
router.post('/login', (req, res) => {
    res.json({ message: "Auth route is working!" });
});

module.exports = router;
