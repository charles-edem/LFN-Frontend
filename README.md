LFN Frontend

A React and Vite frontend application for LFN, featuring user registration, OTP verification, a success flow, and an admin dashboard.

Features
User registration
OTP verification
Registration success flow
Admin dashboard
Mock API for development
Responsive interface
Client-side routing
ESLint configuration
Tech Stack
React
Vite
JavaScript
React Router
CSS Modules
ESLint

Getting Started
Requirements
Node.js
npm
Git
Installation

Clone the repository:

git clone https://github.com/charles-edem/LFN-Frontend.git


Move into the project directory:

cd LFN-Frontend


Install dependencies:

npm install


Start the development server:

npm run dev


The application will be available at the local URL provided by Vite, usually:

http://localhost:5173

Available Scripts
Command	Description
npm run dev	Start development server
npm run build	Create production build
npm run preview	Preview production build
npm run lint	Run ESLint
Application Flow
Landing Page
     |
     v
Registration
     |
     v
OTP Verification
     |
     v
Success


The application also includes a separate admin dashboard.

Mock API

Development API functionality is currently handled through:

src/lib/mockApi.js


This allows the frontend to be developed and tested without requiring a production backend.

Styling

The project uses CSS Modules for component-specific styling.

Examples:

AdminDashboard.module.css
LandingPage.module.css
SuccessPage.module.css

Environment Variables

If environment variables are required, create a .env file in the project root.

Example:

VITE_API_URL=http://localhost:3000


Do not commit passwords, API keys, tokens, or other sensitive information.

Project Status

Active Development

The frontend is currently under development, with some functionality using mock API data.

Author

Charles Edem

GitHub: @charles-edem

Repository

LFN Frontend
