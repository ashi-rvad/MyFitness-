import mongoose from 'mongoose';

const dietPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  goal: {
    type: String, // e.g., 'Weight Loss', 'Muscle Gain'
  },
  totalDailyCalories: Number,
  macros: {
    protein: Number, // in grams
    carbs: Number,
    fats: Number,
  },
  meals: {
    breakfast: [{ food: String, calories: Number, protein: Number, carbs: Number, fats: Number }],
    lunch: [{ food: String, calories: Number, protein: Number, carbs: Number, fats: Number }],
    dinner: [{ food: String, calories: Number, protein: Number, carbs: Number, fats: Number }],
    snacks: [{ food: String, calories: Number, protein: Number, carbs: Number, fats: Number }],
  },
  waterIntake: {
    type: Number, // in liters
    default: 2.5
  },
  isAiGenerated: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
});

dietPlanSchema.index({ user: 1, startDate: -1 });

const DietPlan = mongoose.model('DietPlan', dietPlanSchema);

export default DietPlan;
