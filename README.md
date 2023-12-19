# Yoga Website
## Overview

  This project is a web application for a Yoga class registration system. It allows users to register for different yoga classes, ensuring an efficient and user-friendly experience. The application is built using the MERN stack (MongoDB, Express.js, React, and Node.js).
## Key Features
- User Registration: Users can register for different yoga batches with comprehensive form validation.
- Batch Management: Restrictions on batch changes to ensure operational consistency:
- New users cannot change their batch in the first month of registration.
- Batch changes are limited to once per month for existing users.
- Form Validation:
    - Age and contact number validation.
    - Name validation to ensure proper formatting.
    - Copy-paste actions are disabled in form fields for data integrity.
- Notifications: Utilizes react-toastify for user-friendly notifications.
- Error Handling: Robust error handling and validation feedback for user inputs.

## Database ER Diagram

### Entities and Their Attributes

**User**
- **UserID** (Primary Key)
- Name
- Age
- Phone (Unique)

**Registration**
- **RegistrationID** (Primary Key)
- **UserID** (Foreign Key from User)
- Month
- Year
- TimeSlot
- BatchChanged (Boolean)

### Relationships

- A **User** can have multiple **Registrations**. This is a One-to-Many relationship where each registration is uniquely identified by a RegistrationID and is linked to a User.

### Diagram Representation

```plaintext
User
|--------------------------------------------------|
| UserID (PK) | Name       | Age | Phone (Unique)  |
|--------------------------------------------------|
| 1           | John Doe   | 30  | 123-456-7890    |
| 2           | Jane Smith | 25  | 987-654-3210    |
|--------------------------------------------------|

Registration
|------------------------------------------------------------------------------------|
| RegistrationID (PK) | UserID (FK) | Month | Year | TimeSlot     | BatchChanged    |
|------------------------------------------------------------------------------------|
| 1                   | 1           | 5     | 2023 | 6-7 AM       | False           |
| 2                   | 1           | 6     | 2023 | 7-8 AM       | True            |
| 3                   | 2           | 5     | 2023 | 5-6 PM       | False           |
|------------------------------------------------------------------------------------|
```


## Technologies Used

   - Frontend: React
   - Backend: Node.js, Express.js
   - Database: MongoDB
   - Additional Libraries:
       - react-toastify for notifications.
       - nodemon for hot reloading during development.
   - Deployment:
       - Frontend deployed on Netlify.
       - Backend deployed on Render.

## Local Development
  To run this project locally, follow these steps:

   - Clone the Repository

      ```bash
      git clone [repository URL]
      cd [project folder]
      ```
  - Install Dependencies

   - For the frontend:

      ```bash
      npm install
      ```
  - For the backend:

    ```bash
    npm install
    ```
    
## Environment Setup
  Set up the .env files in both frontend and backend directories with the required environment variables.

## Running the Application

  - Start the frontend:

  ```bash
    npm start
  ```
 - Start the backend:

    ```bash
        npm run dev  # if using nodemon
        # or
        npm start
    ```

## Deployment

  The application is deployed on Netlify (frontend) and Render (backend). The live application can be accessed at https://incomparable-gumption-624aef.netlify.app/ for the backend.

## Contributing
Contributions to the project are welcome. Please follow the standard procedure to fork the repository, make changes, and submit a pull request for review.
