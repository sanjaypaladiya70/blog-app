# Blog Application

A full-stack blog application built with React (client) and Node.js (server).

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (comes with Node.js)
- Git

## Project Structure

```
blog-app/
├── client/          # React frontend
└── server/          # Node.js backend
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/sanjaypaladiya70/blog-app
cd blog-app
```

### 2. Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will run on http://localhost:5000

### 3. Frontend Setup

1. Open a new terminal and navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The client will run on http://localhost:3000

## Running the Application

1. Start the backend server first (from the server directory):
```bash
npm start
```

2. In a separate terminal, start the frontend (from the client directory):
```bash
npm start
```

3. Open your browser and visit http://localhost:3000

## Development

- The client is built with React and uses Tailwind CSS for styling
- The server is built with Node.js and Express

## Available Scripts

### Client (in client directory)
- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

### Server (in server directory)
- `npm start` - Starts the server
- `npm run dev` - Starts the server in development mode with nodemon
