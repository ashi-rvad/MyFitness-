import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target, Activity, Flame, Trophy, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const mockWeightData = [
  { date: 'Week 1', weight: 85, bodyFat: 22 },
  { date: 'Week 2', weight: 83.5, bodyFat: 21.5 },
  { date: 'Week 3', weight: 82.8, bodyFat: 21 },
  { date: 'Week 4', weight: 81.5, bodyFat: 20.2 },
  { date: 'Week 5', weight: 80.2, bodyFat: 19.5 },
  { date: 'Week 6', weight: 79.5, bodyFat: 18.8 },
  { date: 'Week 7', weight: 78.8, bodyFat: 18.5 },
];

const Progress = () => {
  const reportRef = useRef();

  const downloadPDF = async () => {
    const element = reportRef.current;
    if (!element) return;
    
    // Add a temporary class to fix text colors for PDF if needed
    // The dark theme is rendered as image
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#0f172a',
    });
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('FitMentor_Progress_Report.pdf');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8" ref={reportRef}>
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white">Progress Tracking</h1>
          <p className="text-gray-400 mt-2">Monitor your journey and visualize your success.</p>
        </div>
        <button 
          onClick={downloadPDF}
          className="bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-4 rounded-xl transition-colors border border-white/10 flex items-center space-x-2"
        >
          <Download size={18} />
          <span>Download PDF</span>
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 glass p-6 rounded-2xl h-[400px] flex flex-col"
        >
          <h3 className="text-xl font-bold text-white mb-6">Weight & Body Fat Journey</h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockWeightData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="weight" stroke="#3b82f6" fillOpacity={1} fill="url(#colorWeight)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass p-6 rounded-2xl space-y-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Milestones</h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-600/20 text-primary-400 rounded-xl">
                <Target size={24} />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium">Goal Weight Reached</h4>
                <p className="text-xs text-gray-400">75kg target is 65% complete</p>
                <div className="w-full bg-slate-800 rounded-full h-2 mt-2">
                  <div className="bg-primary-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-600/20 text-yellow-400 rounded-xl">
                <Trophy size={24} />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium">Consistent Workouts</h4>
                <p className="text-xs text-gray-400">12 weeks straight</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-600/20 text-red-400 rounded-xl">
                <Flame size={24} />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium">Calories Burned</h4>
                <p className="text-xs text-gray-400">Over 50,000 total kcal</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Progress;
