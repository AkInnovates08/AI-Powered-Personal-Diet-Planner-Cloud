# AI-Powered Personal Diet Planner with Cloud Storage

An AI-powered personal diet planning web application that generates personalized diet plans based on user profile information and provides secure cloud-ready storage for user data and uploaded files.

The project combines **React, FastAPI, JWT authentication, database storage, object storage, and AI-based diet recommendation logic** into a single full-stack cloud computing application.

---

## Table of Contents

* [Project Overview](#project-overview)
* [Objectives](#objectives)
* [Key Features](#key-features)
* [System Architecture](#system-architecture)
* [Technology Stack](#technology-stack)
* [Project Structure](#project-structure)
* [Application Modules](#application-modules)
* [How Cloud Computing Is Used](#how-cloud-computing-is-used)
* [AI Diet Planning](#ai-diet-planning)
* [Authentication and Security](#authentication-and-security)
* [Database and Storage](#database-and-storage)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Environment Configuration](#environment-configuration)
* [Running the Backend](#running-the-backend)
* [Running the Frontend](#running-the-frontend)
* [API Documentation](#api-documentation)
* [Testing](#testing)
* [Cloud Deployment](#cloud-deployment)
* [Screenshots](#screenshots)
* [Future Enhancements](#future-enhancements)
* [Project Use Case](#project-use-case)
* [Limitations](#limitations)
* [Disclaimer](#disclaimer)
* [Learning Outcomes](#learning-outcomes)
* [Author](#author)
* [License](#license)

---

## Project Overview

The **AI-Powered Personal Diet Planner with Cloud Storage** is a full-stack web application designed to help users create personalized diet plans using profile information such as age, gender, height, weight, activity level, dietary preference, and fitness goal.

The application provides:

* User registration and login
* JWT-based authentication
* Personal profile management
* AI-assisted diet plan generation
* Saved diet plan history
* File upload and download functionality
* Database-based user and plan storage
* Cloud-ready object storage integration
* REST API architecture
* Interactive dashboard
* API documentation using FastAPI Swagger
* Automated testing
* Cloud deployment support

The application can run locally using **SQLite and local file storage**, while the same architecture can be configured for **managed PostgreSQL and S3-compatible cloud object storage** during cloud deployment.

---

## Objectives

The main objectives of this project are:

1. Develop a complete cloud-ready full-stack application.
2. Implement secure user authentication using JWT.
3. Store user and diet-plan information in a relational database.
4. Generate personalized diet recommendations using AI/rule-based logic.
5. Provide persistent diet plan history.
6. Implement file upload and download functionality.
7. Demonstrate object storage concepts.
8. Build a RESTful backend using FastAPI.
9. Develop a responsive frontend using React.
10. Demonstrate cloud computing concepts such as:

* Cloud application hosting
* Database as a Service
* Object storage
* API-based architecture
* Authentication and security
* Environment-based configuration
* Scalability
* Availability
* Cloud deployment

---

## Key Features

### 1. User Registration

New users can create an account using:

* Name
* Email
* Password

Passwords are securely hashed before being stored.

---

### 2. User Login

Registered users can securely log in using their email and password.

The backend generates a JWT access token after successful authentication.

The token is used to access protected API endpoints.

---

### 3. User Profile

Users can manage their personal information, including:

* Age
* Gender
* Height
* Weight
* Activity level
* Dietary preference
* Fitness goal
* Food preferences
* Allergies

This information is used as input for diet-plan generation.

---

### 4. AI Diet Planner

The AI Planner uses user profile information to generate a personalized diet plan.

The generated plan can include:

* Breakfast
* Morning snack
* Lunch
* Evening snack
* Dinner
* Food recommendations
* Calorie-oriented guidance
* General nutritional suggestions

The application supports an external AI API through environment configuration and also provides a local rule-based fallback.

---

### 5. Saved Diet Plans

Generated diet plans can be saved to the database.

Users can:

* View saved plans
* Open plan details
* Delete saved plans
* Maintain plan history

---

### 6. Cloud File Storage

The application supports file management functionality.

Users can:

* Upload files
* View uploaded files
* Download files
* Delete files

The application is designed to support both:

* Local filesystem storage for development
* S3-compatible object storage for cloud deployment

---

### 7. Dashboard

The dashboard provides an overview of the user's application activity.

It can display information such as:

* User profile status
* Number of saved diet plans
* Uploaded files
* Recent activity
* Quick access to major application modules

---

### 8. REST API

The backend exposes REST API endpoints for:

* Authentication
* User profile management
* Diet-plan generation
* Saved plans
* File management
* Application health/status

---

### 9. API Documentation

FastAPI automatically provides interactive API documentation.

Swagger UI:

```text
http://127.0.0.1:8000/docs
```

OpenAPI specification:

```text
http://127.0.0.1:8000/openapi.json
```

---

## System Architecture

The project follows a client-server architecture.

### Local Development Architecture

```text
                    User
                     |
                     v
              React Frontend
                     |
                     | HTTP / REST API
                     v
              FastAPI Backend
               /      |       \
              /       |        \
             v        v         v
        SQLite     File      AI Engine
        Database   Storage    / Fallback
```

### Cloud Deployment Architecture

```text
                         User
                          |
                          v
                Cloud Frontend Hosting
                    React Application
                          |
                          | HTTPS / REST API
                          v
                 Cloud Backend Hosting
                    FastAPI Application
                     /      |       \
                    /       |        \
                   v        v         v
          Managed PostgreSQL   Object Storage
             Database          S3-Compatible
                   |
                   v
              User Data
             Diet Plans
             File Metadata

                          |
                          v
                    AI Service
              External AI API / Fallback
```

---

## Technology Stack

### Frontend

* React
* Vite
* JavaScript
* HTML5
* CSS3
* React Router
* Responsive UI

### Backend

* Python
* FastAPI
* Uvicorn
* Pydantic
* SQLAlchemy
* JWT Authentication
* Passlib / bcrypt

### Database

Development:

* SQLite

Cloud-ready:

* PostgreSQL

### Storage

Development:

* Local filesystem storage

Cloud-ready:

* S3-compatible object storage

### AI

* AI-powered recommendation layer
* External OpenAI-compatible API support
* Local rule-based fallback

### Testing

* Pytest

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Python Virtual Environment
* npm

---

## Project Structure

```text
AI-Powered-Personal-Diet-Planner-Cloud/
│
├── backend/
│   ├── __init__.py
│   ├── app.py
│   ├── config.py
│   ├── database.py
│   ├── dependencies.py
│   ├── models.py
│   ├── schemas.py
│   ├── security.py
│   │
│   ├── routes/
│   │   ├── auth.py
│   │   ├── profile.py
│   │   ├── plans.py
│   │   └── files.py
│   │
│   ├── services/
│   │   ├── ai_service.py
│   │   ├── diet_service.py
│   │   └── storage_service.py
│   │
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── components/
│   │   └── ...
│   │
│   ├── package.json
│   └── vite.config.js
│
├── ai_engine/
│   ├── diet_engine.py
│   └── food_data.json
│
├── cloud/
│   ├── ...
│   └── deployment documentation
│
├── tests/
│   └── test_core.py
│
├── docs/
│   ├── PROJECT_REPORT.md
│   ├── INTERVIEW.md
│   ├── DAYWISE_HISTORY.md
│   └── SCREENSHOT_CHECKLIST.md
│
├── sample_data/
│   └── demo_profile.json
│
├── storage/
│   └── .gitkeep
│
├── screenshots/
│   └── .gitkeep
│
├── .env.example
├── .gitignore
├── pytest.ini
├── requirements.txt
├── render.yaml
└── README.md
```

---

## Application Modules

### Authentication Module

Responsible for:

* User registration
* User login
* Password hashing
* JWT token generation
* Protected routes

---

### Profile Module

Responsible for storing and updating:

* Personal information
* Physical information
* Activity level
* Dietary preference
* Fitness goal
* Food preferences
* Allergies

---

### Diet Plan Module

Responsible for:

* Receiving user diet requirements
* Generating diet plans
* Saving plans
* Retrieving saved plans
* Deleting plans

---

### AI Engine

The AI engine provides personalized diet recommendations based on available user information.

The system is designed with two modes:

```text
AI Provider Available
        |
        v
External AI Service
        |
        v
Personalized Diet Plan
```

If the external AI service is unavailable:

```text
AI Provider Unavailable
        |
        v
Local Rule-Based Engine
        |
        v
Diet Plan
```

This fallback approach allows the application to remain usable during local development without requiring a paid AI API.

---

### File Storage Module

The storage service abstracts the storage implementation.

Development:

```text
Application
     |
     v
Local Storage
```

Cloud deployment:

```text
Application
     |
     v
S3-Compatible Object Storage
```

This separation allows the application to change its storage provider without redesigning the frontend.

---

## How Cloud Computing Is Used

Cloud computing is an important part of the project architecture.

### 1. Cloud Application Hosting

The React frontend and FastAPI backend can be deployed to cloud hosting platforms.

Instead of running only on a local computer:

```text
localhost
```

the application can be hosted on publicly accessible cloud infrastructure.

---

### 2. Cloud Database

The application supports PostgreSQL.

During cloud deployment, SQLite can be replaced with a managed PostgreSQL database.

The database stores:

* User accounts
* User profiles
* Saved diet plans
* File metadata

This demonstrates the concept of **Database as a Service**.

---

### 3. Cloud Object Storage

Uploaded files can be stored using an S3-compatible object storage service.

Object storage is suitable for files because it separates file storage from relational database storage.

The database can store metadata such as:

```text
File Name
File Type
File Size
Storage Key
Upload Date
User ID
```

while the actual file can be stored in object storage.

---

### 4. API-Based Architecture

The React frontend communicates with the FastAPI backend through REST APIs.

```text
React
  |
  | HTTP Request
  v
FastAPI
  |
  | Database / Storage / AI
  v
Cloud Services
```

This allows the frontend and backend to be deployed independently.

---

### 5. Authentication and Security

JWT authentication protects user-specific resources.

The backend validates the JWT token before allowing access to protected endpoints.

---

### 6. Environment-Based Configuration

Sensitive and environment-specific settings are stored using environment variables.

Examples include:

```text
DATABASE_URL
SECRET_KEY
AI_PROVIDER
AI_API_KEY
S3_ENDPOINT_URL
S3_BUCKET_NAME
S3_ACCESS_KEY
S3_SECRET_KEY
```

This prevents configuration values from being hard-coded into the source code.

---

### 7. Scalability

The application architecture separates:

* Frontend
* Backend
* Database
* File storage
* AI service

This separation allows individual components to be scaled independently when required.

For example:

```text
Multiple Users
      |
      v
Load Balancer
      |
      +-------- Backend Instance 1
      |
      +-------- Backend Instance 2
      |
      +-------- Backend Instance 3
```

---

### 8. Availability

Cloud deployment can provide higher availability than running the complete application on a single local machine.

Managed database and object storage services can also provide independent infrastructure for persistent data.

---

## AI Diet Planning

The diet planning system accepts information such as:

```text
Age
Gender
Height
Weight
Activity Level
Dietary Preference
Fitness Goal
Food Preferences
Allergies
```

The application processes these inputs and generates a structured diet plan.

A simplified workflow is:

```text
User Profile
     |
     v
Input Validation
     |
     v
Diet Recommendation Engine
     |
     +--------------------+
     |                    |
     v                    v
External AI          Local Fallback
     |                    |
     +---------+----------+
               |
               v
        Generated Plan
               |
               v
        Save to Database
```

The AI layer is designed to be replaceable, allowing the project to use either an external AI API or a local fallback implementation.

---

## Authentication and Security

The application includes basic security mechanisms.

### Password Hashing

Passwords are not stored as plain text.

Instead:

```text
User Password
      |
      v
Password Hashing
      |
      v
Database
```

---

### JWT Authentication

After login:

```text
User
 |
 | Email + Password
 v
FastAPI
 |
 | Validate Credentials
 v
JWT Token
 |
 v
Protected API Requests
```

The JWT token is used to authenticate requests to protected endpoints.

---

### Protected Resources

Examples include:

* User profile
* Saved diet plans
* Uploaded files
* User-specific data

Each authenticated request is associated with the logged-in user.

---

## Database and Storage

### Development Database

The default development configuration uses SQLite.

Example:

```text
SQLite
   |
   +-- Users
   +-- Profiles
   +-- Diet Plans
   +-- File Metadata
```

SQLite makes local development simple because no separate database server is required.

---

### Cloud Database

For production/cloud deployment, PostgreSQL can be configured using:

```text
DATABASE_URL
```

The backend reads the database connection from environment configuration.

---

### Local File Storage

For development, uploaded files can be stored inside:

```text
storage/
```

---

### Cloud Object Storage

For cloud deployment, the storage service can be configured to use an S3-compatible provider.

This provides separation between:

```text
Relational Database
        |
        | Metadata
        v
Object Storage
        |
        | Actual Files
        v
Uploaded Documents
```

---

## Prerequisites

Before running the project, install:

### Python

Python 3.10 or newer is recommended.

Check installation:

```powershell
python --version
```

---

### Node.js

Check installation:

```powershell
node --version
npm --version
```

---

### Git

Check installation:

```powershell
git --version
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/AI-Powered-Personal-Diet-Planner-Cloud.git
```

Move into the project:

```bash
cd AI-Powered-Personal-Diet-Planner-Cloud
```

---

## Backend Setup

Create a Python virtual environment:

```powershell
python -m venv .venv
```

Activate the environment:

```powershell
.venv\Scripts\Activate.ps1
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

---

## Environment Configuration

Create a `.env` file in the project root.

You can start from:

```text
.env.example
```

Example configuration:

```env
DATABASE_URL=sqlite:///./diet_planner.db

SECRET_KEY=change-this-secret-key

AI_PROVIDER=local

AI_API_KEY=

S3_ENDPOINT_URL=
S3_BUCKET_NAME=
S3_ACCESS_KEY=
S3_SECRET_KEY=
S3_REGION=
```

For local development, the local AI and SQLite configuration can be used.

For cloud deployment, configure the appropriate PostgreSQL, object storage, and AI provider values.

Never commit real API keys, passwords, secret keys, or cloud credentials to GitHub.

---

## Running the Backend

Open Terminal 1.

Navigate to the project directory:

```powershell
cd "C:\Users\Akshay\Cloud Computing\AI-Powered-Personal-Diet-Planner-Cloud"
```

Activate the virtual environment:

```powershell
.venv\Scripts\Activate.ps1
```

Start the FastAPI server:

```powershell
python -m uvicorn backend.app:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

---

## Running the Frontend

Open Terminal 2.

Navigate to the frontend:

```powershell
cd "C:\Users\Akshay\Cloud Computing\AI-Powered-Personal-Diet-Planner-Cloud\frontend"
```

Install frontend dependencies:

```powershell
npm install
```

Start the development server:

```powershell
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

---

## Running the Complete Application

The project requires both servers to be running.

### Terminal 1: Backend

```powershell
cd "C:\Users\Akshay\Cloud Computing\AI-Powered-Personal-Diet-Planner-Cloud"

.venv\Scripts\Activate.ps1

python -m uvicorn backend.app:app --reload
```

### Terminal 2: Frontend

```powershell
cd "C:\Users\Akshay\Cloud Computing\AI-Powered-Personal-Diet-Planner-Cloud\frontend"

npm install

npm run dev
```

Then open:

```text
http://localhost:5173
```

---

## API Documentation

FastAPI provides automatic interactive documentation.

Open:

```text
http://127.0.0.1:8000/docs
```

The Swagger interface can be used to:

* View available endpoints
* Inspect request schemas
* Authenticate
* Send API requests
* Test responses
* Verify backend functionality

The OpenAPI specification is available at:

```text
http://127.0.0.1:8000/openapi.json
```

---

## API Workflow

A typical user workflow is:

```text
1. Register
      |
      v
2. Login
      |
      v
3. Receive JWT Token
      |
      v
4. Update Profile
      |
      v
5. Generate Diet Plan
      |
      v
6. Save Diet Plan
      |
      v
7. View Plan History
      |
      v
8. Upload Files
      |
      v
9. Download/Delete Files
```

---

## Testing

The project includes automated backend tests using Pytest.

Activate the virtual environment:

```powershell
.venv\Scripts\Activate.ps1
```

Run:

```powershell
pytest -q
```

A successful test run confirms that the core project functionality passes the available automated tests.

---

## Cloud Deployment

The project is designed to be cloud-ready.

A production deployment can contain:

```text
React Frontend
       |
       v
Cloud Frontend Hosting
       |
       v
FastAPI Backend
       |
       +--------------------+
       |                    |
       v                    v
Managed PostgreSQL     Object Storage
       |
       v
Persistent Data
```

### Recommended Cloud Components

| Component      | Local Development | Cloud Deployment                 |
| -------------- | ----------------- | -------------------------------- |
| Frontend       | Vite Dev Server   | Cloud Frontend Hosting           |
| Backend        | Uvicorn           | Cloud Application Hosting        |
| Database       | SQLite            | Managed PostgreSQL               |
| File Storage   | Local `storage/`  | S3-Compatible Object Storage     |
| AI             | Local Fallback    | External AI API or Local Service |
| Authentication | JWT               | JWT over HTTPS                   |
| Configuration  | `.env`            | Cloud Environment Variables      |

The exact cloud provider can be selected based on project requirements and available student/free-tier resources.

---

## Cloud Computing Concepts Demonstrated

This project demonstrates several important cloud computing concepts.

### Software as a Service

The application can be accessed through a web browser without requiring users to install the complete backend infrastructure.

### Platform as a Service

The FastAPI backend can be deployed to a managed cloud application platform.

### Database as a Service

PostgreSQL can be hosted using a managed database service.

### Object Storage

Uploaded files can be stored independently using cloud object storage.

### RESTful Services

The frontend communicates with the backend through REST APIs.

### Authentication

JWT provides authenticated access to user-specific resources.

### Scalability

Frontend, backend, database, and storage are separated into independent components.

### Availability

Cloud-hosted infrastructure can provide better availability than a single local machine.

### Environment Configuration

Deployment-specific configuration is separated from application source code.

---

## Screenshots

Recommended screenshots for project documentation and presentation:

```text
screenshots/
│
├── 01_project_structure.png
├── 02_registration.png
├── 03_login.png
├── 04_dashboard.png
├── 05_user_profile.png
├── 06_ai_planner_input.png
├── 07_generated_diet_plan.png
├── 08_saved_plans.png
├── 09_cloud_files.png
├── 10_file_upload.png
├── 11_fastapi_swagger.png
├── 12_api_success.png
├── 13_backend_running.png
├── 14_cloud_architecture.png
├── 15_cloud_database.png
├── 16_cloud_object_storage.png
├── 17_cloud_backend_deployment.png
├── 18_live_cloud_application.png
├── 19_test_results.png
└── 20_github_repository.png
```

Only include cloud infrastructure screenshots when the corresponding service has actually been deployed.

Do not present local SQLite or local filesystem storage as a cloud database or cloud storage service.

---

## Example User Journey

### Step 1: Registration

The user creates an account.

```text
Name
Email
Password
```

---

### Step 2: Login

The user logs in using their registered credentials.

The backend returns a JWT token.

---

### Step 3: Profile

The user enters personal diet-planning information.

Example:

```text
Age: 24
Gender: Male
Height: 175 cm
Weight: 70 kg
Activity Level: Moderate
Diet: Vegetarian
Goal: Maintain Weight
```

---

### Step 4: Generate Plan

The application sends the required information to the backend.

The backend processes the request using the AI recommendation layer.

---

### Step 5: Save Plan

The generated diet plan can be saved to the database.

---

### Step 6: View History

The user can view previously saved diet plans.

---

### Step 7: File Management

The user can upload and manage files through the storage module.

---

## Project Benefits

The project demonstrates how multiple modern technologies can be integrated into one cloud-ready application.

It combines:

```text
Frontend Development
        +
Backend Development
        +
Database Management
        +
Cloud Storage
        +
Authentication
        +
Artificial Intelligence
        +
REST APIs
        +
Testing
        +
Cloud Deployment
```

This makes the project suitable for demonstrating practical concepts from:

* Cloud Computing
* Web Development
* Database Management
* Artificial Intelligence
* Software Engineering
* API Development
* Application Security

---

## Future Enhancements

Possible future improvements include:

### Advanced AI Recommendations

Integrate a more advanced AI model for:

* Meal substitutions
* Ingredient recommendations
* Dietary pattern analysis
* Natural-language diet planning
* Personalized meal explanations

### Nutrition Database Integration

Integrate a nutrition API or database for more detailed nutritional information.

### Meal Tracking

Allow users to record daily meals and compare actual intake with the generated plan.

### Progress Tracking

Add:

* Weight tracking
* BMI history
* Goal progress
* Weekly summaries

### Notifications

Implement notifications for:

* Meal reminders
* Daily plans
* Progress updates
* Hydration reminders

### Cloud Scalability

Future production deployments can add:

* Load balancing
* Auto-scaling
* CDN
* Caching
* Background task queues
* Monitoring
* Logging
* Error tracking

### Mobile Application

A mobile application can be developed using:

* React Native
* Flutter

while continuing to use the same FastAPI backend.

---

## Limitations

The current project is primarily designed as an educational cloud computing application.

The local development configuration uses:

```text
SQLite
Local File Storage
Local Rule-Based AI Fallback
```

These components can be replaced with cloud services during deployment.

The generated diet plans should not be treated as clinically prescribed nutrition plans.

---

## Disclaimer

This application is developed for educational and demonstration purposes.

The diet plans generated by the system are general wellness examples and are not medical advice.

Users with medical conditions, allergies, special dietary requirements, or other health concerns should consult a qualified healthcare or nutrition professional before making significant dietary changes.

The project uses synthetic/demo data for demonstration and testing purposes.

---

## Learning Outcomes

Through this project, the following concepts are demonstrated:

### Frontend Development

* React application development
* Component-based UI
* Client-side routing
* API integration
* Form handling
* Responsive interface design

### Backend Development

* FastAPI
* REST API development
* Request validation
* Authentication
* Database integration
* Service-based architecture

### Database

* Relational database concepts
* SQLite
* PostgreSQL compatibility
* ORM using SQLAlchemy
* Persistent application data

### Cloud Computing

* Cloud application architecture
* Managed database concepts
* Object storage
* Cloud hosting
* Environment variables
* Scalable architecture
* Service separation

### Artificial Intelligence

* AI API integration
* Rule-based fallback
* Personalized recommendation logic
* AI service abstraction

### Security

* Password hashing
* JWT authentication
* Protected API routes
* Environment-based secrets

### Software Engineering

* Modular project structure
* Automated testing
* Git/GitHub version control
* Documentation
* Deployment configuration



---

## Important GitHub Security Rules

Never upload:

```text
.env
API keys
Cloud access keys
Database passwords
JWT secret keys
Private credentials
```

The `.gitignore` file should exclude sensitive files and local-generated data.

Before pushing to GitHub, verify:

```bash
git status
```

and make sure no secret credentials are included.

---

## Project Status

```text
Project Type: Cloud Computing / Full-Stack AI Application

Frontend: React + Vite
Backend: FastAPI
Database: SQLite / PostgreSQL-ready
Storage: Local / S3-compatible
Authentication: JWT
AI: External AI API + Local Fallback
Testing: Pytest
API Documentation: FastAPI Swagger
Deployment: Cloud-ready
```


---

## License

This project is intended primarily for educational and academic purposes.

You may modify and extend the project for learning, demonstration, and academic use.

---

## Conclusion

The **AI-Powered Personal Diet Planner with Cloud Storage** demonstrates the development of a complete cloud-ready application by combining artificial intelligence, web technologies, authentication, database management, object storage, REST APIs, testing, and cloud deployment concepts.

The project provides a practical example of how a traditional web application can be designed using a cloud-oriented architecture where application hosting, databases, file storage, AI services, and authentication can be independently managed and scaled.

The architecture also allows the local development environment to be transitioned to cloud infrastructure without requiring major changes to the application's core functionality.
