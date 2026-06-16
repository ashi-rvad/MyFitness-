import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Cardio', 'Full Body'],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true,
  },
  equipment: {
    type: [String],
    default: ['Bodyweight'],
  },
  recommendedSets: {
    type: Number,
    default: 3,
  },
  recommendedReps: {
    type: String, // e.g., '8-12' or '30s'
    default: '10',
  },
  videoUrl: String,
  caloriesBurnedEstimate: {
    type: Number, // calories per minute or per set
  }
}, {
  timestamps: true,
});

// Indexing for search performance
exerciseSchema.index({ name: 'text', category: 1, difficulty: 1 });

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;
