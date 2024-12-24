# TheraMotion

<div align="center">
  Banner coming soon
  
  _Helping you moving move through life._
</div>

## Overview

TheraMotion is a healthcare service providing platform that enables users to book healthcare services. Built with modern web technologies with features like join our team, meet our team, book an appointment, user authentication, and reading and adding blogs.

## Key Features

- **Secure Authentication System**
    - JWT-based authentication
    - Protected routes
    - Secure password hashing
    - Session management

- **Join our Team**
    - Practioners can join our team

- **Meet Team** - Learn about our highly qualified and experienced team members.
    - All team members with photos and bios.
    - Dedicated page for each Team member with all details.
    - Filter options for quick search.
  
- **Book an Appointment** - Easily schedule appointments with our seamless booking system.
    - User-friendly interface for booking appointments.
    - Real-time availability updates for services and providers.
    - Appointment reminders via email or SMS.
    - Integration with calendar systems
    - Secure payment options for pre-booking services.
    - Flexible cancellation and rescheduling policies. ########################### **Attention needed** ##############

- **Modern UI/UX**
    - Responsive design
    - Intuitive navigation

## Tech Stack

### Frontend

- [React](https://reactjs.org/) - UI library
- [React Router](https://reactrouter.com/) - Navigation
- [BootStrap CSS](https://tailwindcss.com/) - Styling
- [Vite](https://vitejs.dev/) - Build tool

### Backend

- [Node.js](https://nodejs.org/) - Runtime environment
- [Express.js](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [JWT](https://jwt.io/) - Authentication
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Password hashing

## Quick Start

1. **Clone and Install**

```bash
# Clone the repository
git clone https://github.com/yourusername/TheraMotion.git

# Install dependencies
cd markd
npm install
```

2. **Environment Setup**

```bash
# Backend (.env)
DB_CONNECTION_STRING=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
HashSalt=your_hashsalt
```


3. **Development**

```bash
# Terminal 1 - Backend
cd backend
nodemon index.js

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## Project Structure

```
📂 THERAMOTION/             # Root directory for the project
├── 📂 Backend/             # Backend source code and configurations
│    ├── 📂 config/         # Configuration files (e.g., database connection, environment variables)
│    ├── 📂 models/         # Mongoose models for MongoDB collections (e.g., User, Appointment)
│    ├── 📂 routes/         # API route handlers for backend endpoints (e.g., auth, appointments, team)
│    ├── 📂 utils/          # Utility functions and helpers (e.g., email service, token generation, error handling)
│    ├── 📄 index.js        # Entry point for the backend server
│    └── 📄 package.json    # Backend project metadata and dependency management
│
├── 📂 Frontend/            # Frontend source code for the user interface
│    ├── 📂 public/         # Publicly accessible assets (e.g., images, icons, favicon)
│    └── 📂 src/            # Main source folder for React application
│        ├── 📂 components/ # Reusable React components for the UI
│        │   ├── 📂 Blogbox/ 
│        │   ├── 📂 Calendar/ 
│        │   ├── 📂 elements/ # Core reusable UI elements
│        │   │   ├── 📂 BookLink/      # Links for booking actions
│        │   │   ├── 📂 Card/          # UI card components
│        │   │   ├── 📂 Carousel/      # Carousel/slider components
│        │   │   ├── 📂 Dropdown/      # Dropdown menu components
│        │   │   ├── 📂 Modals/        # Modal/dialog components
│        │   │   ├── 📂 RoutingButton/ # Buttons for navigation with routing
│        │   │   └── 📂 ScrollToTop/   # Component for scrolling to the top of the page
│        │   ├── 📂 Footer/ 
│        │   ├── 📂 Introsection/ 
│        │   ├── 📂 Navbar/ 
│        │   ├── 📂 NeedForm/ 
│        │   ├── 📂 PersonDetails/    
│        │   ├── 📂 PersonInfo/    
│        │   ├── 📂 PersonSelect/    
│        │   ├── 📂 ServiceBox/       
│        │   └── 📂 Time/    
│        ├── 📂 pages/      # Page-specific components representing views
│        │   ├── 📂 Authentication/      
│        │   ├── 📂 Blog/      
│        │   ├── 📂 BookAppointment/      
│        │   ├── 📂 data/      
│        │   ├── 📂 forms/      
│        │   ├── 📂 JoinTeam/      
│        │   ├── 📂 MainPage/      
│        │   ├── 📂 MeetTeam/      
│        │   ├── 📂 Services/      
│        │   └── 📂 UserProfile/      
│        ├── 📄 App.jsx     # Main application component integrating all routes and layout
│        ├── 📄 Layout.jsx  # Layout component for consistent UI structure (e.g., Navbar, Footer)
│        ├── 📄 main.jsx    # Entry point for React app rendering
│        └── 📄 routes.js   # Route definitions for navigation and page rendering
│    ├── 📄 .gitignore      # Files and directories to be ignored by Git
│    ├── 📄 eslint.config.js # ESLint configuration for code linting
│    ├── 📄 index.html      # Main HTML template for the React application
│    ├── 📄 package.json    # Frontend project metadata and dependency management
│    └── 📄 vite.config.js  # Configuration file for Vite build tool
│
├── 📄 .gitignore           # Global Git ignore file for the entire project
└── 📄 README.md            # Project documentation, setup, and usage instructions

```

## Application Flow

1. **Authentication**

   - User registration with email verification
   - JWT-based authentication
   - Protected route handling
  
2. **Book an appointment**
   - Enter you details
   - Choose a therapist
   - Select from available Date & Time
   - Pay for your booking

## Acknowledgments

- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [MongoDB Documentation](https://docs.mongodb.com)
