import {deleteDoctor} from '../services/doctorServices.js';
import {getPatientData} from '../services/patientServices.js';
import {showBookingOverlay} from '../loggedPatient.js';

export function createDoctorCard(doctor) {
    const card = document.createElement('div');
    card.classList.add('doctor-card');

    const role = localStorage.getItem('role');

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('doctor-info');

    const name = document.createElement('h3');
    name.textContent = doctor.name;

    const specialty = document.createElement('h3');
    specialty.textContent = doctor.specialty;

    const email = document.createElement('h3');
    email.textContent = doctor.email;

    const availability = document.createElement('h3');
    availability.textContent = doctor.availableTimes.join(', ');

    infoDiv.appendChild(name);
    infoDiv.appendChild(specialty);
    infoDiv.appendChild(email);
    infoDiv.appendChild(availability);

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('card-actions');

    if (role === 'admin') {
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Delete';
        removeBtn.addEventListener('click', async () => {
            if (confirm(`Are you sure you want to delete ${doctor.name}`)) {
                const token = localStorage.getItem('token');
                deleteDoctor(token);
                card.remove();
            }
        });
        actionsDiv.appendChild(removeBtn);
    } else if (role === 'patient') {
        const bookNow = document.createElement('button');
        bookNow.textContent = 'Book Now';
        bookNow.addEventListener('click', () => {
            alert('Patient needs to log in first.');
        });
        actionsDiv.appendChild(bookNow);
    } else if (role === 'loggedPatient') {
        const bookNow = document.createElement('button');
        bookNow.textContent = 'Book Now';
        bookNow.addEventListener('click', async (e) => {
            const token = localStorage.getItem('token');
            const patientData = await getPatientData(token);
            showBookingOverlay(e, doctor, patientData);
        });
    }

    card.appendChild(infoDiv);
    card.appendChild(actionsDiv);

    return card;
}