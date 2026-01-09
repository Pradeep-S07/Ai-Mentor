const mongoose = require('mongoose');

const microSkillProgressSchema = new mongoose.Schema({
  microSkillId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
});

const subSkillProgressSchema = new mongoose.Schema({
  subSkillId: {
    type: String,
    required: true
  },
  subSkillName: {
    type: String,
    required: true
  },
  microSkillsProgress: [microSkillProgressSchema],
  totalMicroSkills: {
    type: Number,
    default: 0
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  isUnlocked: {
    type: Boolean,
    default: false
  },
  projectSubmitted: {
    type: Boolean,
    default: false
  },
  projectScore: {
    type: Number,
    default: null
  },
  projectPassed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date,
    default: null
  }
});

const skillProgressSchema = new mongoose.Schema({
  skill: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    default: ''
  },
  subSkillsProgress: [subSkillProgressSchema],
  totalSubSkills: {
    type: Number,
    default: 0
  },
  completedSubSkills: {
    type: Number,
    default: 0
  },
  completionPercentage: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  skillProgress: [skillProgressSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Methods to update progress
userSchema.methods.updateMicroSkillProgress = function(skill, subSkillId, microSkillId, microSkillTitle) {
  let skillProgress = this.skillProgress.find(sp => sp.skill.toLowerCase() === skill.toLowerCase());
  
  if (!skillProgress) {
    skillProgress = { skill, subSkillsProgress: [] };
    this.skillProgress.push(skillProgress);
  }

  let subSkillProgress = skillProgress.subSkillsProgress.find(ssp => ssp.subSkillId === subSkillId);
  
  if (!subSkillProgress) {
    subSkillProgress = { subSkillId, subSkillName: '', microSkillsProgress: [], isUnlocked: true };
    skillProgress.subSkillsProgress.push(subSkillProgress);
  }

  // Check if micro-skill already completed
  const alreadyCompleted = subSkillProgress.microSkillsProgress.some(
    msp => msp.microSkillId === microSkillId
  );

  if (!alreadyCompleted) {
    subSkillProgress.microSkillsProgress.push({
      microSkillId,
      title: microSkillTitle,
      completedAt: new Date()
    });
  }

  skillProgress.lastUpdated = new Date();
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
