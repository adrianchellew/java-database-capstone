import {openModal} from '../components/modals.js';
import {API_BASE_URL} from '../config/config.js';

const ADMIN_API = API_BASE_URL + '/admin';
const DOCTOR_API = API_BASE_URL + '/doctor/login';

window.onload = () => {
    const adminLogin = document.getElementById('adminLogin');
    const doctorLogin = document.getElementById('doctorLogin');

    if (adminLogin) {
        adminLogin.addEventListener('click', () => {
            openModal('adminLogin');
        }) ;
    }
    if (doctorLogin) {
        doctorLogin.addEventListener('click', () => {
            openModal('doctorLogin');
        }) ;
    }
}

window.adminLoginHandler = async function (event) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const admin = { username, password };

    try {
        const response = await fetch(ADMIN_API, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(admin)
        });

        const result = await response.json();

        if (!response.ok) {
            alert("An occurred occurred while trying to log in: " + result.message);
            return;
        }

        localStorage.setItem('token', result.token);
        selectRole('admin');

    } catch (error) {
        alert("An occurred occurred while trying to log in.");
        console.error("An occurred occurred while trying to log in: ", error);
    }
}

window.doctorLoginHandler = async function (event) {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const doctor = { email, password };

    try {
        const response = await fetch(DOCTOR_API, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(doctor)
        });

        const result = await response.json();

        if (!response.ok) {
            alert("An occurred occurred while trying to log in: " +  result.message);
            return;
        }

        localStorage.setItem('token', result.token);
        selectRole('doctor');

    } catch (error) {
        alert("An occurred occurred while trying to log in.");
        console.error("An occurred occurred while trying to log in: ", error);
    }
}