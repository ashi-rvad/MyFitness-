import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Droplets, Info, Loader2, Apple } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AIDiet = () => {
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
      
      const { data } = await axios.post('/api/ai/diet', {}, config);
      setPlan(data);
    } catch (error) {
      console.error(error);
      // Fallback mock data if API fails or backend isn't running
      setPlan({
        goal: "Weight Loss",
        totalDailyCalories: 1800,
        macros: { protein: 140, carbs: 150, fats: 60 },
        meals: {
          breakfast: [
            { food: "Oatmeal with berries", calories: 300, protein: 10, carbs: 50, fats: 5 },
            { food: "Protein Shake", calories: 120, protein: 25, carbs: 3, fats: 1 }
          ],
          lunch: [
            { food: "Grilled Chicken Salad", calories: 400, protein: 45, carbs: 15, fats: 18 }
          ],
          dinner: [
            { food: "Baked Salmon with Quinoa", calories: 500, protein: 40, carbs: 45, fats: 20 }
          ],
          snacks: [
            { food: "Greek Yogurt", calories: 100, protein: 15, carbs: 8, fats: 0 },
            { food: "Almonds", calories: 150, protein: 6, carbs: 5, fats: 14 }
          ]
        },
        waterIntake: 3.0
      });
    } finally {
      setLoading(false);
    }
  };

  const renderMeal = (title, items) => (
    <div className="glass p-6 rounded-2xl">
      <h3 className="text-xl font-bold text-primary-400 mb-4 capitalize">{title}</h3>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary-900 rounded-lg text-primary-400">
                <Apple size={20} />
              </div>
              <div>
                <h4 className="font-medium text-white">{item.food}</h4>
                <div className="flex space-x-3 text-xs text-gray-400 mt-1">
                  <span>P: {item.protein}g</span>
                  <span>C: {item.carbs}g</span>
                  <span>F: {item.fats}g</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-white">{item.calories}</span>
              <span className="text-xs text-gray-400 ml-1">kcal</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white">AI Diet Planner</h1>
          <p className="text-gray-400 mt-2">Generate a personalized daily meal plan tailored to your macros.</p>
        </div>
        {!plan && !loading && (
          <button 
            onClick={handleGenerate}
            className="bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg shadow-primary-500/20 flex items-center space-x-2"
          >
            <Utensils size={20} />
            <span>Generate Diet Plan</span>
          </button>
        )}
      </header>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 size={48} className="text-primary-500 animate-spin mb-4" />
          <h3 className="text-xl text-white font-medium animate-pulse">Calculating optimal macros...</h3>
          <p className="text-gray-400 mt-2">Gemini is curating a delicious meal plan for you.</p>
        </div>
      )}

      {plan && !loading && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="glass p-6 rounded-2xl col-span-1 md:col-span-2 flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Target Calories</p>
                <h2 className="text-4xl font-bold text-white mt-1">{plan.totalDailyCalories} <span className="text-lg font-normal text-gray-400">kcal</span></h2>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm">Goal</p>
                <h3 className="text-xl font-bold text-primary-400 mt-1">{plan.goal}</h3>
              </div>
            </div>
            
            <div className="glass p-6 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Water</p>
                <h2 className="text-2xl font-bold text-white mt-1">{plan.waterIntake} <span className="text-sm font-normal text-gray-400">Liters</span></h2>
              </div>
              <Droplets size={32} className="text-blue-400" />
            </div>

            <div className="glass p-6 rounded-2xl">
              <p className="text-gray-400 text-sm mb-2">Macros</p>
              <div className="space-y-1 text-sm font-medium">
                <div className="flex justify-between text-white"><span>Protein</span> <span className="text-primary-400">{plan.macros.protein}g</span></div>
                <div className="flex justify-between text-white"><span>Carbs</span> <span className="text-primary-400">{plan.macros.carbs}g</span></div>
                <div className="flex justify-between text-white"><span>Fats</span> <span className="text-primary-400">{plan.macros.fats}g</span></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderMeal('breakfast', plan.meals.breakfast)}
            {renderMeal('lunch', plan.meals.lunch)}
            {renderMeal('dinner', plan.meals.dinner)}
            {renderMeal('snacks', plan.meals.snacks)}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AIDiet;
