import { API_BASE_URL } from "../config/config.js";

// Define constants for the API endpoints
const PATIENT_API = `${API_BASE_URL}/patients`;
const APPOINTMENT_API = `${API_BASE_URL}/appointments`;

/**
 * Registers a new patient.
 * @param {object} patientData - The patient data for registration.
 * @returns {Promise<object>} - The registered patient data.
 */
export async function patientSignup(patientData) {
  try {
    const response = await fetch(`${PATIENT_API}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to register patient.");
    }
    return response.json();
  } catch (error) {
    console.error("Error in patientSignup:", error);
    throw error;
  }
}

/**
 * Logs in a patient and retrieves a token.
 * @param {string} email - The patient's email.
 * @param {string} password - The patient's password.
 * @returns {Promise<object>} - An object containing the authentication token.
 */
export async function patientLogin(email, password) {
  try {
    const response = await fetch(`${PATIENT_API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Invalid credentials.");
    }
    return response.json();
  } catch (error) {
    console.error("Error in patientLogin:", error);
    throw error;
  }
}

/**
 * Books an appointment for a patient.
 * @param {object} appointmentData - The appointment details.
 * @param {string} token - The patient's authentication token.
 * @returns {Promise<object>} - The created appointment data.
 */
export async function bookAppointment(appointmentData, token) {
  try {
    const response = await fetch(APPOINTMENT_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(appointmentData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to book appointment.");
    }
    return response.json();
  } catch (error) {
    console.error("Error in bookAppointment:", error);
    throw error;
  }
}

/**
 * Fetches all appointments for the current user.
 * @param {string} token - The user's authentication token.
 * @param {string} [patientName=null] - Optional patient name to filter by.
 * @param {string} [date=null] - Optional date to filter by.
 * @returns {Promise<Array<object>>} - An array of appointment objects.
 */
export async function getAllAppointments(token, patientName = null, date = null) {
  const url = new URL(APPOINTMENT_API);
  if (patientName) {
    url.searchParams.append('patientName', patientName);
  }
  if (date) {
    url.searchParams.append('date', date);
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch appointments.");
    }
    return response.json();
  } catch (error) {
    console.error("Error in getAllAppointments:", error);
    throw error;
  }
}

/**
 * Fetches the current patient's data.
 * @param {string} token - The patient's authentication token.
 * @returns {Promise<object>} - The patient data.
 */
export async function getPatientData(token) {
  try {
    const response = await fetch(`${PATIENT_API}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch patient data.");
    }
    return response.json();
  } catch (error) {
    console.error("Error in getPatientData:", error);
    throw error;
  }
}