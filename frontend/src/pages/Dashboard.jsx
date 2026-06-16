import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Flame, Target, Trophy, Dumbbell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const mockData = [
  { name: 'Mon', weight: 80, calories: 2400 },
  { name: 'Tue', weight: 79.8, calories: 2200 },
  { name: 'Wed', weight: 79.5, calories: 2600 },
  { name: 'Thu', weight: 79.6, calories: 2100 },
  { name: 'Fri', weight: 79.2, calories: 2500 },
  { name: 'Sat', weight: 79.0, calories: 2300 },
  { name: 'Sun', weight: 78.8, calories: 2400 },
];

const StatCard = ({ title, value, icon, trend, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="glass p-6 rounded-2xl"
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-400 text-sm mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-white">{value}</h3>
      </div>
      <div className="p-3 bg-white/5 rounded-lg text-primary-400">
        {icon}
      </div>
    </div>
    <div className={`mt-4 text-sm ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
      {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% from last week
    </div>
  </motion.div>
);

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Welcome back, {user?.name?.split(' ')[0] || 'Athlete'}!</h1>
        <p className="text-gray-400 mt-2">Here is your fitness overview for today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Fitness Score" value="86" icon={<Activity size={24} />} trend={4.2} delay={0.1} />
        <StatCard title="Calories Burned" value="1,240" icon={<Flame size={24} />} trend={-1.5} delay={0.2} />
        <StatCard title="Current Streak" value="7 Days" icon={<Trophy size={24} />} trend={12} delay={0.3} />
        <StatCard title="Goal Progress" value="65%" icon={<Target size={24} />} trend={2.4} delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="lg:col-span-2 glass p-6 rounded-2xl"
        >
          <h3 className="text-xl font-bold text-white mb-6">Weight Progression</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={['dataMin - 1', 'dataMax + 1']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="glass p-6 rounded-2xl flex flex-col"
        >
          <h3 className="text-xl font-bold text-white mb-4">Today's AI Workout</h3>
          <div className="flex-1 flex flex-col justify-center items-center text-center p-6 bg-white/5 rounded-xl border border-white/10">
            <Dumbbell size={48} className="text-primary-500 mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">Upper Body Power</h4>
            <p className="text-gray-400 text-sm mb-6">45 mins • Intermediate • Focus on Chest & Back</p>
            <button className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-primary-500/20">
              Start Workout
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
