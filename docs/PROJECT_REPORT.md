# Project Report — AI-Powered Personal Diet Planner with Cloud Storage

## Abstract
A full-stack academic cloud application demonstrating authentication, REST APIs, AI recommendation logic, relational database storage, object storage, deployment, security, testing and scalability. The system uses synthetic/demo data and produces general educational meal examples only.

## Introduction
The project applies a client-server cloud architecture to a diet-planning scenario. The educational focus is cloud engineering rather than clinical nutrition.

## Problem
A basic local meal planner does not demonstrate centralized storage, API architecture, authentication, object storage or scalable deployment.

## Proposed System
React frontend → FastAPI REST API → JWT authentication + AI layer + database + object storage → dashboard.

## Data Flow
1. Register/login.
2. Backend returns JWT.
3. User updates profile.
4. User submits plan preferences.
5. AI provider is attempted when configured.
6. Rule engine is used when AI is unavailable.
7. Plan is stored in SQL.
8. Files are stored separately in object storage.
9. Dashboard retrieves user-scoped data.

## Database
USERS, DIET_PLANS and USER_FILES use primary keys and foreign keys. User isolation is enforced in server-side queries.

## Cloud Storage
Structured metadata belongs in the database. File bytes belong in object storage. The database stores the object path.

## Security
Bcrypt, JWT, authorization checks, validation, CORS, environment variables, upload restrictions and HTTPS deployment are the core controls.

## Scalability
10 users: one small API + database.
1,000 users: managed DB, connection pooling, multiple API instances.
100,000 users: load balancer, autoscaling, CDN, caching, queue workers, managed DB scaling and monitoring.

## Testing
Registration, duplicate email, unauthorized access, plan generation and cross-user isolation are automated.

## Limitations
Rule-based recommendations are simple. External AI depends on service availability. Free hosting can sleep and local disks can be ephemeral. The project is not a medical/clinical system.

## Future Scope
Supabase Auth/RLS, signed URLs, refresh tokens, rate limiting, Redis, queues, CI/CD, monitoring and container orchestration.

## Conclusion
The project demonstrates how frontend, backend, authentication, AI, database and storage can be combined into a cloud-ready student application.
