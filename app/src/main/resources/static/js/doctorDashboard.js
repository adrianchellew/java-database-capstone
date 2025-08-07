/*
  Import getAllAppointments to fetch appointments from the backend
  Import createPatientRow to generate a table row for each patient appointment


  Get the table body where patient rows will be added
  Initialize selectedDate with today's date in 'YYYY-MM-DD' format
  Get the saved token from localStorage (used for authenticated API calls)
  Initialize patientName to null (used for filtering by name)


  Add an 'input' event listener to the search bar
  On each keystroke:
    - Trim and check the input value
    - If not empty, use it as the patientName for filtering
    - Else, reset patientName to "null" (as expected by backend)
    - Reload the appointments list with the updated filter


  Add a click listener to the "Today" button
  When clicked:
    - Set selectedDate to today's date
    - Update the date picker UI to match
    - Reload the appointments for today


  Add a change event listener to the date picker
  When the date changes:
    - Update selectedDate with the new value
    - Reload the appointments for that specific date


  Function: loadAppointments
  Purpose: Fetch and display appointments based on selected date and optional patient name

  Step 1: Call getAllAppointments with selectedDate, patientName, and token
  Step 2: Clear the table body content before rendering new rows

  Step 3: If no appointments are returned:
    - Display a message row: "No Appointments found for today."

  Step 4: If appointments exist:
    - Loop through each appointment and construct a 'patient' object with id, name, phone, and email
    - Call createPatientRow to generate a table row for the appointment
    - Append each row to the table body

  Step 5: Catch and handle any errors during fetch:
    - Show a message row: "Error loading appointments. Try again later."


  When the page is fully loaded (DOMContentLoaded):
    - Call renderContent() (assumes it sets up the UI layout)
    - Call loadAppointments() to display today's appointments by default
*/
/*
  This script manages the doctor's dashboard, handling the display and filtering of patient appointments.

  Import necessary service and component functions.
*/
import { getAllAppointments } from "./services/patientServices.js";
import { createPatientRow } from "./components/patientRow.js";
import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";

// DOM element selectors
const appointmentTableBody = document.getElementById("appointmentTableBody");
const searchBar = document.getElementById("searchBar");
const datePicker = document.getElementById("datePicker");
const todayBtn = document.getElementById("todayBtn");

// State variables for filtering
let selectedDate = new Date().toISOString().slice(0, 10);
const token = localStorage.getItem("token");
let patientName = null;

/**
 * Fetches and displays patient appointments based on current filters.
 * @returns {Promise<void>}
 */
async function loadAppointments() {
  if (!token) {
    alert("Authentication token not found. Please log in again.");
    window.location.href = "/";
    return;
  }
  try {
    const appointments = await getAllAppointments(token, patientName, selectedDate);
    appointmentTableBody.innerHTML = ""; // Clear existing rows
    if (appointments.length > 0) {
      appointments.forEach((appointment) => {
        const row = createPatientRow(appointment);
        appointmentTableBody.appendChild(row);
      });
    } else {
      appointmentTableBody.innerHTML =
        '<tr><td colspan="5">No appointments found for the selected date.</td></tr>';
    }
  } catch (error) {
    console.error("Error loading appointments:", error);
    appointmentTableBody.innerHTML =
      '<tr><td colspan="5">Failed to load appointments. Please try again later.</td></tr>';
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  datePicker.value = selectedDate;
  loadAppointments();
});

// Search bar listener for filtering by patient name
if (searchBar) {
  searchBar.addEventListener("input", (e) => {
    const name = e.target.value.trim();
    patientName = name === "" ? null : name;
    loadAppointments();
  });
}

// "Today" button listener to reset the date filter
if (todayBtn) {
  todayBtn.addEventListener("click", () => {
    selectedDate = new Date().toISOString().slice(0, 10);
    datePicker.value = selectedDate;
    loadAppointments();
  });
}

// Date picker listener for filtering by date
if (datePicker) {
  datePicker.addEventListener("change", (e) => {
    selectedDate = e.target.value;
    loadAppointments();
  });
}