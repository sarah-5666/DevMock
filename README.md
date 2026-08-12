# DevMock

DevMock is a full-stack web application for creating and testing mock REST APIs. It allows developers to define an endpoint, HTTP method, status code, and response body, and then use the generated endpoint for development and testing.

## Live Demo

https://devmock-frontend.onrender.com

## GitHub Repository

https://github.com/sarah-5666/DevMock

## Features

* Create custom mock REST APIs
* Support for different HTTP methods
* Define custom endpoint paths
* Configure HTTP response status codes
* Add custom JSON response bodies
* Generate mock API endpoints
* Store mock API configurations in MongoDB
* Use generated endpoints for API testing
* Deployed frontend and backend

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* Mongoose

### Database

* MongoDB Atlas

### Deployment and Version Control

* Render
* Git
* GitHub

## How It Works

The user creates a mock API through the React frontend by providing:

* User ID
* HTTP method
* Endpoint path
* HTTP status code
* Response body

The frontend sends this information to the backend. The backend stores the mock configuration in MongoDB and provides an endpoint that can be used to return the configured response.

The basic flow is:

```text
React Frontend
      |
      v
Node.js / Express Backend
      |
      v
MongoDB Atlas
      |
      v
Generated Mock API
      |
      v
JSON Response
```

## Example

A mock API can be created with the following configuration:

**User ID**

```text
sarah
```

**Method**

```text
GET
```

**Endpoint Path**

```text
/users
```

**Status Code**

```text
200
```

**Response Body**

```json
{
  "users": [
    {
      "id": 1,
      "name": "Sarah",
      "email": "sarah@example.com"
    },
    {
      "id": 2,
      "name": "Alex",
      "email": "alex@example.com"
    }
  ]
}
```

The application generates a mock endpoint such as:

```text
https://devmock-backend.onrender.com/mock/sarah/users
```

Calling the endpoint returns the configured JSON response.

## Project Structure

```text
DevMock/
│
├── backend/
│   ├── config/
│   ├── data/
│   ├── models/
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Running Locally

### Clone the Repository

```bash
git clone https://github.com/sarah-5666/DevMock.git
cd DevMock
```

### Backend Setup

Navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory and add your MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string
```

Start the backend:

```bash
node server.js
```

### Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
npm run dev
```

The frontend will start using the Vite development server.

## Environment Variables

The MongoDB connection string is stored as an environment variable.

```env
MONGO_URI=your_mongodb_connection_string
```

Database credentials should never be committed to GitHub.

## Deployment

The application is deployed using Render.

* Frontend: Render Static Site
* Backend: Render Web Service
* Database: MongoDB Atlas

## Purpose

DevMock was built to provide a simple way to create temporary API endpoints during frontend development and testing. It can be useful when a frontend application needs an API before the actual backend service is available.

## Author

Sarah Fernandes

GitHub: https://github.com/sarah-5666
