package com.project.back_end.controllers;

import com.project.back_end.models.Doctor;
import com.project.back_end.DTO.Login;
import com.project.back_end.services.DoctorService;
import com.project.back_end.services.Service;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("${api.path}/doctor")
public class DoctorController {
    private final DoctorService doctorService;
    private final Service service;

    public DoctorController(DoctorService doctorService, Service service) {
        this.doctorService = doctorService;
        this.service = service;
    }

    /**
     * 1. Get Doctor Availability
     * Fetches available slots for a doctor on a specific date after validating the token.
     */
    @GetMapping("/availability/{user}/{doctorId}/{date}/{token}")
    public ResponseEntity<Map<String, Object>> getDoctorAvailability(
            @PathVariable String user,
            @PathVariable Long doctorId,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @PathVariable String token) {

        ResponseEntity<Map<String, String>> tokenValidation = service.validateToken(token, user);
        if (tokenValidation != null) {
            return new ResponseEntity<>(null, tokenValidation.getStatusCode());
        }

        List<String> availability = doctorService.getDoctorAvailability(doctorId, date);
        return new ResponseEntity<>(Map.of("availability", availability), HttpStatus.OK);
    }

    /**
     * 2. Get All Doctors
     * Returns a full list of doctors registered in the system.
     */
    @GetMapping
    public List<Doctor> getDoctors() {
        return doctorService.getDoctors();
    }

    /**
     * 3. Add Doctor
     * Saves a new doctor to the database.
     */
    @PostMapping("/{token}")
    public ResponseEntity<Map<String, String>> addDoctor(@PathVariable String token, @RequestBody Doctor doctor) {

        if (service.validateToken(token, "admin") != null) {
            return service.validateToken(token, "admin");
        }

        Map<String, String> response = new HashMap<>();

        int result = doctorService.saveDoctor(doctor);

        if (result == 1) {
            response.put("message", "Doctor added to db");
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } else if (result == -1) {
            response.put("message", "Doctor already exists");
            return new ResponseEntity<>(response, HttpStatus.CONFLICT);
        }

        response.put("message", "Some internal error occurred");
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * 4. Update Doctor
     * Updates details for an existing doctor.
     */
    @PutMapping
    public int updateDoctor(@RequestBody Doctor doctor) {
        return doctorService.updateDoctor(doctor);
    }

    /**
     * 5. Delete Doctor
     * Deletes a doctor and their associated appointments by ID.
     */
    @DeleteMapping("/{id}/{token}")
    public ResponseEntity<Map<String, String>> deleteDoctor(@PathVariable long id, @PathVariable String token) {

        if (service.validateToken(token, "admin") != null) {
            return service.validateToken(token, "admin");
        }

        Map<String, String> response = new HashMap<>();

        int result = doctorService.deleteDoctor(id);

        if (result == 1) {
            response.put("message", "Doctor updated");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else if (result == -1) {
            response.put("message", "Doctor not found");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        response.put("message", "Some internal error occurred");
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * 6. Doctor Login
     * Validates doctor credentials and returns an authentication token.
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> doctorLogin(@RequestBody Login login) {
        return doctorService.validateDoctor(login);
    }

    /**
     * 7. Filter Doctors
     * Filters doctors based on optional name, specialty, and time.
     */
    @GetMapping("/filter/{name}/{time}/{specialty}")
    public Map<String, Object> filterDoctors(
            @PathVariable String name,
            @PathVariable String time,
            @PathVariable String specialty) {
        return service.filterDoctor(name, specialty, time);
    }
}