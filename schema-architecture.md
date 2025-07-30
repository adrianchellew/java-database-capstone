This Spring Boot application integrates both MVC and REST controllers. Thymeleaf powers the Admin and Doctor dashboards, while REST APIs handle all other modules. Data is managed across two databases: MySQL stores patient, doctor, appointment, and admin information using JPA entities, while MongoDB is dedicated to prescriptions via document models. All incoming requests are routed through a shared service layer, which then directs them to the relevant repositories.



1. User Interaction: A user initiates a request, either by accessing a web page like the AdminDashboard through a browser or by using a client application that interacts with REST API endpoints like Appointments.
2. Request Routing: The incoming request is directed to the appropriate controller within the Spring Boot application. Requests for HTML pages are handled by Thymeleaf Controllers, while API requests are managed by REST Controllers.
3. Business Logic Execution: The controller calls the centralized Service Layer to handle the core business logic, such as validating data or coordinating complex operations.
4. Data Access Invocation: The service layer communicates with the Repository Layer to fetch or save data, using either MySQL Repositories for relational data or the MongoDB Repository for document data.
5. Database Interaction: The repositories execute commands against the databases. The MySQL Repository accesses the MySQL Database for entities like patients and doctors, while the MongoDB Repository accesses the MongoDB Database for documents like prescriptions.
6. Model Mapping: Data retrieved from the database is mapped into corresponding Java objects. Relational data from MySQL is converted into JPA Entities (e.g., Patient, Doctor), and document data from MongoDB is mapped into MongoDB Models (e.g., Prescription).
7. Response Generation: These populated models are sent back up the call stack. For web pages, Thymeleaf Controllers use the models to render dynamic HTML. For API calls, REST Controllers serialize the models into JSON and return them in the HTTP response.



