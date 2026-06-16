import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="container mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-[80vh] text-center">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
      >
        Your Personal <span className="text-primary-500">AI Fitness Coach</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl"
      >
        Unlock your potential with highly personalized, AI-generated workout and diet plans. Track your progress, maintain streaks, and achieve your fitness goals.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex space-x-4"
      >
        <Link to="/register" className="bg-primary-600 hover:bg-primary-500 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-primary-500/30 transition-all transform hover:scale-105">
          Start Your Free Trial
        </Link>
        <a href="#features" className="glass hover:bg-white/10 text-white font-bold py-4 px-8 rounded-full transition-all flex items-center justify-center">
          Explore Features
        </a>
      </motion.div>

      <motion.div
        id="features"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mt-32 w-full max-w-6xl mx-auto scroll-mt-24 text-left"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Powerful Features for Your Journey</h2>
          <p className="text-xl text-gray-400">Everything you need to reach your fitness goals, powered by advanced AI.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Feature 1 */}
          <div className="glass p-10 rounded-3xl hover:bg-white/5 transition-all duration-300">
            <div className="w-16 h-16 bg-primary-600/20 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-primary-400 text-3xl">🏋️</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">AI Workout Generation</h3>
            <p className="text-gray-400 leading-relaxed">
              Stop guessing what to do at the gym. Our AI analyzes your age, weight, goals, and experience level to generate a highly optimized weekly training split, complete with sets, reps, and rest timers.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass p-10 rounded-3xl hover:bg-white/5 transition-all duration-300">
            <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-green-400 text-3xl">🥗</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Personalized Nutrition</h3>
            <p className="text-gray-400 leading-relaxed">
              Nutrition is 80% of the battle. Get personalized daily meal plans that hit your exact macronutrient requirements. Whether you're cutting, bulking, or maintaining, we've got your diet covered.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass p-10 rounded-3xl hover:bg-white/5 transition-all duration-300">
            <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-purple-400 text-3xl">🤖</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">24/7 AI Fitness Coach</h3>
            <p className="text-gray-400 leading-relaxed">
              Have a question about form? Need a substitute for an exercise? Chat in real-time with your personal AI mentor. It remembers your history and provides expert guidance whenever you need it.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="glass p-10 rounded-3xl hover:bg-white/5 transition-all duration-300">
            <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-yellow-400 text-3xl">📈</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Advanced Analytics</h3>
            <p className="text-gray-400 leading-relaxed">
              Track your weight, body fat percentage, and overall fitness score dynamically. Visualize your progress with beautiful interactive charts and generate comprehensive PDF reports to stay motivated.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
