# User Management Application

This is a simple web application where users can view, add, edit, and delete user details using JSONPlaceholder as the mock backend API.

## Features

- View a list of users with details such as ID, First Name, Last Name, Email, and Department.
- Add a new user.
- Edit an existing user.
- Delete a user.
- Pagination for the user list.
- Client-side validation for the user input form.
- Responsive design.

## Technologies Used

- Frontend: React.js, Tailwind CSS
- HTTP Client: Axios
- Mock Backend API: JSONPlaceholder

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)


### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/user-management-app.git
   cd user-management-app
2. Install dependencies:
    ```bash
    npm install

## Running the Application
1. Start the development server:

    ```bash
    npm start
2. Open your browser and navigate to http://localhost:3000 to view the application.

## API Endpoints
 - GET /users: Fetch all users

 - POST /users: Add a new user

 - PUT /users/:id: Update an existing user

 - DELETE /users/:id: Delete a user

## Challenges Faced
 - Handling API Errors: Ensuring that the application gracefully handles API errors and displays appropriate error messages to the user.

 - Client-Side Validation: Implementing client-side validation to ensure that the data entered by the user is valid before submitting it.

 - Pagination: Implementing pagination to display users in manageable chunks and improve the user experience.

## Improvements
 - Infinite Scrolling: Implementing infinite scrolling to load more users as the user scrolls down the list.

 - Enhanced Validation: Adding more comprehensive validation rules to ensure data integrity.

 - Unit Tests: Writing unit tests for each component and utility function to ensure the application works as expected.