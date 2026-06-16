import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  age: z.coerce.number().min(10, 'Age must be at least 10').max(120, 'Age must be less than 120'),
  gender: z.enum(['Male', 'Female', 'Other']).optional(),
  height: z.coerce.number().min(50).max(300),
  weight: z.coerce.number().min(20).max(300),
  activityLevel: z.enum(['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active']),
  fitnessGoal: z.string().min(3),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});
