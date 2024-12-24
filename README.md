# TheraMotion

<div align="center">
    <img src="http://ec2-3-83-33-137.compute-1.amazonaws.com:8080/logo.png" alt="Banner Image" />

  _Helping you moving move through life._
</div>

## Overview

TheraMotion is a healthcare service providing platform that enables users to book healthcare services effortlessly. Built with modern web technologies, the platform provides features such as join our team, meet our team, book an appointment, user authentication, and engaging with blogs.

[Hosted Website](http://ec2-3-83-33-137.compute-1.amazonaws.com:8080/)


## Key Features

- **Secure Authentication System**
    - JWT-based authentication.
    - Protected routes.
    - Secure password hashing.
    - Efficient session management.

- **Join our Team**
    - Healthcare practitioners can apply to join the team.

- **Meet Team** 
    - All team members with photos and bios.
    - Dedicated page for each Team member with all details.
    - Filter options for quick search.
  
- **Book an Appointment** 
    - Intuitive interface for booking appointments.
    - Real-time availability updates for services and providers.
    - Appointment reminders via email or SMS.
    - Calendar integration for easy scheduling.
    - Secure payment options for booking services.

- **Blogs**
    - Engage with informative and interactive blogs on healthcare topics. 

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
- [Multer](https://www.npmjs.com/package/multer) - Middleware for handling file uploads.
- [Razorpay](https://razorpay.com/) - Integration for secure online payments.

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
📂 THERAMOTION/
├── 📂 Backend/         # Backend source code
│    ├── 📂 config/         # Configuration files
│    ├── 📂 models/         # Mongoose models
│    ├── 📂 routes/         # API route handlers
│    ├── 📂 utils/          # Utility functions
│    ├── 📄 index.js        # Entry point for the backend server
│
└── 📂 Frontend/        # Frontend source code
     ├── 📂 public/         # Global and Static assets
     └── 📂 src/            # Source folder for React app
         ├── 📂 components/ # Reusable React components
         ├── 📂 pages/      # Page-specific components representing views
         │   ├── 📂 Authentication/      
         │   ├── 📂 Blog/      
         │   ├── 📂 BookAppointment/      
         │   ├── 📂 data/      
         │   ├── 📂 forms/      
         │   ├── 📂 JoinTeam/      
         │   ├── 📂 MainPage/      
         │   ├── 📂 MeetTeam/      
         │   ├── 📂 Services/      
         │   └── 📂 UserProfile/      
         ├── 📄 App.jsx     # Main app component integrating all routes and layout
         ├── 📄 Layout.jsx  # Layout component for consistent UI structure
         ├── 📄 main.jsx    # Entry point for React app rendering
         └── 📄 routes.js   # Route definitions and page rendering
```

## Application Flow

1. **Authentication**

   - User registration with email verification.
   - Secure login and logout system using JWT.
   - Protected routes for sensitive operations.
  
2. **Book an appointment**
   - Enter you details.
   - Choose a healthcare service.
   - Choose a healthcare practioner
   - Select from available Date & Time.
   - Pay for your booking.

3. **User Profile**
   - Profile picture can be uploaded
   - Name and details Editing
   - Delete account if required

## Acknowledgments

- [React Documentation](https://reactjs.org/docs)
- [Bootstrap](https://getbootstrap.com/)
- [Font Awesome](https://fontawesome.com/)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Razorpay](https://razorpay.com/)
