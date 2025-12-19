import { getAllAppointments } from './services/appointmentRecordService.js';
import { createPatientRow } from './components/patientRows.js'

document.addEventListener('DOMContentLoaded', function() {

    renderContent();

    const patientTableBody = document.getElementById('patientTableBody');
    let selectedDate = new Date().toISOString().split('T')[0];
    const token = localStorage.getItem('token');
    let patientName = null;

    function loadAppointments() {
        patientTableBody.innerHTML = '';

        try {
            const appointments = getAllAppointments(selectedDate, patientName, token);

            if (appointments.length > 0) {
                for (const appointment of appointments) {
                    const patient = {
                        id: appointment.patientId,
                        name: appointment.patientName,
                        phone: appointment.patientPhone,
                        email: appointment.patientEmail
                    }
                    patientTableBody.append(createPatientRow(patient, appointment.id, appointment.doctorId));
                }
            } else {
                patientTableBody.innerHTML = `
            <tr>
                <td colspan="5">No Appointments found for today</td>
            </tr>`;
            }
        } catch (error) {
            patientTableBody.innerHTML = `
            <tr>
                <td colspan="5">Error occurred. Could not retrieve appointments.</td>
            </tr>`;
        }
    }

    loadAppointments();

    document.getElementById('searchBar').addEventListener('input', function(event) {
        const query = event.target.value.trim();
        if (query !== '') {
            patientName = query;
        } else {
            patientName = null;
        }
        loadAppointments();
    });

    document.getElementById('todayButton').addEventListener('click', function(event) {
        selectedDate = new Date().toISOString().split('T')[0];
        document.getElementById('datePicker').value = selectedDate;
        loadAppointments();
    });

    document.getElementById('datePicker').addEventListener('change', function(event) {
        selectedDate = event.target.value;
        loadAppointments();
    });
});
