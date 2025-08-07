/*
  Import the base API URL from the config file
  Define a constant DOCTOR_API to hold the full endpoint for doctor-related actions


  Function: getDoctors
  Purpose: Fetch the list of all doctors from the API

   Use fetch() to send a GET request to the DOCTOR_API endpoint
   Convert the response to JSON
   Return the 'doctors' array from the response
   If there's an error (e.g., network issue), log it and return an empty array


  Function: deleteDoctor
  Purpose: Delete a specific doctor using their ID and an authentication token

   Use fetch() with the DELETE method
    - The URL includes the doctor ID and token as path parameters
   Convert the response to JSON
   Return an object with:
    - success: true if deletion was successful
    - message: message from the server
   If an error occurs, log it and return a default failure response


  Function: saveDoctor
  Purpose: Save (create) a new doctor using a POST request

   Use fetch() with the POST method
    - URL includes the token in the path
    - Set headers to specify JSON content type
    - Convert the doctor object to JSON in the request body

   Parse the JSON response and return:
    - success: whether the request succeeded
    - message: from the server

   Catch and log errors
    - Return a failure response if an error occurs


  Function: filterDoctors
  Purpose: Fetch doctors based on filtering criteria (name, time, and specialty)

   Use fetch() with the GET method
    - Include the name, time, and specialty as URL path parameters
   Check if the response is OK
    - If yes, parse and return the doctor data
    - If no, log the error and return an object with an empty 'doctors' array

   Catch any other errors, alert the user, and return a default empty result
*/

import { API_BASE_URL } from "../config/config.js";

// Define a constant for the doctors API endpoint
const DOCTOR_API = `${API_BASE_URL}/doctors`;

/**
 * Fetches the list of all doctors from the API.
 * @returns {Promise<Array<Object>>} - A promise that resolves with an array of doctor objects.
 */
export async function getDoctors() {
  try {
    const response = await fetch(DOCTOR_API);
    if (!response.ok) {
      throw new Error("Failed to fetch doctors.");
    }
    const doctors = await response.json();
    return doctors;
  } catch (error) {
    console.error("Error in getDoctors:", error);
    throw error;
  }
}

/**
 * Filters the list of doctors based on search criteria.
 * @param {string} name - The doctor's name to search for.
 * @param {string} time - The availability time to filter by (AM/PM).
 * @param {string} specialty - The specialty to filter by.
 * @returns {Promise<Array<Object>>} - A promise that resolves with a filtered array of doctor objects.
 */
export async function filterDoctors(name, time, specialty) {
  let url = new URL(DOCTOR_API);
  if (name) url.searchParams.append("name", name);
  if (time) url.searchParams.append("availability", time);
  if (specialty) url.searchParams.append("specialization", specialty);

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error("Failed to filter doctors.");
    }
    const doctors = await response.json();
    return doctors;
  } catch (error) {
    console.error("Error in filterDoctors:", error);
    throw error;
  }
}

/**
 * Saves a new doctor to the API.
 * @param {object} doctor - The doctor object to save.
 * @param {string} token - The authentication token.
 * @returns {Promise<Object>} - A promise that resolves with the saved doctor object.
 */
export async function saveDoctor(doctor, token) {
  try {
    const response = await fetch(DOCTOR_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(doctor),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to save doctor.");
    }
    return response.json();
  } catch (error) {
    console.error("Error in saveDoctor:", error);
    throw error;
  }
}

/**
 * Deletes a doctor from the API.
 * @param {string} doctorId - The ID of the doctor to delete.
 * @param {string} token - The authentication token.
 * @returns {Promise<void>} - A promise that resolves when the deletion is successful.
 */
export async function deleteDoctor(doctorId, token) {
  try {
    const response = await fetch(`${DOCTOR_API}/${doctorId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete doctor.");
    }
  } catch (error) {
    console.error("Error in deleteDoctor:", error);
    throw error;
  }
}
