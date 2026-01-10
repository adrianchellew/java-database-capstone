package com.project.back_end.controllers;

import com.project.back_end.models.Prescription;
import com.project.back_end.services.PrescriptionService;
import com.project.back_end.services.Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("${api.path}" + "/prescription")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;
    private final Service service;

    public PrescriptionController(PrescriptionService prescriptionService, Service service) {
        this.prescriptionService = prescriptionService;
        this.service = service;
    }

    /**
     * Saves a new prescription.
     * Maps to POST /prescription/{token}
     * Requires a valid Doctor token and a Prescription object in the body.
     */
    @PostMapping("/{token}")
    public ResponseEntity<Map<String, String>> savePrescription(
            @PathVariable String token,
            @RequestBody Prescription prescription) {

        // 1. Validate that the user is a Doctor (only doctors can write prescriptions)
        ResponseEntity<Map<String, String>> tokenValidation = service.validateToken(token, "doctor");
        if (tokenValidation != null) {
            return tokenValidation; // Returns 401 if invalid
        }

        // 2. Delegate to service to save the prescription
        return prescriptionService.savePrescription(prescription);
    }

    /**
     * Retrieves a prescription by appointment ID.
     * Maps to GET /prescription/{appointmentId}/{token}
     * Requires a valid Patient (or Doctor) token.
     */
    @GetMapping("/{appointmentId}/{token}")
    public ResponseEntity<Map<String, Object>> getPrescription(
            @PathVariable Long appointmentId,
            @PathVariable String token) {

        // 1. Validate the token (assuming Patients need to view their prescriptions)
        // Note: You could also allow "doctor" here depending on requirements.
        ResponseEntity<Map<String, String>> tokenValidation = service.validateToken(token, "patient");
        if (tokenValidation != null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        // 2. Delegate to service to fetch the prescription
        return prescriptionService.getPrescription(appointmentId);
    }
}