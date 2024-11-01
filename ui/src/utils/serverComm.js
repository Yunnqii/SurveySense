import { auth } from "../firebase/config";

const API_BASE_URL = "http://localhost:3001";

async function getToken() {
  const user = auth.currentUser;
  console.log("Current user status:", !!user);

  if (!user) {
    throw new Error("User not authenticated");
  }

  try {
    const token = await user.getIdToken(true);
    console.log(
      "Token generated successfully:",
      token.substring(0, 20) + "..."
    );
    return token;
  } catch (error) {
    console.error("Error getting token:", error);
    throw error;
  }
}

/**
 * Generic API call function with authentication
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} Response data
 */
async function apiCall(endpoint, options = {}) {
  try {
    const token = await getToken();
    console.log("Making API call to:", `${API_BASE_URL}${endpoint}`);
    console.log("Request headers:", {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`.substring(0, 50) + "...",
    });

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server response error details:", errorData);
      throw new Error(errorData.error || "Request failed");
    }

    return response.json();
  } catch (error) {
    console.error("API 调用详细错误:", error);
    throw error;
  }
}

/**
 * Generic GET request
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Additional fetch options
 */
export async function get(endpoint, options = {}) {
  return apiCall(endpoint, {
    method: "GET",
    ...options,
  });
}

/**
 * Generic POST request
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Data to send
 * @param {Object} options - Additional fetch options
 */
export async function post(endpoint, data) {
  console.log("Making request to:", `${API_BASE_URL}${endpoint}`);
  console.log("Request data:", data);

  return apiCall(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Save survey questions to the backend
 * @param {Array} questions - Array of question objects
 */
export async function saveSurvey(questions) {
  try {
    console.log("Sending survey data:", { questions });
    const result = await post("/api/surveys", { questions });
    console.log("Survey saved successfully:", result);
    return result;
  } catch (error) {
    console.error("Error saving survey:", error);
    throw error;
  }
}
