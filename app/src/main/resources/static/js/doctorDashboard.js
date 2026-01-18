import {getAllAppointments} from './services/appointmentRecordService.js';
import {createPatientRow} from './components/patientRows.js';

let selectedDate = new Date().toISOString().split('T')[0];
const token = localStorage.getItem('token');
let patientName = null;
const searchBar = document.getElementById('searchBar');
const todayButton = document.getElementById('todayButton');
const datePicker = document.getElementById('datePicker');
const patientTableBody = document.getElementById('patientTableBody');

searchBar.addEventListener('input', (e) => {
    const inputValue = e.target.value.trim();
    if (inputValue.length > 0) {
        patientName = inputValue;
    } else {
        patientName = null;
    }
    console.log('patientName Updated: ', patientName);
    loadAppointments();
});

    todayButton.addEventListener('click', (e) => {
        console.log('clicked');
        selectedDate = new Date().toISOString().split('T')[0];
        datePicker.value = selectedDate;
        loadAppointments();
    });

    datePicker.addEventListener('change', (e) => {
        selectedDate = e.target.value;
        console.log(selectedDate);
        loadAppointments();
    });

async function loadAppointments() {
    patientTableBody.innerHTML = '';
    try {
        const result = await getAllAppointments(selectedDate, patientName, token);
        if (result.appointments.length > 0) {
            result.appointments.forEach(appointment => {
                console.log(appointment);
                const patient = {
                    id: appointment.patient.id,
                    name: appointment.patient.name,
                    phone: appointment.patient.phone,
                    email: appointment.patient.email
                };
                patientTableBody.appendChild(createPatientRow(patient, appointment.id, appointment.doctorId));
            });
        } else {
            patientTableBody.innerHTML = '</tr><td>Error loading appointments. Try again later.</td></tr>';
        }

    } catch (error) {
        patientTableBody.innerHTML = '</tr><td>Error loading appointments. Try again later.</td></tr>';
    }
}
document.addEventListener('DOMContentLoaded', () => {
    loadAppointments();
});