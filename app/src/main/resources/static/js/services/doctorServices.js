<<<<<<< HEAD
import { API_BASE_URL } from '../config/config.js';
const DOCTOR_API = API_BASE_URL + '/doctor';

export async function getDoctors() {
    try {
        const response = fetch(DOCTOR_API);

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        return result.doctors || [];

    } catch (error) {
        console.error(error.message);
        return [];
    }

}

export async function deleteDoctor(id, token){
    try {
        const url = `${DOCTOR_API}/${id}/${token}`;

        const response = fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to delete doctor');
        }

        return {
            success: true,
            message: result.message || 'Doctor deleted successfully'
        };

    } catch (error) {
        console.error('Delete operation failed:', error.message);
        return {
            success: false,
            message: error.message
        };
    }

}

export async function saveDoctor(doctor, token) {

    try {

        const response = fetch(DOCTOR_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(doctor)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to add doctor');
        }

        return {
            success: true,
            message: result.message || 'Doctor added successfully'
        };

    } catch (error) {
        console.error('Doctor creation operation failed:', error.message);
        return {
            success: false,
            message: error.message
        };
    }
}

export async function filterDoctors(name = '' ,time = '' ,speciality= '') {

    try {
        const url = `${DOCTOR_API}/${name}/${time}/${speciality}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch doctors: ${response.statusText}`);
        }

        const result = await response.json();

        return result.doctors || [];

    } catch (error) {
        console.error('Filtering error:', error.message);
        alert('Could not filter doctors. Please try again later.');

        return [];
    }
}
=======
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
>>>>>>> a7ed0a5c599ed8819f6e24c27bb8ee7a2edfae78
