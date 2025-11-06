import mongoose from 'mongoose';

const roadmapSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  steps: [
    {
      step: Number,
      title: String,
      description: String,
      resources: [String]
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Roadmap = mongoose.model('Roadmap', roadmapSchema);

export default Roadmap;
