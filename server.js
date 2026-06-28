const express = require("express");
const app = express();
const admin = require("firebase-admin");

// Firebase इनिशियलाइज़ेशन
try {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: "service_account",
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID, // इसे एनवायरमेंट वेरिएबल से लें
      private_key: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : '',
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
      universe_domain: "googleapis.com"
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

// इसे app.get कर दिया है ताकि ब्राउज़र में सीधे टेस्ट हो सके
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
    console.error("Error:", error);
    res.status(500).send("Error adding product: " + error.message);
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running smoothly on port ${PORT}`);
});
