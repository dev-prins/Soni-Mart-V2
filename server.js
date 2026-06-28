const admin = require("firebase-admin");

// अब हम सीधे एनवायरनमेंट वेरिएबल्स का उपयोग करेंगे
// कोई JSON.parse नहीं, कोई एरर नहीं
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
