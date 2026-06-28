const express = require("express");
const admin = require("firebase-admin");
const app = express();

// 1. Firebase सबसे पहले Initialize करें
try {
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

// 2. Initialize होने के बाद ही Firestore का इंस्टेंस बनाएं
const db = admin.firestore();

app.use(express.json());

// रूट जो सही काम करे
app.get("/add-product", async (req, res) => {
  try {
    const newProduct = {
      name: "Soni Phone",
      price: 15000,
      addedAt: new Date()
    };
    const docRef = await db.collection("products").add(newProduct);
    res.status(200).send("Product added! ID: " + docRef.id);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
