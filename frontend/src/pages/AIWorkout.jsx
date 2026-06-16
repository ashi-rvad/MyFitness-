import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Calendar, Info, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AIWorkout = () => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const { user } = useAuth();

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token || ''}`,
        },
      };
      
      const { data } = await axios.post('/api/ai/workout', {}, config);
      setPlan(data);
    } catch (error) {
      console.error(error);
      // Fallback mock data if API fails or backend isn't running
      setPlan({
        name: "Hypertrophy Beast",
        goal: "Muscle Gain",
        weeklySchedule: [
          {
            day: "Monday",
            focus: "Chest and Triceps",
            exercises: [
              { name: "Barbell Bench Press", sets: 4, reps: "8-10", rest: "90s" },
              { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", rest: "60s" },
              { name: "Tricep Pushdowns", sets: 3, reps: "12-15", rest: "60s" }
            ]
          },
          {
            day: "Wednesday",
            focus: "Back and Biceps",
            exercises: [
              { name: "Deadlift", sets: 4, reps: "5-8", rest: "120s" },
              { name: "Pull-ups", sets: 3, reps: "To failure", rest: "90s" },
              { name: "Barbell Curls", sets: 3, reps: "10-12", rest: "60s" }
            ]
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white">AI Workout Generator</h1>
          <p className="text-gray-400 mt-2">Generate a highly personalized weekly workout plan using Gemini AI.</p>
        </div>
        {!plan && !loading && (
          <button 
            onClick={handleGenerate}
            className="bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg shadow-primary-500/20 flex items-center space-x-2"
          >
            <Dumbbell size={20} />
            <span>Generate Plan</span>
          </button>
        )}
      </header>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 size={48} className="text-primary-500 animate-spin mb-4" />
          <h3 className="text-xl text-white font-medium animate-pulse">Analyzing your profile...</h3>
          <p className="text-gray-400 mt-2">Gemini is crafting the perfect workout for your {user?.fitnessGoal || 'goals'}.</p>
        </div>
      )}

      {plan && !loading && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="glass p-6 rounded-2xl border-l-4 border-primary-500 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                <span className="flex items-center"><Info size={14} className="mr-1" /> Goal: {plan.goal}</span>
                <span className="flex items-center"><Calendar size={14} className="mr-1" /> {plan.weeklySchedule.length} Days/Week</span>
              </div>
            </div>
            <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">
              Save Plan
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plan.weeklySchedule.map((day, idx) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                key={idx} 
                className="glass rounded-xl overflow-hidden"
              >
                <div className="bg-slate-800/50 p-4 border-b border-white/5 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-primary-400">{day.day}</h3>
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{day.focus}</span>
                </div>
                <div className="p-4 space-y-4">
                  {day.exercises.map((ex, exIdx) => (
                    <div key={exIdx} className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                      <div>
                        <p className="font-medium text-white">{ex.name}</p>
                        <p className="text-xs text-gray-400 mt-1">Rest: {ex.rest}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary-400">{ex.sets} <span className="text-xs font-normal text-gray-400">sets</span></p>
                        <p className="text-sm text-white">{ex.reps} <span className="text-xs text-gray-400">reps</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AIWorkout;
