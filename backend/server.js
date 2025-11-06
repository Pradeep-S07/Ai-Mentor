import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import { roadmapsData } from './data/roadmapsData.js';
import Roadmap from './models/Roadmap.js';
import authRoutes from './routes/auth.js';
import roadmapRoutes from './routes/roadmaps.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

const seedRoadmaps = async () => {
  try {
    const count = await Roadmap.countDocuments();
    if (count === 0) {
      await Roadmap.insertMany(roadmapsData);
      console.log('Roadmaps seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding roadmaps:', error);
  }
};

seedRoadmaps();

app.use('/api/auth', authRoutes);
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/users', userRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
