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

# User Stories

## Admin User Stories

**Title:**

_As an admin, I want to log into the portal with my username and password, so that I can manage the platform securely._

**Acceptance Criteria:**
1. The admin user can access a login page.
2. The system authenticates the provided username and password against stored admin credentials.
3. Upon successful login, the admin is redirected to the admin dashboard.
4. Upon unsuccessful login, an error message is displayed.

**Priority:** High
**Story Points:** 3
**Notes**:
- Implement robust password hashing and secure session management.

**Title:**
_As an admin, I want to log out of the portal, so that I can protect system access._

**Acceptance Criteria:**
1. There is a visible logout option on the admin dashboard.
2. Clicking the logout option terminates the admin's session.
3. The admin is redirected to the login page after logging out.

**Priority:** High
**Story Points:** 2
**Notes:**
- Ensure all session data is cleared upon logout.

**Title:**
_As an admin, I want to add doctors to the portal, so that they can manage their appointments and profiles._

**Acceptance Criteria:**
1. The admin can access a form to add new doctor details.
2. The form includes fields for doctor's name, specialization, contact information, and login credentials.
3. Upon successful submission, a new doctor profile is created in the system.
4. The new doctor receives credentials to log in.

**Priority:** High
**Story Points:** 5
**Notes:**
- Input validation for all fields is crucial. Consider unique email/username for doctors.

**Title:**
_As an admin, I want to delete a doctor's profile from the portal, so that I can remove inactive or unauthorized users._

**Acceptance Criteria:**
1. The admin can view a list of existing doctor profiles.
2. The admin can select a doctor and initiate a delete action.
3. A confirmation prompt appears before deletion.
4. Upon confirmation, the doctor's profile and associated data (e.g., login access) are removed from the system.

**Priority:** Medium
**Story Points:** 5
**Notes:**
- Consider the impact on historical appointment data if a doctor is deleted. Perhaps deactivation is a better first step.

**Title:**
_As an admin, I want to view monthly appointment statistics, so that I can track system usage and identify trends._

**Acceptance Criteria:**
1. The admin can access a report or dashboard showing monthly appointment counts.
2. The system accurately calculates and displays the number of appointments for each month.
3. The report is easily accessible and understandable.

**Priority:** Low
**Story Points:** 8
**Notes:**
- This story focuses on the need for statistics rather than the technical implementation details (like stored procedures). The underlying technical task would involve creating and optimizing the necessary database queries.

## Patient User Stories

**Title:**
_As a patient, I want to view a list of doctors without logging in, so that I can explore options before registering._

**Acceptance Criteria:**
1. A public-facing page displays a list of available doctors.
2. Each doctor entry includes basic information such as name and specialization.
3. No login is required to access this list.

**Priority:** High
**Story Points:** 3
**Notes:**
- Consider adding search and filter options for doctors (e.g., by specialization, location).

**Title:**
_As a patient, I want to sign up using my email and password, so that I can book appointments._

**Acceptance Criteria:**
1. There is a clear "Sign Up" option on the portal.
2. The sign-up form requires a valid email address and a secure password.
3. Upon successful registration, a new patient account is created.
4. The patient is automatically logged in or redirected to the login page after signing up.

**Priority:** High
**Story Points:** 5
**Notes:**
- Implement email verification for new registrations to ensure valid contact information.

**Title:**
_As a patient, I want to log into the portal, so that I can manage my bookings._

**Acceptance Criteria:**
1. The patient can access a login page.
2. The system authenticates the provided email and password against stored patient credentials.
3. Upon successful login, the patient is redirected to their dashboard to manage bookings.
4. Upon unsuccessful login, an error message is displayed.

**Priority:** High
**Story Points:** 3
**Notes:**
- Provide a "Forgot Password" option.

**Title:**
_As a patient, I want to log out of the portal, so that I can secure my account._

**Acceptance Criteria:**
1. There is a visible logout option on the patient dashboard.
2. Clicking the logout option terminates the patient's session.
3. The patient is redirected to the login page after logging out.

**Priority:** High
**Story Points:** 2
**Notes:**
- Ensure sensitive data is not cached in the browser after logout.

**Title:**
_As a patient, I want to view my upcoming appointments, so that I can prepare accordingly._

**Acceptance Criteria:**
1. The patient can access a section on their dashboard showing upcoming appointments.
2. Each appointment entry displays relevant details (e.g., doctor's name, date, time, specialization).
3. The list is organized chronologically.

**Priority:** High
**Story Points:** 4
**Notes:**
- Consider adding options to cancel or reschedule appointments, based on business rules.

## Doctor User Stories

**Title:**
_As a doctor, I want to log into the portal, so that I can manage my appointments._

**Acceptance Criteria:**
1. The doctor can access a login page.
2. The system authenticates the provided username and password against stored doctor credentials.
3. Upon successful login, the doctor is redirected to their appointment management dashboard.
4. Upon unsuccessful login, an error message is displayed.

**Priority:** High
**Story Points:** 3
**Notes:**
- Consider different login methods (e.g., email or username).

**Title:**
_As a doctor, I want to log out of the portal, so that I can protect my data._

**Acceptance Criteria:**
1. There is a visible logout option on the doctor dashboard.
2. Clicking the logout option terminates the doctor's session.
3. The doctor is redirected to the login page after logging out.

**Priority:** High
**Story Points:** 2
**Notes:**
- Ensure secure session termination.

**Title:**
_As a doctor, I want to view my appointment calendar, so that I can stay organized._

**Acceptance Criteria:**
1. The doctor can access an interactive calendar view of their appointments.
2. The calendar displays scheduled appointments with relevant details (patient name, time).
3. The doctor can navigate through different days/weeks/months.

**Priority:** High
**Story Points:** 5
**Notes:**
- Consider different calendar views (day, week, month) and color-coding for appointment statuses.

**Title:**
_As a doctor, I want to mark my unavailability, so that patients only see available slots._

**Acceptance Criteria:**
1. The doctor can access a feature to mark specific time slots or days as unavailable.
2. Marked unavailability is reflected in the patient-facing booking system, preventing new appointments during those times.
3. The doctor can easily edit or remove unavailability.

**Priority:** High
**Story Points:** 6
**Notes:**
- Differentiate between one-off unavailability and recurring unavailability (e.g., holidays, regular days off).

**Title:**
_As a doctor, I want to update my profile with specialization and contact information, so that patients have up-to-date information._

**Acceptance Criteria:**
1. The doctor can access and edit their profile details.
2. Editable fields include specialization, contact number, and any other relevant professional information.
3. Changes made to the profile are saved and immediately reflected for patients viewing the doctor's information.

**Priority:** Medium
**Story Points:** 4
**Notes:**
- Implement validation for contact information (e.g., valid phone number format).
