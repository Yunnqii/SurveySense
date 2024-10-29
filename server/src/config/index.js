require("dotenv").config();
const path = require("path");

const serviceAccount = require("../credentials/serviceAccountKey.json");

const config = {
  server: {
    port: process.env.PORT || 3001,
    nodeEnv: process.env.NODE_ENV || "development",
  },
  mongodb: {
    uri: process.env.MONGODB_URI || constructMongoUri(),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    credential: serviceAccount,
  },
};

function constructMongoUri() {
  const {
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_HOST,
    MONGODB_PORT,
    MONGODB_DATABASE,
  } = process.env;

  if (MONGODB_USER && MONGODB_PASSWORD) {
    return `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`;
  }

  return `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`;
}

// Validate required configuration
function validateConfig() {
  const requiredVars = [
    "mongodb.uri",
    "firebase.projectId",
    "firebase.clientEmail",
    "firebase.privateKey",
  ];

  requiredVars.forEach((path) => {
    const value = path.split(".").reduce((obj, key) => obj[key], config);
    if (!value) {
      throw new Error(`Missing required config value: ${path}`);
    }
  });
}

validateConfig();

module.exports = config;
