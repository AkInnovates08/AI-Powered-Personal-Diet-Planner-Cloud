# 10 Interview Questions and Strong Answers

## 1. Explain your project.
I built an AI-Powered Personal Diet Planner with Cloud Storage as a Cloud Computing project. React provides the frontend and FastAPI provides REST APIs. Users authenticate with JWT, maintain a profile, generate educational meal examples, save them in a relational database and upload demo files to object storage. An optional AI API is supported, with a local rule-based fallback so the project remains executable without a paid API.

## 2. Why cloud computing?
It separates compute, structured data and file storage. Managed services also support availability, scaling, monitoring and centralized access.

## 3. Cloud database vs object storage?
The database stores structured rows such as users and plans. Object storage stores binary files such as images or PDFs. The database keeps the file metadata and object path.

## 4. How does authentication work?
Passwords are bcrypt-hashed. Successful login creates a signed JWT containing the user ID. Protected endpoints validate the bearer token.

## 5. How is authorization enforced?
The server derives the user identity from the JWT and adds that user ID to database queries. A browser cannot simply supply another user's ID to retrieve private records.

## 6. How does AI work?
Structured preferences are sent to an optional AI-compatible endpoint. The response is validated. If disabled or unavailable, the local rule engine selects meal examples from predefined data.

## 7. Why a fallback?
It removes a paid/API dependency and demonstrates failure handling and resilience.

## 8. How would you scale it?
Run stateless FastAPI instances behind a load balancer, use managed PostgreSQL, object storage, caching and queue workers for expensive AI tasks, plus autoscaling and monitoring.

## 9. What security controls did you use?
Bcrypt, JWT, authorization checks, Pydantic validation, CORS, file limits and environment variables. Production would add HTTPS, secret management, MFA, rate limiting, private buckets and backups.

## 10. What if a dependency fails?
AI failure falls back to the local engine. Database/storage failures are logged and returned as controlled errors. A production architecture would add health checks, retries where safe and monitoring.
