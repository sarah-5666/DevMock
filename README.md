# DevMock

DevMock is a full-stack API mocking platform that allows developers to create and test mock REST APIs without setting up a separate backend for each API.

## Live Demo

[DevMock Live Demo](https://devmock-frontend.onrender.com)

[GitHub Repository](https://github.com/sarah-5666/DevMock)

## Features

* Create custom mock APIs
* Support for HTTP methods such as GET and POST
* Set custom endpoint paths
* Configure HTTP status codes
* Add custom JSON response bodies
* Generate accessible mock API endpoints
* Store mock API details in MongoDB
* Frontend and backend deployed separately

## Technologies Used

**Frontend**

* React
* Vite
* JavaScript
* HTML5
* CSS3

**Backend**

* Node.js
* Express.js
* Mongoose

**Database**

* MongoDB Atlas

**Deployment and Version Control**

* Render
* Git
* GitHub

## How It Works

The user creates a mock API by providing a user ID, HTTP method, endpoint path, status code, and response body.

The frontend sends the mock configuration to the backend. The backend stores the configuration in MongoDB and generates an endpoint for the mock API.

For example:

```text
GET /mock/sarah/users
```

can return:

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

## Project Structure

```text
DevMock/
├── backend/
│   ├── config/
│   ├── data/
│   ├── models/
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    ├── public/
    ├── package.json
    └── vite.config.js
```

## Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/sarah-5666/DevMock.git
cd DevMock
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure MongoDB

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
```

Do not commit the `.env` file or your database credentials to GitHub.

### 4. Start the backend

```bash
node server.js
```

### 5. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 6. Start the frontend

```bash
npm run dev
```

## Deployment

The application is deployed using Render.

* Frontend: Render Static Site
* Backend: Render Web Service
* Database: MongoDB Atlas

## Purpose

The main goal of DevMock is to provide a simple way for developers to create temporary mock APIs during frontend development and testing. This can be useful when a real backend API is not yet available.

## Author

Sarah Fernandes

GitHub: https://github.com/sarah-5666
