package com.project.back_end.services;

import com.project.back_end.models.Appointment;
import com.project.back_end.models.Doctor;
import com.project.back_end.DTO.Login;
import com.project.back_end.repo.AppointmentRepository;
import com.project.back_end.repo.DoctorRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;
    private final TokenService tokenService;

    public DoctorService(DoctorRepository doctorRepository, AppointmentRepository appointmentRepository, TokenService tokenService) {
        this.doctorRepository = doctorRepository;
        this.appointmentRepository = appointmentRepository;
        this.tokenService = tokenService;
    }

    // 1. getDoctorAvailability: Fetches available slots for a doctor on a given date
    @Transactional(readOnly = true)
    public List<String> getDoctorAvailability(Long doctorId, LocalDate date) {
        Doctor doctor = doctorRepository.findById(doctorId).orElse(null);
        if (doctor == null) {
            return Collections.emptyList();
        }

        // Fetch all appointments for this doctor on the specific date
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX);
        List<Appointment> appointments = appointmentRepository.findByDoctorIdAndAppointmentTimeBetween(doctorId, startOfDay, endOfDay);

        // Get the doctor's standard available times
        List<String> availableSlots = new ArrayList<>(doctor.getAvailableTimes());

        // Remove slots that are already booked
        for (Appointment appointment : appointments) {
            // Assuming the slot string starts with the time (e.g., "10:00-11:00")
            // and appointment time matches the start of the slot.
            String bookedTime = appointment.getAppointmentTime().toLocalTime().toString();
            // Simple logic to remove the slot if it starts with the booked time
            availableSlots.removeIf(slot -> slot.startsWith(bookedTime));
        }

        return availableSlots;
    }

    // 2. saveDoctor: Saves a new doctor to the database
    @Transactional
    public int saveDoctor(Doctor doctor) {
        try {
            // Check if doctor exists by email
            if (doctorRepository.findByEmail(doctor.getEmail()) != null) {
                return -1; // Conflict
            }
            doctorRepository.save(doctor);
            return 1; // Success
        } catch (Exception e) {
            return 0; // Internal Error
        }
    }

    // 3. updateDoctor: Updates details of an existing doctor
    @Transactional
    public int updateDoctor(Doctor doctor) {
        try {
            if (!doctorRepository.existsById(doctor.getId())) {
                return -1; // Not found
            }
            doctorRepository.save(doctor);
            return 1; // Success
        } catch (Exception e) {
            return 0; // Internal Error
        }
    }

    // 4. getDoctors: Retrieves a list of all doctors
    @Transactional(readOnly = true)
    public List<Doctor> getDoctors() {
        return doctorRepository.findAll();
    }

    // 5. deleteDoctor: Deletes a doctor by ID
    @Transactional
    public int deleteDoctor(long id) {
        try {
            if (!doctorRepository.existsById(id)) {
                return -1; // Not found
            }
            // Delete associated appointments first
            appointmentRepository.deleteAllByDoctorId(id);
            doctorRepository.deleteById(id);
            return 1; // Success
        } catch (Exception e) {
            return 0; // Internal Error
        }
    }

    // 6. validateDoctor: Validates doctor credentials and returns a token
    @Transactional(readOnly = true)
    public ResponseEntity<Map<String, String>> validateDoctor(Login login) {
        Doctor doctor = doctorRepository.findByEmail(login.getEmail());
        Map<String, String> response = new HashMap<>();

        if (doctor != null && doctor.getPassword().equals(login.getPassword())) {
            String token = tokenService.generateToken(doctor.getEmail());
            response.put("token", token);
            response.put("message", "Login successful");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    // 7. findDoctorByName: Finds doctors by partial name match
    @Transactional(readOnly = true)
    public Map<String, Object> findDoctorByName(String name) {
        List<Doctor> doctors = doctorRepository.findByNameLike("%" + name + "%");
        Map<String, Object> response = new HashMap<>();
        response.put("doctors", doctors);
        return response;
    }

    // 8. filterDoctorsByNameSpecialityAndTime
    @Transactional(readOnly = true)
    public Map<String, Object> filterDoctorsByNameSpecialityAndTime(String name, String specialty, String amOrPm) {
        List<Doctor> doctors = doctorRepository.findByNameContainingIgnoreCaseAndSpecialtyIgnoreCase(name, specialty);
        List<Doctor> filteredDoctors = filterDoctorByTime(doctors, amOrPm);

        Map<String, Object> response = new HashMap<>();
        response.put("doctors", filteredDoctors);
        return response;
    }

    // 9. filterDoctorByNameAndTime
    @Transactional(readOnly = true)
    public Map<String, Object> filterDoctorByNameAndTime(String name, String amOrPm) {
        // Assuming findByNameLike or similar for name filtering, then filter by time
        List<Doctor> doctors = doctorRepository.findByNameLike("%" + name + "%");
        List<Doctor> filteredDoctors = filterDoctorByTime(doctors, amOrPm);

        Map<String, Object> response = new HashMap<>();
        response.put("doctors", filteredDoctors);
        return response;
    }

    // 10. filterDoctorByNameAndSpeciality
    @Transactional(readOnly = true)
    public Map<String, Object> filterDoctorByNameAndSpeciality(String name, String specialty) {
        List<Doctor> doctors = doctorRepository.findByNameContainingIgnoreCaseAndSpecialtyIgnoreCase(name, specialty);
        Map<String, Object> response = new HashMap<>();
        response.put("doctors", doctors);
        return response;
    }

    // 11. filterDoctorByTimeAndSpeciality
    @Transactional(readOnly = true)
    public Map<String, Object> filterDoctorByTimeAndSpeciality(String specialty, String amOrPm) {
        List<Doctor> doctors = doctorRepository.findBySpecialtyIgnoreCase(specialty);
        List<Doctor> filteredDoctors = filterDoctorByTime(doctors, amOrPm);

        Map<String, Object> response = new HashMap<>();
        response.put("doctors", filteredDoctors);
        return response;
    }

    // 12. filterDoctorBySpeciality
    @Transactional(readOnly = true)
    public Map<String, Object> filterDoctorBySpeciality(String specialty) {
        List<Doctor> doctors = doctorRepository.findBySpecialtyIgnoreCase(specialty);
        Map<String, Object> response = new HashMap<>();
        response.put("doctors", doctors);
        return response;
    }

    // 13. filterDoctorsByTime
    @Transactional(readOnly = true)
    public Map<String, Object> filterDoctorsByTime(String amOrPm) {
        List<Doctor> doctors = doctorRepository.findAll();
        List<Doctor> filteredDoctors = filterDoctorByTime(doctors, amOrPm);

        Map<String, Object> response = new HashMap<>();
        response.put("doctors", filteredDoctors);
        return response;
    }

    // Helper: filterDoctorByTime (Private method)
    private List<Doctor> filterDoctorByTime(List<Doctor> doctors, String amOrPm) {
        return doctors.stream()
                .filter(doctor -> {
                    for (String slot : doctor.getAvailableTimes()) {
                        // Extract hour from slot "HH:mm-HH:mm"
                        try {
                            int hour = Integer.parseInt(slot.split(":")[0]);
                            if ("AM".equalsIgnoreCase(amOrPm) && hour < 12) {
                                return true;
                            }
                            if ("PM".equalsIgnoreCase(amOrPm) && hour >= 12) {
                                return true;
                            }
                        } catch (NumberFormatException e) {
                            // ignore invalid format
                        }
                    }
                    return false;
                })
                .collect(Collectors.toList());
    }
}
