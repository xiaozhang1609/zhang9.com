import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Timer, Play, Pause, RotateCcw, Maximize2, Minimize2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const TIME_PRESETS = [
  { value: '300', label: '5分钟' },
  { value: '600', label: '10分钟' },
  { value: '900', label: '15分钟' },
  { value: '1800', label: '30分钟' },
  { value: '3600', label: '1小时' },
  { value: 'custom', label: '自定义' }
];

const TimeDisplay = ({ time, size = 'normal' }: { time: string; size?: 'normal' | 'large' }) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className={`font-mono font-bold text-center ${size === 'large' ? 'text-[12rem]' : 'text-7xl'}`}
  >
    {time}
  </motion.div>
);

export default function BasicTimerTool() {
  const { t } = useTranslation();
  const [remainingSeconds, setRemainingSeconds] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('300');
  const [customMinutes, setCustomMinutes] = useState(5);
  const fullscreenRef = useRef<HTMLDivElement>(null);

  const formatTime = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [hours, minutes, secs].map(v => v < 10 ? "0" + v : v).join(":");
  }, []);

  const startTimer = useCallback(() => setIsRunning(true), []);
  const pauseTimer = useCallback(() => setIsRunning(false), []);
  
  const resetTimer = useCallback(() => {
    setIsRunning(false);
    if (selectedPreset === 'custom') {
      setRemainingSeconds(Math.max(customMinutes, 1) * 60);
    } else {
      setRemainingSeconds(parseInt(selectedPreset));
    }
  }, [selectedPreset, customMinutes]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement && fullscreenRef.current) {
        await fullscreenRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else if (document.fullscreenElement) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error(err);
      toast.error(t('fullscreenError'));
    }
  }, [t]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && remainingSeconds > 0) {
      timer = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            toast.success(t('timeUp'), {
              position: 'top-right',
              autoClose: 3000,
              theme: 'dark'
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, t]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div 
      ref={fullscreenRef}
      className={`relative w-full ${
        isFullscreen ? 'h-screen' : 'min-h-screen'
      } bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/30 dark:to-pink-900/20`}
    >
      {!isFullscreen ? (
        <div className="container mx-auto px-4 py-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-10" />
              <div className="relative p-8 text-center">
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center"
                >
                  <Timer className="w-8 h-8 text-white" />
                </motion.div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {t('basicTimer')}
                </h1>
              </div>
            </div>

            <div className="p-8">
              <TimeDisplay time={formatTime(remainingSeconds)} />
              
              <div className="mt-8 space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {TIME_PRESETS.slice(0, -1).map(preset => (
                    <button
                      key={preset.value}
                      onClick={() => {
                        setSelectedPreset(preset.value);
                        setRemainingSeconds(parseInt(preset.value));
                      }}
                      className={`p-3 rounded-xl transition-all ${
                        selectedPreset === preset.value
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedPreset('custom')}
                  className={`w-full p-3 rounded-xl transition-all ${
                    selectedPreset === 'custom'
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  自定义时间
                </button>

                <AnimatePresence>
                  {selectedPreset === 'custom' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <input
                        type="number"
                        value={customMinutes}
                        onChange={(e) => {
                          const value = Math.max(1, parseInt(e.target.value) || 1);
                          setCustomMinutes(value);
                          setRemainingSeconds(value * 60);
                        }}
                        className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-xl"
                        min="1"
                        placeholder="输入分钟数"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-8 grid grid-cols-4 gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={isRunning ? pauseTimer : startTimer}
                  className="col-span-2 p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl text-white flex items-center justify-center gap-2"
                >
                  {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  <span>{isRunning ? '暂停' : '开始'}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetTimer}
                  className="p-4 bg-pink-500 rounded-xl text-white"
                >
                  <RotateCcw className="w-5 h-5 mx-auto" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleFullscreen}
                  className="p-4 bg-purple-500 rounded-xl text-white"
                >
                  <Maximize2 className="w-5 h-5 mx-auto" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center">
          <TimeDisplay time={formatTime(remainingSeconds)} size="large" />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleFullscreen}
            className="fixed top-4 right-4 p-4 bg-purple-500 rounded-xl text-white"
          >
            <Minimize2 className="w-6 h-6" />
          </motion.button>
        </div>
      )}
    </div>
  );
}