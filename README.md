# WTWR (What to Wear?): Back End

WTWR (What to Wear?) Server
This repository contains the back-end server for the WTWR application. The WTWR app is designed to help users choose outfits based on the weather, connect with other users, and manage their wardrobe. This project focuses on creating a robust server with user authorization, API creation, database integration, security, and deployment.

Project Overview
The back-end server provides RESTful API endpoints for managing user authentication, wardrobe items, and interactions between users. This project covers:

Database Management: Integration with a NoSQL database (MongoDB) for storing user data and clothing items.
User Authorization: Secure authentication and authorization using JSON Web Tokens (JWT).
API Creation: RESTful endpoints for CRUD operations on clothing items, user management, and interactions.
Security: Implementation of secure routes, input validation, and prevention of common vulnerabilities such as XSS and CSRF attacks.
Deployment: Deployment of the server on a remote hosting service (e.g., Heroku).
Features
User registration and login with hashed passwords
Token-based authentication for secure user sessions
CRUD operations for managing clothing items
Liking and unliking items
Input validation and error handling
Secure routes with role-based access control (if applicable)
Technologies Used
Node.js: Runtime environment for JavaScript
Express.js: Web framework for building APIs
MongoDB: NoSQL database for storing user and item data
Mongoose: ODM for MongoDB
JWT: JSON Web Tokens for user authentication
Bcrypt: Library for hashing passwords
Validator.js: Library for input validation
ESLint: Code linting to enforce consistent code style
Nodemon: Development tool for automatically restarting the server on changes

## Project Link

https://www.wtwr-demo.jumpingcrab.com/

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12
