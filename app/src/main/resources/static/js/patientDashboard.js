import { getDoctors, filterDoctors } from './services/doctorServices.js';
import { openModal, closeModal } from './components/modals.js';
import { createDoctorCard } from './components/doctorCard.js';
import { patientSignup, patientLogin, bookAppointment } from './services/patientServices.js';
import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";

// DOM elements
const contentDiv = document.getElementById("content");
const searchBar = document.getElementById("searchBar");
const filterTime = document.getElementById("filterTime");
const filterSpecialty = document.getElementById("filterSpecialty");
const modal = document.getElementById("modal");

/**
 * Loads and displays doctor cards on the patient dashboard.
 */
async function loadDoctorCards() {
    try {
        const doctors = await getDoctors();
        contentDiv.innerHTML = "";
        if (doctors && doctors.length > 0) {
            doctors.forEach(doctor => {
                const card = createDoctorCard(doctor);
                contentDiv.appendChild(card);
            });
        } else {
            contentDiv.innerHTML = "<p>No doctors found at this time.</p>";
        }
    } catch (error) {
        console.error("Failed to load doctors:", error);
        contentDiv.innerHTML = "<p>Failed to load doctors. Please try again later.</p>";
    }
}

/**
 * Filters doctors based on search and dropdown selections.
 */
async function filterDoctorsOnChange() {
    const name = searchBar.value || null;
    const time = filterTime.value || null;
    const specialty = filterSpecialty.value || null;

    try {
        const filteredDoctors = await filterDoctors(name, time, specialty);
        renderDoctorCards(filteredDoctors);
    } catch (error) {
        console.error("Error filtering doctors:", error);
        alert("Failed to filter doctors. Please try again.");
    }
}

/**
 * Renders doctor cards into the content div.
 * @param {Array<Object>} doctors - The array of doctor objects to render.
 */
function renderDoctorCards(doctors) {
    contentDiv.innerHTML = "";
    if (doctors && doctors.length > 0) {
        doctors.forEach(doctor => {
            const card = createDoctorCard(doctor);
            contentDiv.appendChild(card);
        });
    } else {
        contentDiv.innerHTML = "<p>No doctors found matching your criteria.</p>";
    }
}

/**
 * Handles the patient sign-up form submission.
 * @returns {Promise<void>}
 */
window.patientRegister = async function() {
    const name = document.getElementById("patientName").value;
    const email = document.getElementById("patientEmail").value;
    const password = document.getElementById("patientPassword").value;

    if (!name || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    const patient = { name, email, password };
    try {
        await patientSignup(patient);
        alert("Registration successful. Please log in.");
        closeModal();
    } catch (error) {
        alert("Registration failed: " + error.message);
    }
};

/**
 * Handles the patient login form submission.
 * @returns {Promise<void>}
 */
window.patientLogin = async function() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    try {
        const { token } = await patientLogin(email, password);
        localStorage.setItem("token", token);
        localStorage.setItem("userRole", "loggedPatient");
        alert("Login successful!");
        closeModal();
        renderHeader();
        loadDoctorCards(); // Reload cards to show "Book Now" buttons
    } catch (error) {
        alert("Login failed: Invalid credentials.");
    }
};

/**
 * Handles the booking form submission.
 * @returns {Promise<void>}
 */
window.confirmBooking = async function() {
    const doctorId = document.getElementById("bookingDoctorId").value;
    const patientId = document.getElementById("bookingPatientId").value;
    const bookingTime = document.getElementById("bookingTime").value;

    const token = localStorage.getItem("token");
    if (!token) {
        alert("Session expired. Please log in again.");
        window.location.href = "/";
        return;
    }

    try {
        await bookAppointment({
            doctorId,
            patientId,
            time: bookingTime
        }, token);
        alert("Appointment booked successfully!");
        closeModal();
    } catch (error) {
        alert("Booking failed: " + error.message);
    }
};

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    // Render header and footer
    renderHeader();
    renderFooter();

    // Attach event listeners for login and signup buttons
    const loginLink = document.getElementById("login-link");
    const signupLink = document.getElementById("signup-link");

    if (loginLink) {
        loginLink.addEventListener("click", () => openModal("patientLogin"));
    }

    if (signupLink) {
        signupLink.addEventListener("click", () => openModal("patientSignup"));
    }

    loadDoctorCards();

    if (searchBar) {
        searchBar.addEventListener("input", filterDoctorsOnChange);
    }

    if (filterTime) {
        filterTime.addEventListener("change", filterDoctorsOnChange);
    }

    if (filterSpecialty) {
        filterSpecialty.addEventListener("change", filterDoctorsOnChange);
    }
});