# Database Schema Design

## MySQL Database Design

The relational database will store structured data with strong relationships, such as user accounts, roles, and scheduled appointments. This design uses standard SQL data types and constraints to ensure data integrity.

### Table: admins
- admin_id: BIGINT, Primary Key, Auto Increment, Unique identifier for the administrator.
- username: VARCHAR(50), Not Null, Unique, Admin's unique login username.
- password: VARCHAR(255), Not Null, Hashed password for security.
- full_name: VARCHAR(100), Not Null, Full name of the administrator.

### Table: doctors
- doctor_id: BIGINT, Primary Key, Auto Increment, Unique identifier for the doctor.
- first_name: VARCHAR(50), Not Null, Doctor's first name.
- last_name: VARCHAR(50), Not Null, Doctor's last name.
- email: VARCHAR(100), Not Null, Unique, Doctor's email address (used for login).
- phone: VARCHAR(15), Not Null, Doctor's contact phone number.
- specialization: VARCHAR(100), Not Null, Doctor's medical specialization.
- password: VARCHAR(255), Not Null, Hashed password.
- is_active: BOOLEAN, Default True, Status flag (e.g., active or retired).

### Table: patients
- patient_id: BIGINT, Primary Key, Auto Increment, Unique identifier for the patient.
- first_name: VARCHAR(50), Not Null, Patient's first name.
- last_name: VARCHAR(50), Not Null, Patient's last name.
- email: VARCHAR(100), Not Null, Unique, Patient's email address (used for login).
- phone: VARCHAR(15), Not Null, Patient's contact phone number.
- date_of_birth: DATE, Not Null, Patient's date of birth.
- password: VARCHAR(255), Not Null, Hashed password.

### Table: appointments
- appointment_id: BIGINT, Primary Key, Auto Increment, Unique identifier for the appointment.
- patient_id: BIGINT, Foreign Key → patients(patient_id), Foreign key linking to the patient who booked the appointment.
- doctor_id: BIGINT, Foreign Key → doctors(doctor_id), Foreign key linking to the doctor assigned to the appointment.
- appointment_date: DATE, Not Null, The date of the appointment.
- start_time: TIME, Not Null, The scheduled start time.
- end_time: TIME, Not Null, The scheduled end time.
- status: VARCHAR(20), Not Null, Status (e.g., SCHEDULED, COMPLETED, CANCELLED).
- reason: TEXT, Null, Reason for the visit.

## MongoDB Collection Design

**Collection Name:** `prescriptions`

**Design Justification:**
Prescriptions are chosen for MongoDB because they represent a natural document structure containing nested arrays (the list of medications) and their schema is likely to evolve quickly (e.g., adding fields for digital signature, or complex dosage instructions) without requiring schema migration for the core relational tables. Using a document model keeps all related prescription details together, offering performance benefits by reducing the need for joins.

**Example Document Structure (JSON):**

```json
{
  "_id": ObjectId("61a5c2d3f0a5c4e7d8f9a0b1"),
  "patient_id": 456, 
  "doctor_id": 101,   
  "appointment_id": 7890,
  "issue_date": ISODate("2025-11-28T10:30:00Z"),
  "refill_due_date": ISODate("2025-12-28T10:30:00Z"),
  "status": "Active",
  "medications": [
    {
      "name": "Amoxicillin",
      "dosage": "500 mg",
      "frequency": "Twice daily",
      "duration_days": 7,
      "refills": 1,
      "notes": "Take with food to minimize stomach upset."
    },
    {
      "name": "Ibuprofen",
      "dosage": "200 mg",
      "frequency": "As needed (max 3 per day)",
      "duration_days": 30,
      "refills": 3,
      "notes": "For mild pain relief."
    }
  ],
  "doctor_notes": "Patient diagnosed with common cold. Follow up in one week if symptoms persist.",
  "last_updated": ISODate("2025-11-28T10:30:00Z")
}