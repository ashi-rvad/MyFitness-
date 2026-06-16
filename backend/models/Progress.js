import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  weight: {
    type: Number, // in kg
    required: true,
  },
  bodyFatPercentage: Number,
  measurements: {
    chest: Number, // in cm
    waist: Number,
    arms: Number,
    thighs: Number,
  },
  photos: [String], // URLs to photos
  notes: String,
}, {
  timestamps: true,
});

progressSchema.index({ user: 1, date: -1 });

const Progress = mongoose.model('Progress', progressSchema);

export default Progress;
