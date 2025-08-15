<h1 align="center">🎓 University Assignment Portal</h1>
<p align="center">
A centralized portal for managing university assignments with role-based access for <b>Admins</b>, <b>Staff/Instructors</b>, and <b>Students</b>.
</p>

<p align="center">
  <strong>Frontend:</strong> React (Vite) • HTML • CSS • JavaScript &nbsp;|&nbsp;
  <strong>Backend:</strong> Spring Boot (Java) • Spring Web • Spring Data JPA • CORS config &nbsp;|&nbsp;
  <strong>Database:</strong> MySQL
</p>

---

## 📊 Project Overview

| Item | Details |
|-----:|:--------|
| **🎯 Purpose** | Streamline assignment posting, submission, and grading in one platform |
| **🧑‍🤝‍🧑 Roles** | Admin, Staff/Instructor, Student |
| **🔒 Security** | Auth endpoints + role-based routing on the client |
| **🗄️ Persistence** | MySQL via Spring Data JPA |
| **🌐 CORS** | Enabled via `WebConfig.java` (frontend ↔ backend) |

---

## ✨ Key Features

- 🔑 **Authentication** – Login for all roles  
- 🎭 **Role-Based Access** – Separate dashboards & privileges  
- 📋 **Assignments** – Create, edit, publish, set deadlines  
- 📤 **Submissions** – Students submit with GitHub & Live Demo links  
- 📝 **Grading** – Staff reviews and assigns grades  
- 📊 **Status & Results** – Students see submission state & grades  

---

## 🛠 Tech Stack

| Frontend | Backend | Database |
|----------|---------|----------|
| React (Vite), React Router | Spring Boot (Web, JPA), CORS | MySQL |

---

## 📂 Folder Structure

````text
AssignmentSubmissionPortal/
│
├── 📁 Backend (Spring Boot)
│   ├── src/main/java/com/example/university
│   │   ├── 📁 config
│   │   │   └── WebConfig.java
│   │   │
│   │   ├── 📁 controller
│   │   │   ├── AdminController.java
│   │   │   ├── AuthController.java
│   │   │   ├── StaffController.java
│   │   │   └── StudentController.java
│   │   │
│   │   ├── 📁 exception
│   │   │   └── GlobalExceptionHandler.java
│   │   │
│   │   ├── 📁 model
│   │   │   ├── AddStudentsRequest.java
│   │   │   ├── Assignment.java
│   │   │   ├── ClassDetailsDTO.java
│   │   │   ├── Course.java
│   │   │   ├── CreateClassRequest.java
│   │   │   ├── GradeSubmissionRequest.java
│   │   │   ├── LoginRequest.java
│   │   │   ├── LoginResponse.java
│   │   │   ├── StudentAssignmentDTO.java
│   │   │   ├── StudentDTO.java
│   │   │   ├── StudentProfileDTO.java
│   │   │   ├── Submission.java
│   │   │   ├── SubmissionStatusDTO.java
│   │   │   └── User.java
│   │   │
│   │   ├── 📁 repository
│   │   │   ├── AssignmentRepository.java
│   │   │   ├── CourseRepository.java
│   │   │   ├── StudentRepository.java
│   │   │   ├── SubmissionRepository.java
│   │   │   └── UserRepository.java
│   │   │
│   │   └── UniversitySubmissionSystemApplication.java
│   │
│   ├── src/main/resources
│   │   ├── application.properties
│   │   └── schema.sql
│   │
│   └── pom.xml
│
├── 📁 Frontend (React - Vite)
│   ├── public/
│   ├── src/
│   │   ├── 📁 assets
│   │   ├── 📁 components
│   │   │   ├── AddStudentsModal.jsx
│   │   │   ├── CreateClass.jsx
│   │   │   ├── PostAssignment.jsx
│   │   │   ├── ViewClasses.jsx
│   │   │   └── ViewSubmissions.jsx
│   │   ├── 📁 pages
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AssignmentSubmissionView.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── StaffDashboard.jsx
│   │   │   └── StudentDashboard.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── eslint.config.js
│   ├── package.json
│   └── vite.config.js
│
├── 📁 PortalScreenShorts
│   ├── AdminPage.jpg
│   ├── AnsSubmissionPage.jpg
│   ├── LoginPage.jpg
│   ├── CreateClassPage.jpg
│   ├── PostAssignmentPage.jpg
│   ├── GradingPage.jpg
│   ├── ViewGradePage.jpg
│   └── DatabaseSchema.jpg
│
└── README.md

````
## ⚙️ Backend Configuration (`application.properties`)



## Server Configuration

server.port=8080


## MySQL Database Configuration

spring.datasource.url=jdbc:mysql://localhost:3306/university_portal?useSSL=false&serverTimezone=UTC
spring.datasource.username=YOUR_DB_USER
spring.datasource.password=YOUR_DB_PASSWORD


## JPA / Hibernate Configuration

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

---
## 📸 Screenshots

#### 🔑 Login Page
![Login Page](https://raw.githubusercontent.com/Sowndharya617/AssignmentSubmissionPortal/main/PortalScreenShorts/LoginPage.png)

#### 🛠️ Admin Dashboard
![Admin Dashboard](https://raw.githubusercontent.com/Sowndharya617/AssignmentSubmissionPortal/main/PortalScreenShorts/AdminPage.png)

#### 🎓 Staff Portal – Creating a Class
![Create Class Page](https://raw.githubusercontent.com/Sowndharya617/AssignmentSubmissionPortal/main/PortalScreenShorts/CreatingClass3.png)

#### 📤 Staff Portal – Posting an Assignment
![Post Assignment Page](https://raw.githubusercontent.com/Sowndharya617/AssignmentSubmissionPortal/main/PortalScreenShorts/AssignmentPosting5.png)

#### 📝 Student Portal – Viewing Assignments
![Student Task View Page](https://raw.githubusercontent.com/Sowndharya617/AssignmentSubmissionPortal/main/PortalScreenShorts/StudentTaskView7.png)

#### 🎉 Student Portal – Submission Confirmation
![Submission Confirmation](https://raw.githubusercontent.com/Sowndharya617/AssignmentSubmissionPortal/main/PortalScreenShorts/Confirmation10.png)

#### ✅ Staff Portal – Viewing Submissions
![Staff Viewing Submissions](https://raw.githubusercontent.com/Sowndharya617/AssignmentSubmissionPortal/main/PortalScreenShorts/StaffAnsView12.png)

####  grading Portal – Grading a Submission
![Grading Page](https://raw.githubusercontent.com/Sowndharya617/AssignmentSubmissionPortal/main/PortalScreenShorts/Grading13.png)

#### 📊 Student Portal – Viewing Grades
![View Grade Page](https://raw.githubusercontent.com/Sowndharya617/AssignmentSubmissionPortal/main/PortalScreenShorts/Grade%20View15.png)

