import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, MessageSquare, Database, Trash2, Ban } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // If user is not an admin, redirect them
  if (user && user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', joined: '2023-10-01' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active', joined: '2023-11-15' },
    { id: 3, name: 'Mike Ross', email: 'mike@example.com', status: 'Suspended', joined: '2024-01-20' },
  ];

  const StatCard = ({ title, value, icon, color }) => (
    <div className="glass p-6 rounded-2xl flex items-center space-x-4">
      <div className={`p-4 rounded-xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Admin Control Panel</h1>
        <p className="text-gray-400 mt-2">Manage users, monitor AI usage, and view platform analytics.</p>
      </header>

      <div className="flex space-x-4 mb-6">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${activeTab === 'overview' ? 'bg-primary-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('users')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${activeTab === 'users' ? 'bg-primary-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
        >
          User Management
        </button>
      </div>

      {activeTab === 'overview' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Users" value="1,248" icon={<Users size={24} />} color="bg-blue-500/20 text-blue-400" />
            <StatCard title="Active Workouts" value="432" icon={<Activity size={24} />} color="bg-green-500/20 text-green-400" />
            <StatCard title="AI Requests (Today)" value="8,942" icon={<MessageSquare size={24} />} color="bg-purple-500/20 text-purple-400" />
            <StatCard title="Exercise DB" value="450+" icon={<Database size={24} />} color="bg-yellow-500/20 text-yellow-400" />
          </div>

          <div className="glass p-6 rounded-2xl h-64 flex items-center justify-center border border-white/5">
            <p className="text-gray-400">Analytics charts (User Growth, AI Usage Trends) will render here.</p>
          </div>
        </motion.div>
      )}

      {activeTab === 'users' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl overflow-hidden border border-white/5"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/50 text-gray-400 border-b border-white/5 text-sm uppercase tracking-wider">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Joined</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {mockUsers.map(u => (
                  <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium text-white">{u.name}</td>
                    <td className="p-4">{u.email}</td>
                    <td className="p-4">{u.joined}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${u.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="p-4 flex justify-end space-x-2">
                      <button className="p-2 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 rounded-lg transition-colors" title="Suspend User">
                        <Ban size={16} />
                      </button>
                      <button className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors" title="Delete User">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminDashboard;
