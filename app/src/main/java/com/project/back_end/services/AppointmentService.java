package com.project.back_end.services;

import com.project.back_end.models.Appointment;
import com.project.back_end.models.Doctor;
import com.project.back_end.repo.AppointmentRepository;
import com.project.back_end.repo.DoctorRepository;
import com.project.back_end.repo.PatientRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final TokenService tokenService;
    private final com.project.back_end.services.Service validationService;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              PatientRepository patientRepository,
                              DoctorRepository doctorRepository,
                              TokenService tokenService,
                              com.project.back_end.services.Service validationService) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.tokenService = tokenService;
        this.validationService = validationService;
    }

    // 1. bookAppointment: Books a new appointment [cite: 399]
    @Transactional
    public int bookAppointment(Appointment appointment) {
        try {
            appointmentRepository.save(appointment); //


            return 1; // Success
        } catch (Exception e) {
            return 0; // Failure
        }
    }

    // 2. updateAppointment: Updates an existing appointment
    @Transactional
    public ResponseEntity<Map<String, String>> updateAppointment(Appointment appointment) {
        Map<String, String> response = new HashMap<>();
        // Check if appointment exists
        if (appointmentRepository.findById(appointment.getId()).isEmpty()) {
            response.put("message", "Appointment not found");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        // Validate appointment update using Service validation logic
        int validationResult = validationService.validateAppointment(appointment);
        if (validationResult == 1) {
            appointmentRepository.save(appointment);
            response.put("message", "Appointment updated successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response.put("message", "Invalid update: Time slot unavailable or invalid doctor");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    // 3. cancelAppointment: Cancels an existing appointment
    @Transactional
    public ResponseEntity<Map<String, String>> cancelAppointment(long id, String token) {
        Map<String, String> response = new HashMap<>();
        Appointment appointment = appointmentRepository.findById(id).orElse(null);

        if (appointment == null) {
            response.put("message", "Appointment not found");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        // Ensure patient canceling is the one who booked it [cite: 403]
        String patientEmail = tokenService.extractIdentifier(token);
        if (!appointment.getPatient().getEmail().equals(patientEmail)) {
            response.put("message", "Unauthorized to cancel this appointment");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        appointmentRepository.delete(appointment); //
        response.put("message", "Appointment cancelled successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 4. getAppointment: Retrieves appointments for a doctor on a specific date
    @Transactional(readOnly = true)
    public Map<String, Object> getAppointment(String pname, LocalDate date, String token) {
        Map<String, Object> response = new HashMap<>();
        String doctorEmail = tokenService.extractIdentifier(token);
        Doctor doctor = doctorRepository.findByEmail(doctorEmail);

        if (doctor != null) {
            LocalDateTime startOfDay = date.atStartOfDay();
            LocalDateTime endOfDay = date.atTime(LocalTime.MAX);

            // Fetch doctor's appointments for the day
            List<Appointment> appointments = appointmentRepository.findByDoctorIdAndAppointmentTimeBetween(
                    doctor.getId(), startOfDay, endOfDay);

            // Filter by patient name if provided
            if (pname != null && !pname.isEmpty()) {
                appointments = appointments.stream()
                        .filter(a -> a.getPatient().getName().toLowerCase().contains(pname.toLowerCase()))
                        .collect(Collectors.toList());
            }

            response.put("appointments", appointments);
        }
        return response;
    }
}