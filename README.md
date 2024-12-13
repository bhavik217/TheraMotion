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
PORT=8081
DB_CONNECTION_STRING=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Frontend (.env)
VITE_API_URL=http://localhost:8081
```

3. **Development**

```bash
# Terminal 1 - Backend
cd backend
node start index.js

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## Project Structure

```
📂 theramotion/
├── 📂 backend/              # Backend source code
│    │   ├── 📂 middleware/      # Authentication middleware
│    │   ├── 📂 models/          # Database models
│    │   └── 📂 routes/          # API routes
└── 📂 frontend/             # Frontend source code
        ├── 📂 public/           # Static assets
        └── 📂 src/
            ├── 📂 components/   # Reusable components
            ├── 📂 pages/        # Page components
            ├── 📄 Layout        # Layout of site
            └── 📄 routes        # Route definitions
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
