/*


  7. Add Role-Specific Header Content

     * Depending on the user's role, different actions or buttons are rendered in the header:
       - **Admin**: Can add a doctor and log out.
       - **Doctor**: Has a home button and log out.
       - **Patient**: Shows login and signup buttons.
       - **LoggedPatient**: Has home, appointments, and logout options.
       ```javascript
       else if (role === "admin") {
         headerContent += `
           <button id="addDocBtn" class="adminBtn" onclick="openModal('addDoctor')">Add Doctor</button>
           <a href="#" onclick="logout()">Logout</a>`;
       } else if (role === "doctor") {
         headerContent += `
           <button class="adminBtn"  onclick="selectRole('doctor')">Home</button>
           <a href="#" onclick="logout()">Logout</a>`;
       } else if (role === "patient") {
         headerContent += `
           <button id="patientLogin" class="adminBtn">Login</button>
           <button id="patientSignup" class="adminBtn">Sign Up</button>`;
       } else if (role === "loggedPatient") {
         headerContent += `
           <button id="home" class="adminBtn" onclick="window.location.href='/pages/loggedPatientDashboard.html'">Home</button>
           <button id="patientAppointments" class="adminBtn" onclick="window.location.href='/pages/patientAppointments.html'">Appointments</button>
           <a href="#" onclick="logoutPatient()">Logout</a>`;
       }
       ```



  9. Close the Header Section



  10. Render the Header Content

     * Insert the dynamically generated `headerContent` into the `headerDiv` element.
       ```javascript
       headerDiv.innerHTML = headerContent;
       ```

  11. Attach Event Listeners to Header Buttons

     * Call `attachHeaderButtonListeners` to add event listeners to any dynamically created buttons in the header (e.g., login, logout, home).
       ```javascript
       attachHeaderButtonListeners();
       ```


  ### Helper Functions

  13. **attachHeaderButtonListeners**: Adds event listeners to login buttons for "Doctor" and "Admin" roles. If clicked, it opens the respective login modal.

  14. **logout**: Removes user session data and redirects the user to the root page.

  15. **logoutPatient**: Removes the patient's session token and redirects to the patient dashboard.

  16. **Render the Header**: Finally, the `renderHeader()` function is called to initialize the header rendering process when the page loads.
*/

function logout() {
    localStorage.clearRole();
    localStorage.removeItem("token");
    window.location.href = "/";
}

function logoutPatient() {
    localStorage.removeItem("token");
    setRole("patient");
    window.location.href = "/patientDashboard";

}

function renderHeader() {
    const headerDiv = document.getElementById("header");

    if (window.location.pathname.endsWith("/")) {
        localStorage.removeItem("userRole");
        headerDiv.innerHTML = `
           <header class="header">
             <div class="logo-section">
               <img src="../assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
               <span class="logo-title">Hospital CMS</span>
             </div>
           </header>`;
        return;
    }

    const role = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");

    let headerContent = "";

    if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
        localStorage.removeItem("userRole");
        alert("Session expired or invalid login. Please log in again.");
        window.location.href = "/";
        return;
    } else if (role === "admin") {
        headerContent += `
       <button id="addDocBtn" class="adminBtn" onclick="openModal('addDoctor')">Add Doctor</button>
       <a href="#" onclick="logout()">Logout</a>`;
    } else if (role === "doctor") {
        headerContent += `
       <button class="adminBtn"  onclick="selectRole('doctor')">Home</button>
       <a href="#" onclick="logout()">Logout</a>`;
    } else if (role === "patient") {
        headerContent += `
       <button id="patientLogin" class="adminBtn">Login</button>
       <button id="patientSignup" class="adminBtn">Sign Up</button>`;
    } else if (role === "loggedPatient") {
        headerContent += `
       <button id="home" class="adminBtn" onclick="window.location.href='/pages/loggedPatientDashboard.html'">Home</button>
       <button id="patientAppointments" class="adminBtn" onclick="window.location.href='/pages/patientAppointments.html'">Appointments</button>
       <a href="#" onclick="logoutPatient()">Logout</a>`;
    }

    headerDiv.innerHTML = headerContent;

    attachHeaderButtonListeners();

    function attachHeaderButtonListeners() {
        if (role === "patient") {
            document.getElementById("patientLogin").addEventListener("click", loginPatient);
            document.getElementById("patientSignup").addEventListener("click", patientSignup);
        }
    }
}

renderHeader();