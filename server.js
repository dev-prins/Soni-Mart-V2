const express = require("express");
const app = express();
const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

// Secret File से सर्विस अकाउंट लोड करना
const serviceAccountPath = path.join(process.cwd(), 'serviceAccountKey.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log("Firebase Admin Initialized Successfully!");

const db = admin.firestore();
app.use(express.json());

app.get("/", (req, res) => res.send("Soni Mart Server is running!"));

app.get("/add-product", async (req, res) => {
  try {
    const newProduct = { name: "Soni Phone", price: 15000, addedAt: new Date() };
    const docRef = await db.collection("products").add(newProduct);
    res.status(200).send("Product added! ID: " + docRef.id);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
