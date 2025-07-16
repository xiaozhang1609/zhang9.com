import React, { Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';
import { getToolById } from './config/tools';
import './i18n';

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

  // Header 事件处理中
  const handleHeaderActions = {
    onMenuClick: () => setIsSidebarOpen(!isSidebarOpen),
    onHomeClick: () => handleToolChange('officialWebsiteSearch'),
    onLogoClick: () => handleToolChange('officialWebsiteSearch'),
    onAboutClick: () => handleToolChange('about')
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      {isSidebarOpen && (
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
      
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-0 md:ml-70' : 'ml-0'}`}>
        <Header {...handleHeaderActions} />
        
        <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4 md:p-6">
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
                    
                    // 为组件传递handleToolChange函数
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
