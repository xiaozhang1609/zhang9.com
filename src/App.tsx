import React, { Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';
import { getToolById } from './config/tools';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTool, setActiveTool] = useState('officialWebsiteSearch');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    setIsSidebarOpen(mediaQuery.matches);
    
    const handleResize = (e: MediaQueryListEvent) => {
      setIsSidebarOpen(e.matches);
    };

    mediaQuery.addListener(handleResize);
    return () => mediaQuery.removeListener(handleResize);
  }, []);

  // 统一处理工具切换
  const handleToolChange = (toolId: string) => {
    setActiveTool(toolId);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      {isSidebarOpen && window.innerWidth < 768 && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-50"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <Sidebar
        isOpen={isSidebarOpen}
        activeTool={activeTool}
        onToolSelect={handleToolChange}
        onHomeClick={() => handleToolChange('officialWebsiteSearch')}
      />
      
      {/* 移动端浮动菜单按钮 */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden fixed top-4 left-4 z-40 p-2.5 bg-white/80 backdrop-blur-md shadow-lg rounded-xl hover:bg-white transition-all duration-200 active:scale-95 border border-gray-100"
          aria-label="打开菜单"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>
      )}
      
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-0 md:ml-70' : 'ml-0'}`}>
        <main className="flex items-center justify-center min-h-screen p-4 md:p-6">
          <ErrorBoundary>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTool}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-4xl"
              >
                <Suspense fallback={<LoadingSpinner />}>
                  {(() => {
                    const tool = getToolById(activeTool);
                    if (!tool) return null;
                    
                    // 直接使用 tool.component，不要调用它
                    return React.createElement(tool.component, {
                      onToolChange: handleToolChange
                    });
                  })()} 
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
