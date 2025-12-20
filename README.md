🚗 Vehicle Rental System Server

A backend API for managing a vehicle rental system.
This server handles user authentication, vehicle management, and booking operations with role-based access control.

🔗 Live Server:
https://vehicle-rentel-system-server.vercel.app/

📌 Project Overview

The Vehicle Rental System Server provides RESTful APIs to support a complete vehicle rental workflow, including:

User registration and login

Role-based access (Admin & Customer)

Vehicle inventory management

Booking creation, cancellation, and return

Automatic booking return when rental period ends

This project follows a modular architecture with clear separation of concerns (routes, controllers, services).

🛠️ Technology Stack

Node.js – JavaScript runtime

TypeScript – Type-safe JavaScript

Express.js – Web framework

PostgreSQL – Relational database

bcrypt – Password hashing

jsonwebtoken (JWT) – Authentication & authorization

✨ Core Features
🔐 Authentication & Authorization

User signup & signin

Password hashing using bcrypt

JWT-based authentication

Role-based access control (Admin / Customer)

🚘 Vehicle Management (Admin)

Add new vehicles

Update vehicle details

Delete vehicles (only if not booked)

View all vehicles

View single vehicle details

📅 Booking Management

Create booking (Admin & Customer)

Cancel booking (Customer)

Mark booking as returned (Admin)

View bookings:

Admin → all bookings

Customer → own bookings only

🤖 Automatic Booking Return

System automatically marks bookings as returned when rent_end_date has passed

Vehicle availability is updated automatically


⚙️ Setup Instructions (Local Development)
1️⃣ Clone the repository
git clone <your-repository-url>
cd vehicle-rental-system-server

2️⃣ Install dependencies
npm install

3️⃣ Environment Variables

Create a .env file in the root directory:
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
BCRYPT_SALT_ROUNDS=10

4️⃣ Run the server
npm run dev


🚀 API Usage (Basic)
🔑 Authentication
POST /api/v1/auth/signup

POST /api/v1/auth/signin

🚗 Vehicles
POST /api/v1/vehicles (Admin)

GET /api/v1/vehicles (Public)

GET /api/v1/vehicles/:id

PUT /api/v1/vehicles/:id (Admin)

DELETE /api/v1/vehicles/:id (Admin)

📅 Bookings
POST /api/v1/bookings

GET /api/v1/bookings

PUT /api/v1/bookings/:id

📌 Authorization Header
- Authorization: Bearer <jwt_token>

🧠 Business Rules Summary
A vehicle cannot be deleted if its status is booked

A booking cannot be cancelled after rental start date

When a booking is returned:

Booking status → returned

Vehicle availability → available

System auto-returns expired bookings

🧪 Testing
You can test all endpoints using:

Postman

Thunder Client

Any REST API client

🙌 Thanks for Visiting
Thank you for checking out the Vehicle Rental System Server project.
Feel free to explore, test the APIs, and provide feedback or improvements.

