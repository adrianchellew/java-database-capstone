import {openModal} from './components/modals.js';
import {getDoctors, filterDoctors, saveDoctor} from './services/doctorServices.js';
import {createDoctorCard} from './components/doctorCard.js';

document.getElementById('addDocBtn').addEventListener('click', (e) => {
    openModal('addDoctor');
});

document.addEventListener('DOMContentLoaded', () => {
    loadDoctorCards();
});

function renderDoctorCards(doctors) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';
    for (const doctor of doctors) {
        contentDiv.appendChild(createDoctorCard(doctor));
    }
}

async function loadDoctorCards() {
    const doctors = await getDoctors();
    renderDoctorCards(doctors);
}

document.getElementById('searchBar').addEventListener('input', filterDoctorsOnChange);
document.getElementById('filterTime').addEventListener('change', filterDoctorsOnChange);
document.getElementById('filterSpecialty').addEventListener('change', filterDoctorsOnChange);

async function filterDoctorsOnChange() {
    const name = document.getElementById('searchBar');
    const time = document.getElementById('filterTime');
    const specialty = document.getElementById('filterSpecialty')
    const filteredDoctors = await filterDoctors();
    if (filteredDoctors.doctors.length === 0) {
        alert('No doctors found');
    } else {
        renderDoctorCards(filteredDoctors.doctors);
    }
}

async function adminAddDoctor() {
    const name = document.getElementById('doctorName').value;
    const speciality = document.getElementById('specialization').value;
    const email = document.getElementById('doctorEmail').value;
    const password = document.getElementById('doctorPassword').value;
    const phone = document.getElementById('doctorPhone').value;
    const availableTimes = Array.from(
        document.querySelectorAll('input[type="checkbox"]:checked'),
        (input) => input.value
    );

    const token = localStorage.getItem('token');

    if (!token) {
        alert('No token found.');
    } else {
        const doctor = {
            name: name,
            speciality: speciality,
            email: email,
            password: password,
            phone: phone,
            availableTimes: availableTimes
        };
        const result = await saveDoctor(doctor, token);
        if (result.success) {
            alert(result.message);
            document.getElementById('modal').style.display = 'none';
            location.reload();
        } else {
            alert(result.message);
        }
    }

}