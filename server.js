const express = require("express");
const app = express();
const admin = require("firebase-admin");

// 1. Firebase इनिशियलाइज़ेशन
try {
  // रेंडर में 'FIREBASE_PRIVATE_KEY' वेरिएबल में की पेस्ट करें
  // रेंडर में लाइन ब्रेक (\n) की समस्या को हल करने के लिए:
  const privateKey = process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : '';

  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key: privateKey,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
    })
  });
  console.log("Firebase initialized!");
} catch (err) {
  console.error("Firebase init failed:", err);
}

const db = admin.firestore();
app.use(express.json());

// 2. होम पेज के लिए रूट (ताकि 'Cannot GET /' न आए)
app.get("/", (req, res) => {
  res.send("Soni Mart Server is running!");
});

// 3. प्रोडक्ट जोड़ने का रूट
app.get("/add-product", async (req, res) => {
  try {
    const docRef = await db.collection("products").add({
      name: "Soni Phone",
      price: 15000,
      addedAt: new Date()
    });
    res.status(200).send("Product added with ID: " + docRef.id);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
