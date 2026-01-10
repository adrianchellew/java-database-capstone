import { API_BASE_URL } from '../config/config.js';
const DOCTOR_API = API_BASE_URL + '/doctor';

export async function getDoctors() {
    try {
        const response = fetch(DOCTOR_API);

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        return result.doctors || [];

    } catch (error) {
        console.error(error.message);
        return [];
    }

}

export async function deleteDoctor(id, token){
    try {
        const url = `${DOCTOR_API}/${id}/${token}`;

        const response = fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to delete doctor');
        }

        return {
            success: true,
            message: result.message || 'Doctor deleted successfully'
        };

    } catch (error) {
        console.error('Delete operation failed:', error.message);
        return {
            success: false,
            message: error.message
        };
    }

}

export async function saveDoctor(doctor, token) {

    try {

        const response = fetch(DOCTOR_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(doctor)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to add doctor');
        }

        return {
            success: true,
            message: result.message || 'Doctor added successfully'
        };

    } catch (error) {
        console.error('Doctor creation operation failed:', error.message);
        return {
            success: false,
            message: error.message
        };
    }
}

export async function filterDoctors(name = '' ,time = '' ,speciality= '') {

    try {
        const url = `${DOCTOR_API}/${name}/${time}/${speciality}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch doctors: ${response.statusText}`);
        }

        const result = await response.json();

        return result.doctors || [];

    } catch (error) {
        console.error('Filtering error:', error.message);
        alert('Could not filter doctors. Please try again later.');

        return [];
    }
}