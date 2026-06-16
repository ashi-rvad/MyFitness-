import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String, // URL or class name for icon
    required: true,
  },
  category: {
    type: String,
    enum: ['Workout', 'Diet', 'Streak', 'Milestone', 'Other'],
    default: 'Other'
  },
  criteria: {
    type: String, // Internal logic identifier if needed
  }
}, {
  timestamps: true,
});

const Achievement = mongoose.model('Achievement', achievementSchema);

export default Achievement;
