LFN Frontend

A modern React-based frontend application for LFN, built with React and Vite. The application provides user-facing registration and OTP verification flows, success handling, and an administrative dashboard.

The project is designed with a component-based architecture and uses a mock API layer during development to simulate application data and API interactions.

🚀 Features
Landing Page — Introduction and entry point to the application.
User Registration — Registration flow for new users.
OTP Verification — Secure verification flow using a one-time password.
Success Page — Confirmation screen after successful completion of the required flow.
Admin Dashboard — Administrative interface for managing and viewing application information.
Mock API — Local mock API implementation for frontend development and testing.
Responsive UI — Styling designed to work across different screen sizes.
Client-side Navigation — Page-to-page navigation within the React application.
ESLint — Code-quality and consistency checks.
🛠️ Tech Stack
React — UI library
Vite — Frontend build tool and development server
JavaScript (ES6+) — Application language
CSS / CSS Modules — Styling
React Router — Application routing
ESLint — Code linting
Mock API — Local API simulation for development

📁 Project Structure
LFN-Frontend/
├── public/
│
├── src/
│   ├── lib/
│   │   └── mockApi.js
│   │
│   ├── pages/
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminDashboard.module.css
│   │   ├── LandingPage.module.css
│   │   ├── OtpVerificationPage.jsx
│   │   ├── RegistrationPage.jsx
│   │   ├── SuccessPage.jsx
│   │   └── SuccessPage.module.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── package-lock.json
├── eslint.config.js
├── vite.config.js
└── README.md


The structure may evolve as new features and components are added.

⚙️ Getting Started
Prerequisites

Make sure you have the following installed:

Node.js
 — preferably an active LTS version
npm — included with Node.js
Git
1. Clone the repository
git clone https://github.com/charles-edem/LFN-Frontend.git

2. Navigate into the project
cd LFN-Frontend

3. Install dependencies
npm install

4. Start the development server
npm run dev


Vite will start the local development server. Open the URL shown in your terminal, typically:

http://localhost:5173

📜 Available Scripts

The following scripts are available through npm:

Development
npm run dev


Starts the Vite development server with Hot Module Replacement (HMR).

Production Build
npm run build


Creates an optimized production build.

Preview Production Build
npm run preview


Serves the production build locally for testing.

Lint
npm run lint


Runs ESLint against the project source code.

🔐 Application Flow

The primary user flow is structured around registration and verification:

Landing Page
     │
     ▼
Registration
     │
     ▼
OTP Verification
     │
     ▼
Success


Administrators can access the administrative dashboard separately.

🧪 Development API

The project currently includes a mock API layer:

src/lib/mockApi.js


The mock API allows frontend functionality to be developed and tested without depending on a production backend.

When a real backend is integrated, the mock implementation can be replaced or adapted to communicate with the appropriate API endpoints.

🎨 Styling

The project uses CSS Modules for page-specific styling.

For example:

AdminDashboard.module.css
SuccessPage.module.css
LandingPage.module.css


CSS Modules help keep styles scoped to their respective components and reduce the possibility of unintended style conflicts.

🔧 Environment Variables

If environment-specific configuration is introduced, create a .env file in the project root.

For example:

VITE_API_URL=http://localhost:3000


Vite exposes client-side environment variables only when they use the VITE_ prefix.

Do not commit sensitive credentials, API keys, passwords, or private tokens to the repository.

🏗️ Building for Production

To create a production-ready build:

npm run build


The generated files will be placed in:

dist/


The dist directory can then be deployed to a suitable static hosting provider or served through a web server.

🤝 Contributing

Contributions and improvements are welcome.

Recommended workflow
Fork the repository.
Create a feature branch:
git checkout -b feature/your-feature

Make your changes.
Run the linter:
npm run lint

Test the application locally:
npm run dev

Commit your changes:
git commit -m "Add your feature"

Push your branch:
git push origin feature/your-feature

Open a Pull Request.
🐛 Issues

If you find a bug or have a feature request, please open an issue in the GitHub repository with:

A clear description of the problem or feature.
Steps to reproduce the issue, when applicable.
Screenshots or error messages if relevant.
Your environment information when necessary.
📌 Project Status

Status: Active Development

The frontend is currently under development. Some functionality uses mock data/API responses while the application architecture and backend integration continue to evolve.

📄 License

License information for this project will be added here when the project's licensing terms are finalized.

👤 Author

Charles Edem

GitHub: @charles-edem

🔗 Repository

LFN Frontend

https://github.com/charles-edem/LFN-Frontend
