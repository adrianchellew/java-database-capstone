# Schema Design for the Smart Clinic Management System

## MySQL Database Design

### Table: `admins`
- `id`: INT, Primary Key, AUTO_INCREMENT, NOT NULL
- `username`: VARCHAR(255), UNIQUE, NOT NULL
- `password_hash`: VARCHAR(255), NOT NULL
- `created_at`: TIMESTAMP, DEFAULT CURRENT_TIMESTAMP

### Table: `doctors`
- `id`: INT, Primary Key, AUTO_INCREMENT, NOT NULL
- `full_name`: VARCHAR(255), NOT NULL
- `specialisation`: VARCHAR(255), NOT NULL
- `email`: VARCHAR(255), UNIQUE, NOT NULL
- `phone_number`: VARCHAR(20)
- `password_hash`: VARCHAR(255), NOT NULL
- `created_at`: TIMESTAMP, DEFAULT CURRENT_TIMESTAMP

### Table: `patients`
- `id`: INT, Primary Key, AUTO_INCREMENT, NOT NULL
- `full_name`: VARCHAR(255), NOT NULL
- `email`: VARCHAR(255), UNIQUE, NOT NULL
- `phone_number`: VARCHAR(20)
- `password_hash`: VARCHAR(255), NOT NULL
- `date_of_birth`: DATE
- `created_at`: TIMESTAMP, DEFAULT CURRENT_TIMESTAMP

### Table: `appointments`
- `id`: INT, Primary Key, AUTO_INCREMENT, NOT NULL
- `doctor_id`: INT, Foreign Key -> `doctors(id)`, NOT NULL
- `patient_id`: INT, Foreign Key -> `patients(id)`, NOT NULL
- `appointment_datetime`: DATETIME, NOT NULL
- `status`: INT (0 = Scheduled, 1 = Completed, 2 = Cancelled)
- `created_at`: TIMESTAMP, DEFAULT CURRENT_TIMESTAMP

---

## MongoDB Collection Design

### Collection: `prescriptions`

**Example Document:**
```json
{
  "_id": "ObjectId('64c3a1b2d3e4f5a6b7c8d9e0')",
  "appointment_id": 101,
  "patient_id": 45,
  "doctor_id": 12,
  "issue_date": "2025-08-15T10:30:00Z",
  "medications": [
    {
      "name": "Lisinopril",
      "dosage": "10mg",
      "frequency": "Once daily",
      "instructions": "Take in the morning with food.",
      "refillCount": 0
    },
    {
      "name": "Amoxicillin",
      "dosage": "500mg",
      "frequency": "Every 8 hours for 7 days",
      "instructions": "Finish the entire course.",
      "refillCount": 2
    }
  ],
  "doctor_notes": "Patient diagnosed with a mild bacterial infection. Follow up in one week if symptoms do not improve.",
  "pharmacy": {
    "name": "Local Pharmacy",
    "contact": "011-555-0102",
    "location": "Market Street"
  }
}
```