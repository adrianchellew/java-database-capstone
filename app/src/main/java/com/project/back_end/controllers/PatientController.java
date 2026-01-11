package com.project.back_end.controllers;

import com.project.back_end.DTO.Login;
import com.project.back_end.models.Patient;
import com.project.back_end.services.PatientService;
import com.project.back_end.services.Service;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("patient")
public class PatientController {

    private final PatientService patientService;
    private final Service service;

    public PatientController(PatientService patientService, Service service) {
        this.patientService = patientService;
        this.service = service;
    }

    /**
     * Registers a new patient after checking if they already exist in the system.
     */
    @PostMapping("/register")
    public int registerPatient(@RequestBody Patient patient) {
        // Validate if the patient already exists by email or phone
        if (service.validatePatient(patient)) {
            return patientService.createPatient(patient); //
        }
        return -1; // Indicates patient already exists
    }

    /**
     * Authenticates a patient and returns a JWT token if successful.
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> patientLogin(@RequestBody Login login) {
        // Uses the central service to validate credentials and generate a token
        return service.validatePatientLogin(login);
    }

    /**
     * Retrieves the details of a patient using their authentication token.
     */
    @GetMapping("/{token}")
    public ResponseEntity<Map<String, Object>> getPatientDetails(@PathVariable String token) {
        // Extracts patient info from the token
        return patientService.getPatientDetails(token);
    }

    /**
     * Fetches appointments for a patient with optional filters for doctor name and condition.
     */
    @GetMapping("/appointments/{token}")
    public ResponseEntity<Map<String, Object>> filterPatientAppointments(
            @PathVariable String token,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String condition) {

        // Delegates to the service to apply filtering logic based on provided criteria
        return service.filterPatient(condition, name, token);
    }
}

