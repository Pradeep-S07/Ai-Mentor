const mongoose = require('mongoose');

const projectSubmissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  skill: {
    type: String,
    required: true
  },
  subSkill: {
    type: String,
    required: true
  },
  projectTitle: {
    type: String,
    required: true
  },
  submissionType: {
    type: String,
    enum: ['code', 'url', 'file'],
    required: true
  },
  content: {
    type: String, // code text, URL, or file path
    required: true
  },
  fileName: {
    type: String, // for file submissions
    default: null
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  passed: {
    type: Boolean,
    required: true
  },
  feedback: {
    summary: String,
    strengths: [String],
    improvements: [String]
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for querying user submissions
projectSubmissionSchema.index({ userId: 1, skill: 1, subSkill: 1 });

module.exports = mongoose.model('ProjectSubmission', projectSubmissionSchema);
