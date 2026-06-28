const express = require("express");
const cors = require("cors"); // नया पैकेज
const app = express();
const admin = require("firebase-admin");

app.use(cors()); // CORS इनेबल करें
app.use(express.json());

// Firebase इनिशियलाइज़ेशन (आपका कोड सही है)
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

// रूट वैसे ही रखें
app.get("/", (req, res) => {
  res.send("Soni Mart Server is running!");
});

app.post("/add-product", async (req, res) => {
  try {
    const { name, price } = req.body;
    const docRef = await db.collection("products").add({
      name: name,
      price: price,
      addedAt: new Date()
    });
    res.status(200).send({ message: "Product added!", id: docRef.id });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/get-products", async (req, res) => {
  try {
    const snapshot = await db.collection("products").get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
