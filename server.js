const express = require("express");
const app = express();
const admin = require("firebase-admin");

// 1. Firebase इनिशियलाइज़ेशन
try {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: "service_account",
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: "de4657c4807ebe6873d99dcb31a514ecc02e1bca",
      private_key: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : '',
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT,
      client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40soni-mart-981b6.iam.gserviceaccount.com",
      universe_domain: "googleapis.com"
    })
  });
  console.log("Firebase Admin Initialized Successfully!");
} catch (err) {
  console.error("Firebase Initialization Failed:", err);
}

// 2. बेसिक मिडलवेयर
app.use(express.json());

// 3. एक टेस्ट रूट (ताकि पता चले सर्वर चल रहा है)
app.get("/", (req, res) => {
  res.send("Soni Mart Server is running fine!");
});

// 4. पोर्ट सेटअप (रेंडर के लिए सबसे जरूरी)
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running smoothly on port ${PORT}`);
});
