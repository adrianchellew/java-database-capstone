import { showBookingOverlay } from '../loggedPatient';
import { deleteDoctor } from '../services/doctorServices.js';
import { getPatientData } from '../services/patientServices.js';

export function createDoctorCard(doctor) {

    const card = document.createElement('div');
    card.classList.add('doctor-card');

    const role = localStorage.getItem('userRole');

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('doctor-info');

    const name = document.createElement('h3');
    name.textContent = doctor.name;

    const specialization = document.createElement('h3');
    specialization.textContent = doctor.specialization;

    const email = document.createElement('h3');
    email.textContent = doctor.email;

    const availability = document.createElement('h3');
    availability.textContent = doctor.availability.join(', ');

    infoDiv.appendChild(name);
    infoDiv.appendChild(specialization);
    infoDiv.appendChild(email);
    infoDiv.appendChild(availability);

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('card-actions');

    if (role === 'admin') {
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Delete';
        removeBtn.addEventListener('click', async () => {
            const userConfirmed = confirm('Are you sure you want to perform this action?');
            if (userConfirmed) {
                const token = localStorage.getItem('token');
                const result = await deleteDoctor(token);
                if (result.success) {
                    card.remove();
                }
            }
        });
    } else if (role === 'patient') {
        const bookNow = document.createElement('button');
        bookNow.textContent = 'Book Now';
        bookNow.addEventListener('click', () => {
            alert('Patient needs to login first.');
        });
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