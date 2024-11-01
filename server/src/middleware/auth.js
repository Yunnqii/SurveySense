const admin = require("firebase-admin");
const config = require("../config");
const path = require("path");
const cors = require("cors");

if (!admin.apps.length) {
  try {
    console.log("Checking Firebase config:", {
      projectId: config.firebase.projectId,
      clientEmail: config.firebase.clientEmail,
      hasPrivateKey: !!config.firebase.privateKey,
    });

    if (!config.firebase.privateKey || !config.firebase.clientEmail) {
      throw new Error("Firebase configuration is incomplete");
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: config.firebase.projectId,
        clientEmail: config.firebase.clientEmail,
        privateKey: config.firebase.privateKey.replace(/\\n/g, "\n"),
      }),
    });
    console.log("Firebase Admin initialized successfully");
  } catch (error) {
    console.error("Firebase Admin initialization error:", error);
    throw error;
  }
}

const auth = async (req, res, next) => {
  try {
    console.log("\n=== Authentication Started ===");
    console.log("Received headers:", JSON.stringify(req.headers, null, 2));

    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      console.log("No token provided");
      return res
        .status(401)
        .json({ error: "No authentication token provided" });
    }

    console.log("Token verification attempt:", token.substring(0, 20) + "...");
    console.log("Firebase Admin status:", !!admin.apps.length);

    if (!admin.apps.length) {
      console.error("Firebase Admin not initialized");
      return res.status(500).json({ error: "Server configuration error" });
    }

    try {
      console.log("Starting token verification...");
      const decodedToken = await admin.auth().verifyIdToken(token);
      console.log("Token verified successfully for user:", decodedToken.uid);
      console.log("Token details:", JSON.stringify(decodedToken, null, 2));
      req.user = decodedToken;
      next();
    } catch (verifyError) {
      console.error("Token verification failed:", verifyError);
      console.error("Verification error details:", verifyError.stack);
      return res.status(401).json({
        error: "Invalid authentication token",
        details:
          process.env.NODE_ENV === "development"
            ? verifyError.message
            : undefined,
      });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({
      error: "Server authentication error",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = { auth };
