const express = require("express");
const app = express();
const admin = require("firebase-admin");

// Firebase इनिशियलाइज़ेशन
try {
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

// होम पेज रूट
app.get("/", (req, res) => {
  res.send("Soni Mart Server is running!");
});

// 1. प्रोडक्ट जोड़ने का रूट (POST)
app.post("/add-product", async (req, res) => {
  try {
    const { name, price } = req.body;
    const docRef = await db.collection("products").add({
      name: name,
      price: price,
      addedAt: new Date()
    });
    res.status(200).send("Product added with ID: " + docRef.id);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

// 2. सभी प्रोडक्ट देखने का रूट (GET)
app.get("/get-products", async (req, res) => {
  try {
    const snapshot = await db.collection("products").get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
