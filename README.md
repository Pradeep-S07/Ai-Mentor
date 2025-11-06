# SkillForge - AI Mentor Roadmap Generator

A full-stack web application that helps users discover career paths and create personalized learning roadmaps with skill tracking and progress monitoring.

## Features

- **User Authentication**: Secure register and login with JWT tokens
- **Roadmap Generation**: Browse and select from multiple career learning paths
- **Progress Tracking**: Mark learning steps as complete and track progress
- **User Profiles**: Manage user profiles, add skills, and track experience levels
- **Multiple Career Paths**: Frontend Developer, Backend Developer, DevOps Engineer, Full Stack Developer
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Beautiful UI**: Modern animations and smooth transitions

## Tech Stack

### Frontend
- React 18.3.1
- React Router DOM 6.20.0
- Tailwind CSS 3.4.1
- Lucide React (icons)
- Vite (build tool)

### Backend
- Node.js with Express.js 4.18.2
- MongoDB with Mongoose 8.0.0
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled

## Project Structure

```
project/
├── src/                          # Frontend React application
│   ├── components/              # Reusable React components
│   │   ├── Dashboard.jsx        # Main roadmap display
│   │   ├── RoadmapCard.jsx      # Individual roadmap step
│   │   └── RoleInput.jsx        # Career search input
│   ├── context/                 # React context for state management
│   │   └── AuthContext.jsx      # Authentication context
│   ├── hooks/                   # Custom React hooks
│   │   └── useAuth.js           # Auth hook
│   ├── pages/                   # Page components
│   │   ├── Login.jsx            # Login page
│   │   ├── Register.jsx         # Registration page
│   │   └── Profile.jsx          # User profile page
│   ├── lib/                     # Utilities and API calls
│   │   └── api.js               # API client functions
│   ├── data/                    # Static data
│   │   └── fallbackRoadmaps.js  # Fallback roadmap data
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
│
├── backend/                      # Node.js backend
│   ├── config/                  # Configuration files
│   │   └── database.js          # MongoDB connection
│   ├── models/                  # Database models
│   │   ├── User.js              # User schema
│   │   └── Roadmap.js           # Roadmap schema
│   ├── routes/                  # API routes
│   │   ├── auth.js              # Authentication routes
│   │   ├── roadmaps.js          # Roadmap routes
│   │   └── users.js             # User routes
│   ├── middleware/              # Express middleware
│   │   └── auth.js              # JWT authentication middleware
│   ├── data/                    # Sample data
│   │   └── roadmapsData.js      # Roadmap seed data
│   ├── server.js                # Main server file
│   ├── package.json             # Backend dependencies
│   └── .env.example             # Environment variables template
│
├── .env                         # Frontend environment variables
├── package.json                 # Frontend dependencies
└── README.md                    # This file
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas account)

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file in the root directory:
```
VITE_API_URL=http://localhost:5000/api
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/skillforge
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

The backend API will be available at `http://localhost:5000/api`

## MongoDB Setup

### Local MongoDB
If you have MongoDB installed locally, it will connect to `mongodb://localhost:27017/skillforge`

### MongoDB Atlas (Cloud)
1. Create an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and database
3. Get your connection string
4. Update the `MONGODB_URI` in your `.env` file

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Roadmaps
- `GET /api/roadmaps` - Get all roadmaps
- `GET /api/roadmaps/:role` - Get roadmap by role

### Users
- `GET /api/users/:userId` - Get user profile
- `PUT /api/users/:userId` - Update user profile
- `POST /api/users/:userId/skills` - Add skill to user
- `PUT /api/users/:userId/skills/:skillId` - Update skill
- `DELETE /api/users/:userId/skills/:skillId` - Delete skill
- `POST /api/users/:userId/roadmap` - Start roadmap
- `PUT /api/users/:userId/roadmap/progress` - Update roadmap progress

## Available Career Paths

1. **Frontend Developer**
   - Master HTML, CSS & JavaScript Fundamentals
   - Learn React & Modern Frontend Frameworks
   - Build Real-World Projects & Portfolio

2. **DevOps Engineer**
   - Master Linux & Command Line Essentials
   - Learn Docker & Kubernetes
   - Implement CI/CD Pipelines & Cloud Platforms

3. **Full Stack Developer**
   - Frontend Development with React
   - Backend Development with Node.js
   - Deploy Full Stack Applications

4. **Backend Developer**
   - Core Programming & Data Structures
   - Database Design & Management
   - API Development & Microservices

## Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  bio: String,
  avatar: String (URL),
  skills: [
    {
      name: String,
      level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert',
      yearsOfExperience: Number,
      addedAt: Date
    }
  ],
  currentRoadmap: {
    roadmapId: String,
    role: String,
    startedAt: Date,
    completedSteps: [Number],
    progress: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Roadmap Model
```javascript
{
  role: String (unique),
  description: String,
  steps: [
    {
      step: Number,
      title: String,
      description: String,
      resources: [String]
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## Key Features Explained

### Authentication
- Secure JWT-based authentication
- Password hashing with bcryptjs
- Protected routes that require authentication
- Token stored in localStorage

### Progress Tracking
- Local storage for instant feedback
- MongoDB persistence for authenticated users
- Completion percentage calculation
- Visual progress bars

### User Profiles
- Complete profile management
- Skill portfolio with experience levels
- Roadmap progress overview
- Current learning path tracking

## Building for Production

### Frontend Build
```bash
npm run build
```

### Backend Deployment
Ensure all environment variables are properly set in production:
- `JWT_SECRET` - Use a strong secret key
- `MONGODB_URI` - Use MongoDB Atlas connection string
- `NODE_ENV` - Set to "production"

## Development Commands

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server

## Sample Data

The backend automatically seeds the database with 4 career roadmaps on first run:
- Frontend Developer
- DevOps Engineer
- Full Stack Developer
- Backend Developer

Each roadmap includes 3 learning steps with resources and descriptions.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Email verification for new accounts
- Password reset functionality
- Social login (Google, GitHub)
- Community forum for discussions
- AI-powered personalized recommendations
- Mobile app
- Video tutorials integration
- Certificate generation

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For support, email contact@skillforge.dev or open an issue on GitHub.
