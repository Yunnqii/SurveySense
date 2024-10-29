const admin = require("firebase-admin");
const config = require("../config");

// Initialize Firebase Admin with service account
admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
});

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { auth };
