import React from 'react';
import { Construction, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PlaceholderTool() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/30"
    >
      <div className="flex items-center justify-center mb-8">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Construction className="w-16 h-16 text-orange-500 dark:text-orange-400" />
        </motion.div>
      </div>
      
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
        功能开发中
      </h1>
      
      <div className="flex items-center justify-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-gray-500" />
        <p className="text-center text-gray-600 dark:text-gray-400">
          该功能正在紧张开发中，敬请期待！
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
        <p className="text-sm text-orange-700 dark:text-orange-300 text-center">
          💡 如果您有任何建议或需求，欢迎通过侧边栏联系方式与我们沟通
        </p>
      </div>
    </motion.div>
  );
}