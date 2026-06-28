const express = require("express");
const app = express();
const admin = require("firebase-admin");

// Firebase इनिशियलाइज़ेशन (Environment Variable से सीधे)
try {
  // सुनिश्चित करें कि रेंडर में FIREBASE_CONFIG नाम का वेरिएबल हो 
  // या नीचे वाला तरीका अपनाएं:
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
    })
  });
  console.log("Firebase Admin Initialized Successfully!");
} catch (err) {
  console.error("Firebase Initialization Failed:", err);
}

const db = admin.firestore();
app.use(express.json());

app.get("/add-product", async (req, res) => {
  try {
    const docRef = await db.collection("products").add({
      name: "Soni Phone",
      price: 15000,
      addedAt: new Date()
    });
    res.status(200).send("Product added! ID: " + docRef.id);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
