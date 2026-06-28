const admin = require("firebase-admin");

// रेंडर के एनवायरनमेंट वेरिएबल से Firebase Config लोड करना
// सुनिश्चित करें कि रेंडर डैशबोर्ड में 'FIREBASE_CONFIG' नाम की Key बनाई है
try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  console.log("Firebase Admin Initialized Successfully");
} catch (error) {
  console.error("Firebase Initialization Error: Check your FIREBASE_CONFIG variable", error);
}

// आपके बाकी के रूट्स और सर्वर सेटअप यहाँ आएंगे...
