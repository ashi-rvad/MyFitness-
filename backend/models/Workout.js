import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String, // e.g., "Monday Chest Day", "AI Generated Full Body"
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  duration: {
    type: Number, // in minutes
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  caloriesBurned: {
    type: Number,
    default: 0,
  },
  exercises: [
    {
      exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise',
        required: true,
      },
      sets: [
        {
          reps: Number,
          weight: Number, // in kg
          completed: {
            type: Boolean,
            default: false
          }
        }
      ],
      notes: String,
    }
  ],
  isAiGenerated: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

// Indexing for faster queries by user and date
workoutSchema.index({ user: 1, date: -1 });

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;
