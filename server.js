const express = require("express");
const app = express();
const admin = require("firebase-admin");

// Firebase इनिशियलाइज़ेशन (Base64 डिकोडिंग के साथ)
try {
  const privateKeyBase64 = process.env.FIREBASE_PRIVATE_KEY_B64;
  const privateKey = Buffer.from(privateKeyBase64, 'base64').toString('utf-8');

  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key: privateKey,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
    })
  });
  console.log("Firebase Admin Initialized Successfully!");
} catch (err) {
  console.error("Firebase Initialization Failed:", err);
}

const db = admin.firestore();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Soni Mart Server is running fine!");
});

// प्रोडक्ट जोड़ने का रूट
app.get("/add-product", async (req, res) => {
  try {
    const newProduct = {
      name: "Soni Phone",
      price: 15000,
      category: "Electronics",
      addedAt: new Date()
    };

    const docRef = await db.collection("products").add(newProduct);
    res.status(200).send("Product added successfully with ID: " + docRef.id);
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).send("Error adding product: " + error.message);
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running smoothly on port ${PORT}`);
});
