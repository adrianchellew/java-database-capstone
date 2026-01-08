# User Story Template
**Title:**
_As a [user role], I want [feature/goal], so that [reason]._
**Acceptance Criteria:**
1. [Criteria 1]
2. [Criteria 2]
3. [Criteria 3]
   **Priority:** [High/Medium/Low]
   **Story Points:** [Estimated Effort in Points]
   **Notes:**
- [Additional information or edge cases]

---

# Admin User Stories

**Title:** Admin Login
_As a admin, I want to log into the portal with my username and password, so that I can manage the platform securely._
**Acceptance Criteria:**
1. The system validates the username and password against stored credentials.
2. Upon successful authentication, the admin is directed to the main Admin Dashboard.
3. Upon failed authentication, the system displays an error message and remains on the login page.
   **Priority:** High
   **Story Points:** 5
   **Notes:** Requires JWT authentication implementation.

---

**Title:** Admin Logout
_As a admin, I want to log out of the portal, so that I can protect system access._
**Acceptance Criteria:**
1. The system invalidates the current session/token.
2. The user is redirected to the main login page.
3. Attempting to navigate back to a restricted page redirects to the login page.
   **Priority:** High
   **Story Points:** 3
   **Notes:** Standard security feature.

---

**Title:** Admin Add Doctor
_As a admin, I want to add new doctors to the portal, so that they can be assigned patients and appointments._
**Acceptance Criteria:**
1. The admin can submit a form including the doctor's name, specialization, email, and initial password.
2. The system creates a new doctor profile and sends a confirmation email.
3. The new doctor appears in the list of all active doctors.
   **Priority:** Medium
   **Story Points:** 8
   **Notes:** Requires input validation for all fields.

---

**Title:** Admin Delete Doctor
_As a admin, I want to delete a doctor's profile from the portal, so that I can remove staff who are no longer working with the clinic._
**Acceptance Criteria:**
1. The admin can select a doctor's profile and initiate a deletion process.
2. The system prompts a confirmation dialog before permanent deletion.
3. The doctor's profile is removed from the database and related schedules are cleared (or marked as cancelled).
   **Priority:** Medium
   **Story Points:** 8
   **Notes:** Need to handle cascade deletion or marking appointments as cancelled/reassigned.

---

**Title:** Admin Track Usage Statistics
_As a admin, I want to run a stored procedure via the MySQL CLI, so that I can get the number of appointments per month and track usage statistics._
**Acceptance Criteria:**
1. The stored procedure is correctly defined in the MySQL database.
2. When executed, the procedure returns an aggregate count of appointments grouped by month.
3. The query completes within 5 seconds.
   **Priority:** Low
   **Story Points:** 5
   **Notes:** This is a database-level task, not a UI feature.

---

# Patient User Stories

**Title:** Patient View Doctors (Unauthenticated)
_As a patient, I want to view a list of doctors without logging in, so that I can explore options before registering._
**Acceptance Criteria:**
1. The system displays a public-facing page listing doctors' names and specializations.
2. The page loads successfully without requiring authentication.
3. Clicking on a doctor's name does not show private information like contact details or appointments.
   **Priority:** High
   **Story Points:** 3
   **Notes:** Only public data should be exposed.

---

**Title:** Patient Sign Up
_As a patient, I want to sign up using my email and password, so that I can register for the portal and book appointments._
**Acceptance Criteria:**
1. The user can access a registration form and submit required details (email, password, name).
2. The system securely hashes the password and saves the new user record.
3. The patient is automatically logged in or redirected to the login page upon successful registration.
   **Priority:** High
   **Story Points:** 8
   **Notes:** Requires email validation logic.

---

**Title:** Patient Login
_As a patient, I want to log into the portal, so that I can manage my bookings._
**Acceptance Criteria:**
1. The system authenticates the patient using their credentials.
2. On successful login, the patient is redirected to their personal dashboard.
3. Authentication failure displays an appropriate error message.
   **Priority:** High
   **Story Points:** 5
   **Notes:** Standard authentication implementation.

---

**Title:** Patient Logout
_As a patient, I want to log out of the portal, so that I can secure my account._
**Acceptance Criteria:**
1. The patient can click a "Logout" button.
2. The current session is terminated.
3. The patient is redirected to the public home or login page.
   **Priority:** High
   **Story Points:** 3
   **Notes:** Standard security feature.

---

**Title:** Patient Book Appointment
_As a patient, I want to log in and book an hour-long appointment with a doctor, so that I can consult with a medical professional._
**Acceptance Criteria:**
1. The patient can view a doctor's available slots (60-minute duration).
2. The patient can select an available slot and confirm the booking.
3. The system sends an appointment confirmation email to the patient and the doctor.
   **Priority:** High
   **Story Points:** 13
   **Notes:** Requires logic to check doctor availability and slot duration.

---

**Title:** Patient View Upcoming Appointments
_As a patient, I want to view my upcoming appointments, so that I can prepare accordingly._
**Acceptance Criteria:**
1. The patient's dashboard displays a list of all future appointments.
2. Each entry shows the doctor's name, date, time, and status.
3. The list is sorted by date, with the soonest appointment first.
   **Priority:** Medium
   **Story Points:** 5
   **Notes:** Data must be retrieved from the appointment database.

---

# Doctor User Stories

**Title:** Doctor Login
_As a doctor, I want to log into the portal, so that I can manage my appointments._
**Acceptance Criteria:**
1. The system validates the doctor's unique credentials.
2. Upon successful authentication, the doctor is directed to their personal Appointment Dashboard.
3. Failed login attempts result in an error message.
   **Priority:** High
   **Story Points:** 5
   **Notes:** Must ensure proper role-based authentication to distinguish from admin/patient.

---

**Title:** Doctor Logout
_As a doctor, I want to log out of the portal, so that I can protect my data._
**Acceptance Criteria:**
1. The doctor can terminate their session via a logout action.
2. All session data is cleared, and the doctor is redirected to the login screen.
3. Back navigation to previous pages is prevented.
   **Priority:** High
   **Story Points:** 3
   **Notes:** Standard security practice.

---

**Title:** Doctor View Appointment Calendar
_As a doctor, I want to view my appointment calendar, so that I can stay organized._
**Acceptance Criteria:**
1. The system displays a calendar view (e.g., daily/weekly) of all scheduled appointments.
2. Each appointment block is clickable to view patient details.
3. The calendar accurately reflects time zone settings.
   **Priority:** Medium
   **Story Points:** 8
   **Notes:** Requires a robust date/time implementation.

---

**Title:** Doctor Mark Unavailability
_As a doctor, I want to mark my unavailability, so that the system informs patients of only the available slots._
**Acceptance Criteria:**
1. The doctor can specify a range of dates and times (e.g., vacation) as unavailable.
2. The system prevents patients from booking appointments during marked unavailable times.
3. The doctor can easily view and edit their unavailability schedule.
   **Priority:** High
   **Story Points:** 8
   **Notes:** Availability logic must integrate with the booking feature.

---

**Title:** Doctor Update Profile
_As a doctor, I want to update my profile with specialization and contact information, so that patients have up-to-date information._
**Acceptance Criteria:**
1. The doctor can access an editable profile page.
2. Changes to specialization, contact info, and bio can be saved successfully.
3. The updated information is immediately reflected on the public doctor listing page.
   **Priority:** Medium
   **Story Points:** 5
   **Notes:** Profile updates should require validation.

---

**Title:** Doctor View Patient Details
_As a doctor, I want to view the patient details for upcoming appointments, so that I can be prepared for the consultation._
**Acceptance Criteria:**
1. Clicking on an upcoming appointment opens a view of the patient's record (name, contact, brief history).
2. Access is restricted to details relevant only to the current appointment.
3. The view is easily accessible from the main appointment calendar.
   **Priority:** High
   **Story Points:** 8
   **Notes:** Data privacy and access controls are critical for this feature.