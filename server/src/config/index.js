const config = {
  server: {
    port: process.env.PORT || 3001,
    nodeEnv: process.env.NODE_ENV || "development",
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
  },
  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/surveysense",
  },
  firebase: {
    projectId: "surveysense-daa64",
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL?.replace(/"/g, ""),
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
};

console.log("=== Firebase Config Check ===");
console.log("Project ID:", config.firebase.projectId);
console.log("Client Email:", config.firebase.clientEmail ? "Set" : "Not set");
console.log("Private Key:", config.firebase.privateKey ? "Set" : "Not set");

module.exports = config;
