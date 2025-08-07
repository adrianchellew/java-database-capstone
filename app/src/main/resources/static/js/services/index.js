/*
  Import the openModal function to handle showing login popups/modals
  Import the base API URL from the config file
  Define constants for the admin and doctor login API endpoints using the base URL

  Use the window.onload event to ensure DOM elements are available after page load
  Inside this function:
    - Select the "adminLogin" and "doctorLogin" buttons using getElementById
    - If the admin login button exists:
        - Add a click event listener that calls openModal('adminLogin') to show the admin login modal
    - If the doctor login button exists:
        - Add a click event listener that calls openModal('doctorLogin') to show the doctor login modal


  Define a function named adminLoginHandler on the global window object
  This function will be triggered when the admin submits their login credentials

  Step 1: Get the entered username and password from the input fields
  Step 2: Create an admin object with these credentials

  Step 3: Use fetch() to send a POST request to the ADMIN_API endpoint
    - Set method to POST
    - Add headers with 'Content-Type: application/json'
    - Convert the admin object to JSON and send in the body

  Step 4: If the response is successful:
    - Parse the JSON response to get the token
    - Store the token in localStorage
    - Call selectRole('admin') to proceed with admin-specific behavior

  Step 5: If login fails or credentials are invalid:
    - Show an alert with an error message

  Step 6: Wrap everything in a try-catch to handle network or server errors
    - Show a generic error message if something goes wrong


  Define a function named doctorLoginHandler on the global window object
  This function will be triggered when a doctor submits their login credentials

  Step 1: Get the entered email and password from the input fields
  Step 2: Create a doctor object with these credentials

  Step 3: Use fetch() to send a POST request to the DOCTOR_API endpoint
    - Include headers and request body similar to admin login

  Step 4: If login is successful:
    - Parse the JSON response to get the token
    - Store the token in localStorage
    - Call selectRole('doctor') to proceed with doctor-specific behavior

  Step 5: If login fails:
    - Show an alert for invalid credentials

  Step 6: Wrap in a try-catch block to handle errors gracefully
    - Log the error to the console
    - Show a generic error message
*/
import { renderHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';

/**
 * Handles user logout by clearing local storage and redirecting to the root page.
 * This function is referenced in `header.js` and should be globally accessible.
 */
window.handleLogout = function() {
    localStorage.clear();
    window.location.href = "/";
};

/**
 * Redirects the user to the appropriate dashboard based on their role stored in localStorage.
 * This is called on page load to maintain the user's session.
 */
function redirectToDashboard() {
    const role = localStorage.getItem("userRole");
    if (role === "admin") {
        window.location.href = "/adminDashboard.html";
    } else if (role === "doctor") {
        window.location.href = "/doctorDashboard.html";
    } else if (role === "loggedPatient") {
        window.location.href = "/patientDashboard.html";
    }
}

// Event listeners for role selection and page load
document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    renderFooter();

    const roleSelectionContainer = document.querySelector(".role-selection-container");
    if (roleSelectionContainer) {
        roleSelectionContainer.style.display = "block";
    }

    const adminBtn = document.getElementById("admin-btn");
    const doctorBtn = document.getElementById("doctor-btn");
    const patientBtn = document.getElementById("patient-btn");

    if (adminBtn) {
        adminBtn.addEventListener("click", () => {
            localStorage.setItem("userRole", "admin");
            window.location.href = "/adminDashboard.html";
        });
    }

    if (doctorBtn) {
        doctorBtn.addEventListener("click", () => {
            localStorage.setItem("userRole", "doctor");
            window.location.href = "/doctorDashboard.html";
        });
    }

    if (patientBtn) {
        patientBtn.addEventListener("click", () => {
            localStorage.setItem("userRole", "loggedPatient"); // Change this to 'patient' once patient login is implemented
            window.location.href = "/patientDashboard.html";
        });
    }

    // Check for an existing session and redirect if a role is set
    redirectToDashboard();
});
