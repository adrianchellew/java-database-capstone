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