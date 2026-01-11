package com.project.back_end.controllers;

import com.project.back_end.models.Appointment;
import com.project.back_end.services.AppointmentService;
import com.project.back_end.services.Service;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final Service service;

    public AppointmentController(AppointmentService appointmentService, Service service) {
        this.appointmentService = appointmentService;
        this.service = service;
    }

    // 1. getAppointments: Retrieves appointments for a specific doctor on a specific date
    @GetMapping("/{date}/{patientName}/{token}")
    public ResponseEntity<Map<String, Object>> getAppointments(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @PathVariable String patientName,
            @PathVariable String token) {

        // Validate token for doctor role
        ResponseEntity<Map<String, String>> tokenValidation = service.validateToken(token, "doctor");
        if (tokenValidation != null) {
            return new ResponseEntity<>(null, tokenValidation.getStatusCode());
        }

        Map<String, Object> appointments = appointmentService.getAppointment(patientName, date, token);
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    // 2. bookAppointment: Books a new appointment for a patient
    @PostMapping("/{token}")
    public ResponseEntity<Map<String, String>> bookAppointment(
            @PathVariable String token,
            @RequestBody Appointment appointment) {

        // Validate token for patient role
        ResponseEntity<Map<String, String>> tokenValidation = service.validateToken(token, "patient");
        if (tokenValidation != null) {
            return tokenValidation;
        }

        // Validate appointment availability via the general Service class
        int validationStatus = service.validateAppointment(appointment);
        if (validationStatus == 1) {
            int result = appointmentService.bookAppointment(appointment);
            if (result == 1) {
                return new ResponseEntity<>(Map.of("message", "Appointment booked successfully"), HttpStatus.CREATED);
            }
        }

        return new ResponseEntity<>(Map.of("message", "Failed to book appointment: Time slot unavailable or invalid doctor"), HttpStatus.BAD_REQUEST);
    }

    // 3. updateAppointment: Updates an existing appointment
    @PutMapping("/{token}")
    public ResponseEntity<Map<String, String>> updateAppointment(
            @PathVariable String token,
            @RequestBody Appointment appointment) {

        // Validate token for patient role
        ResponseEntity<Map<String, String>> tokenValidation = service.validateToken(token, "patient");
        if (tokenValidation != null) {
            return tokenValidation;
        }

        return appointmentService.updateAppointment(appointment);
    }

    // 4. cancelAppointment: Cancels an existing appointment
    @DeleteMapping("/{id}/{token}")
    public ResponseEntity<Map<String, String>> cancelAppointment(
            @PathVariable long id,
            @PathVariable String token) {

        // Validate token for patient role
        ResponseEntity<Map<String, String>> tokenValidation = service.validateToken(token, "patient");
        if (tokenValidation != null) {
            return tokenValidation;
        }

        return appointmentService.cancelAppointment(id, token);
    }
}