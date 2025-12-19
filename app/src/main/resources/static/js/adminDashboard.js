<<<<<<< HEAD
import { openModal } from './components/modals.js';
import { getDoctors, filterDoctors, saveDoctor } from './services/doctorServices.js';
import { createDoctorCard } from './components/doctorCard.js';


document.getElementById('addDocBtn').addEventListener('click', () => {
    openModal('addDoctor');
});

function renderDoctorCards(doctors) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';
    for (const doctor of doctors) {
        contentDiv.append(createDoctorCard(doctor));
    }
}

function loadDoctorCards() {
    const doctors = getDoctors();
    if (doctors.length > 0) {
        renderDoctorCards(doctors);
    }
}

window.onload = function() {
    loadDoctorCards();
}

function filterDoctorsOnChange() {
    const name = document.getElementById('searchBar').value;
    const time = document.getElementById('filterTime').value;
    const speciality = document.getElementById('filterSpeciality').value;
    const doctors = filterDoctors(name, time, speciality);
    if (doctors.length > 0) {
        renderDoctorCards(doctors);
    } else {
        document.getElementById('content').innerHTML = 'No doctors found with the given filters.';
    }
}

document.getElementById('searchBar').addEventListener('input', filterDoctorsOnChange);
document.getElementById('filterTime').addEventListener('change', filterDoctorsOnChange);
document.getElementById('filterSpecialty').addEventListener('change', filterDoctorsOnChange);

function adminAddDoctor() {
    const doctor = {
        name: document.getElementById('doctorName').value,
        speciality: document.getElementById('specialization').value,
        email: document.getElementById('doctorEmail').value,
        password: document.getElementById('doctorPassword').value,
        phone: document.getElementById('doctorPhone').value,
        availableTimes: []
    };

    document.getElementsByName('availability').forEach(availableTime => {
        doctor.availableTimes.push(availableTime.value);
    });

    const token = localStorage.getItem('token');
    const result = saveDoctor(doctor, token)
    if (result.success) {
        alert(result.message);
        document.getElementById('modal').style.display = 'none';
    } else {
        alert(result.message);
    }
}
=======
/*
  This script handles the admin dashboard functionality for managing doctors:
  - Loads all doctor cards
  - Filters doctors by name, time, or specialty
  - Adds a new doctor via modal form


  Attach a click listener to the "Add Doctor" button
  When clicked, it opens a modal form using openModal('addDoctor')


  When the DOM is fully loaded:
    - Call loadDoctorCards() to fetch and display all doctors


  Function: loadDoctorCards
  Purpose: Fetch all doctors and display them as cards

    Call getDoctors() from the service layer
    Clear the current content area
    For each doctor returned:
    - Create a doctor card using createDoctorCard()
    - Append it to the content div

    Handle any fetch errors by logging them


  Attach 'input' and 'change' event listeners to the search bar and filter dropdowns
  On any input change, call filterDoctorsOnChange()


  Function: filterDoctorsOnChange
  Purpose: Filter doctors based on name, available time, and specialty

    Read values from the search bar and filters
    Normalize empty values to null
    Call filterDoctors(name, time, specialty) from the service

    If doctors are found:
    - Render them using createDoctorCard()
    If no doctors match the filter:
    - Show a message: "No doctors found with the given filters."

    Catch and display any errors with an alert


  Function: renderDoctorCards
  Purpose: A helper function to render a list of doctors passed to it

    Clear the content area
    Loop through the doctors and append each card to the content area


  Function: adminAddDoctor
  Purpose: Collect form data and add a new doctor to the system

    Collect input values from the modal form
    - Includes name, email, phone, password, specialty, and available times

    Retrieve the authentication token from localStorage
    - If no token is found, show an alert and stop execution

    Build a doctor object with the form values

    Call saveDoctor(doctor, token) from the service

    If save is successful:
    - Show a success message
    - Close the modal and reload the page

    If saving fails, show an error message
*/
>>>>>>> a7ed0a5c599ed8819f6e24c27bb8ee7a2edfae78
