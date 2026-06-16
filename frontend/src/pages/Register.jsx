import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Register = () => {
  const { register: registerField, handleSubmit, formState: { errors } } = useForm();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (data) => {
    try {
      await register(data);
      navigate('/dashboard');
    } catch (error) {
      setErrorMsg(error);
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center py-10 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 rounded-2xl w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold text-center text-primary-400 mb-6">Create Account</h2>
        
        {errorMsg && (
          <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded mb-4 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Full Name</label>
              <input 
                type="text" 
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
                {...registerField('name', { required: 'Name is required' })} 
              />
              {errors.name && <span className="text-red-400 text-xs">{errors.name.message}</span>}
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Email</label>
              <input 
                type="email" 
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
                {...registerField('email', { required: 'Email is required' })} 
              />
              {errors.email && <span className="text-red-400 text-xs">{errors.email.message}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Password</label>
              <input 
                type="password" 
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
                {...registerField('password', { required: 'Password is required', minLength: 6 })} 
              />
              {errors.password && <span className="text-red-400 text-xs">Minimum 6 characters</span>}
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Age</label>
              <input 
                type="number" 
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
                {...registerField('age', { required: 'Age is required' })} 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Height (cm)</label>
              <input 
                type="number" 
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
                {...registerField('height', { required: 'Height is required' })} 
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Weight (kg)</label>
              <input 
                type="number" 
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
                {...registerField('weight', { required: 'Weight is required' })} 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Activity Level</label>
              <select 
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
                {...registerField('activityLevel')}
              >
                <option value="sedentary">Sedentary</option>
                <option value="light">Light Activity</option>
                <option value="moderate">Moderate Activity</option>
                <option value="active">Active</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Fitness Goal</label>
              <select 
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
                {...registerField('fitnessGoal')}
              >
                <option value="weight_loss">Weight Loss</option>
                <option value="maintenance">Maintenance</option>
                <option value="muscle_gain">Muscle Gain</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 rounded-lg transition-colors mt-6"
          >
            Create Account
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account? <Link to="/login" className="text-primary-400 hover:underline">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
