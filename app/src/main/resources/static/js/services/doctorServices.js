import {API_BASE_URL} from '../config/config.js';
const DOCTOR_API = API_BASE_URL + '/doctor';

export async function getDoctors() {
    try {
        const response = await fetch(DOCTOR_API);
        const result = await response.json();

        if (!response.ok) {
            console.error('There was an issue fetching doctors: ' + response.statusText);
            return [];
        }

        console.log(result);

        return result;

    } catch (error) {
        console.error('There was an issue fetching doctors:' + error);
        return [];
    }
}

export async function deleteDoctor(id, token) {
    try {
        const response = await fetch(DOCTOR_API + '/' + id + '/' + token, {
            method: 'DELETE'
        });
        const result = await response.json();
        if (!response.ok) {
            return {success: false, message: result.message};
        } else {
            return {success: true, message: result.message};
        }
    } catch (error) {
        console.error('There was an issue deleting doctor: ' + error);
        return {success: false, message: 'There was an issue deleting doctor.'};
    }

}

export async function saveDoctor(doctor, token) {
    try {
        const response = await fetch(DOCTOR_API + '/' + token, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(doctor)
        });
        const result = await response.json();
        if (!response.ok) {
            return {success: false, message: result.message};
        } else {
            return {success: true, message: result.message};
        }
    } catch (error) {
        console.error('Could not add doctor: ' + error);
        return {success: false, message: 'Could not add doctor.'};
    }
}

export async function filterDoctors(name, time, specialty) {
    try {
        const response = await fetch(DOCTOR_API + '/filter/' + name + '/' + time + '/' + specialty);
        const result = await response.json();
        if (!response.ok) {
            console.error('There was an issue filtering doctors: ' + response.statusText);
            return { doctors: [] };
        }
        return result;
    } catch (error) {
        console.error('There was an issue filtering doctors:' + error);
        alert('There was an issue filtering doctors');
        return { doctors: [] };
    }
}