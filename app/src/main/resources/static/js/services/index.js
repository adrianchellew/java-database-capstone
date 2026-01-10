import { openModal } from "../components/modals.js";
import { API_BASE_URL } from "../config/config.js";

const ADMIN_API = API_BASE_URL + '/admin';
const DOCTOR_API = API_BASE_URL + '/doctor/login';

window.onload = function () {
    const adminBtn = document.getElementById('adminLogin');
    const doctorBtn = document.getElementById('doctorLogin');
    if (adminBtn) {
        adminBtn.addEventListener('click', () => {
            openModal('adminLogin');
        });
    }
    if (doctorBtn) {
        doctorBtn.addEventListener('click', () => {
            openModal('doctorLogin');
        });
    }

}

export async function adminLoginHandler() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const admin = { username, password };

    try {
        const response = fetch(ADMIN_API, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(admin)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Invalid credentials');
        }

        if (result.token) {
            localStorage.setItem('token', result.token);
        } else {
            console.warn('Token not found in response');
        }

        selectRole('admin');

    } catch (error) {
        console.error('Login failed: ', error.message);
        alert(error.message);
    }
}

export async function doctorLoginHandler() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const doctor = { email, password };

    try {
        const response = fetch(DOCTOR_API, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(doctor)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Invalid credentials');
        }

        if (result.token) {
            localStorage.setItem('token', result.token);
        } else {
            console.warn('Token not found in response');
        }

        selectRole('doctor');

    } catch (error) {
        console.error('Login failed: ', error.message);
        alert(error.message);
    }
}
