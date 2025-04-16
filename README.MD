# Hotel Management System - API

This is the backend API for the **Hotel Management System** built using **Node.js**, **Express**, and **MongoDB**. The API manages user authentication, hotel data, bookings, and reviews. It interacts with the frontend to handle requests such as user registration, hotel search, booking rooms, and leaving reviews.

# Table of Contents

1) [Project Description](#project-description)

2) [Features](#features)

3) [Tech Stack](#tech-stack)

4) [Installation](#installation)

5) [Usage](#usage)

6) [API Endpoints](#api-endpoints)

---

# Project Description

The backend of the **Hotel Management System** is responsible for managing user accounts, hotels, bookings, and reviews. It handles all API requests from the frontend and communicates with a MongoDB database to store and retrieve data.

---

# Features

### User Features

1. **User Registration**: Users can register by providing their email and password. After registration, they need to verify their email to activate their account.
   
2. **User Login**: Users can log in with their credentials (email and password) to access the system.

3. **Hotel Search**: Users can search for hotels based on location and availability.

4. **Hotel Booking**: Users can book rooms in available hotels.

5. **Leave Reviews**: Users can leave reviews for hotels they’ve stayed in.

---

### Admin Features

1. **Admin Login**: Admins can log into the system with special credentials.

2. **Add Hotels**: Admins can add new hotels to the platform with details such as location, amenities, pricing, etc.

3. **Delete Hotels**: Admins have the authority to delete hotels when necessary.

4. **View Own Hotels**: Admins can only view and manage hotels they have added.

5. **View Hotel Reviews**: Admins can view reviews left by users for all hotels and moderate reviews if needed.

---

# Tech Stack

1. **Backend Framework**: Express.js

2. **Database**: MongoDB

3. **Authentication**: JWT (JSON Web Tokens)

4. **Data Validation**: Joi or Express Validator

5. **API Communication**: Axios (for frontend communication)

6. **Password Hashing**: bcryptjs

7. **Environment Variables**: dotenv

---

# Installation

### Prerequisites

- **Node.js** (v16+ recommended)
- **MongoDB** (local or cloud instance)

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/hotel-management-api.git
    cd hotel-management-api
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables by creating a `.env` file in the root of the project:

    ```bash
    MONGO_URI=your-mongodb-uri
    JWT_SECRET=your-jwt-secret
    ```

4. Run the application:

    ```bash
    npm start
    ```

The backend API should now be running on `http://localhost:5000`.

---

# Usage

1. Once the backend API is running, it communicates with the frontend to:

2. Handle user registration and login.

3. Allow users to search for hotels based on location.

4. Let users book rooms in available hotels.

5. Enable users to leave reviews for hotels.

6. Allow admins to manage hotels and view reviews.

---

