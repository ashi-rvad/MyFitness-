import mongoose from 'mongoose';

const fitnessScoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  factors: {
    workoutConsistency: Number,
    goalAchievement: Number,
    calorieTargetCompletion: Number,
    activityLevelScore: Number,
    streakBonus: Number,
  }
}, {
  timestamps: true,
});

fitnessScoreSchema.index({ user: 1, date: -1 });

const FitnessScore = mongoose.model('FitnessScore', fitnessScoreSchema);

export default FitnessScore;
