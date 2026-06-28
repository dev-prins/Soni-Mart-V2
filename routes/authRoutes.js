const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const User = require('../models/User');

// Firebase Admin को इनिशियलाइज़ करें
// सुनिश्चित करें कि आपका JSON फाइल सही पाथ पर है
const serviceAccount = require('../config/serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

router.post('/login', async (req, res) => {
    const { idToken } = req.body;

    if (!idToken) {
        return res.status(400).json({ error: "Token is required" });
    }

    try {
        // Firebase से टोकन वेरीफाई करें
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { uid, name, email, phone_number } = decodedToken;

        // डेटाबेस में यूजर ढूंढें या नया बनाएं
        let user = await User.findOne({ uid });

        if (!user) {
            user = await User.create({
                uid,
                name: name || "New User",
                email: email || "",
                phone: phone_number || ""
            });
            console.log("New User Created:", uid);
        }

        res.status(200).json({ 
            message: "Authentication successful", 
            user 
        });
    } catch (error) {
        console.error("Auth Error:", error);
        res.status(401).json({ error: "Invalid or expired token" });
    }
});

module.exports = router;
