const express = require("express");
const app = express();
const admin = require("firebase-admin");

// Firebase इनिशियलाइज़ेशन
try {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : '',
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
    res.status(500).send("Error: " + error.message);
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running smoothly on port ${PORT}`);
});
