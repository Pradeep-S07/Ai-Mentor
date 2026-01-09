# Skill Roadmap Backend

Node.js/Express backend with MongoDB for the Skill Roadmap Generator.

## Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Create `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skill-roadmap
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile/:userId` - Get user profile

### Skills
- `GET /api/skills/search?skill={skill}` - Search skill and get roadmap

### Progress
- `POST /api/progress/update` - Update skill progress
- `GET /api/progress/:userId` - Get user progress
- `DELETE /api/progress/:userId/:skill` - Delete skill progress

## Deployment

Deploy to services like:
- [Render](https://render.com)
- [Railway](https://railway.app)
- [Heroku](https://heroku.com)

Set environment variables in your deployment platform.
