import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Timer, Play, Pause, RotateCcw, Settings, Focus, Coffee, Maximize2, Minimize2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const DEFAULT_SETTINGS = {
  workTime: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
  longBreakInterval: 4
};

// 设置面板组件
const SettingsPanel = ({ settings, onSave, onClose }) => {
  const { t } = useTranslation();
  
  const settingFields = [
    { key: 'workTime', label: 'workTime' },
    { key: 'shortBreak', label: 'shortBreak' },
    { key: 'longBreak', label: 'longBreak' },
    { key: 'longBreakInterval', label: 'longBreakInterval' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute inset-x-4 top-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 z-50"
    >
      <h2 className="text-2xl font-bold mb-6">{t('settings')}</h2>
      <div className="space-y-4">
        {settingFields.map(({ key, label }) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-2">{t(label)}</label>
            <input
              type="number"
              value={key.includes('Time') ? settings[key] / 60 : settings[key]}
              onChange={(e) => {
                const value = Math.max(1, parseInt(e.target.value));
                onSave({ 
                  ...settings, 
                  [key]: key.includes('Time') ? value * 60 : value 
                });
              }}
              className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-xl"
              min="1"
            />
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-gray-500 text-white rounded-xl"
        >
          {t('close')}
        </button>
      </div>
    </motion.div>
  );
};

// 进度条组件
const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5 }}
      className="h-full bg-gradient-to-r from-rose-500 to-orange-500"
    />
  </div>
);

// 时间显示组件
const TimeDisplay = ({ time, mode }: { time: string; mode: 'work' | 'break' }) => {
  const gradientColors = mode === 'work' 
    ? { from: 'rose', to: 'orange' }
    : { from: 'green', to: 'teal' };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative group"
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-${gradientColors.from}-500 to-${gradientColors.to}-500 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity`} />
      <div className="relative p-8 text-center">
        <div className={`text-8xl font-bold bg-gradient-to-r from-${gradientColors.from}-600 to-${gradientColors.to}-600 bg-clip-text text-transparent font-mono`}>
          {time}
        </div>
      </div>
    </motion.div>
  );
};

export default function PomodoroTool() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [remainingSeconds, setRemainingSeconds] = useState(settings.workTime);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [cycles, setCycles] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenRef = useRef<HTMLDivElement>(null);

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const startTimer = useCallback(() => setIsRunning(true), []);
  const pauseTimer = useCallback(() => setIsRunning(false), []);
  
  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setRemainingSeconds(mode === 'work' ? settings.workTime : settings.shortBreak);
    setCycles(0);
  }, [mode, settings]);

  const switchMode = useCallback(() => {
    if (mode === 'work') {
      setCycles(prev => prev + 1);
      const shouldTakeLongBreak = cycles > 0 && cycles % settings.longBreakInterval === 0;
      setRemainingSeconds(shouldTakeLongBreak ? settings.longBreak : settings.shortBreak);
      setMode('break');
    } else {
      setRemainingSeconds(settings.workTime);
      setMode('work');
    }
    setIsRunning(false);
  }, [mode, cycles, settings]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && remainingSeconds > 0) {
      timer = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            toast.success(t(mode === 'work' ? 'workComplete' : 'breakComplete'), {
              position: 'top-right',
              theme: 'dark'
            });
            switchMode();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, mode, switchMode, t]);

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
      toast.error(t('fullscreenError'));
    }
  }, [t]);

  const progress = useCallback(() => {
    const total = mode === 'work' ? settings.workTime : 
      (cycles > 0 && cycles % settings.longBreakInterval === 0) ? settings.longBreak : settings.shortBreak;
    return ((total - remainingSeconds) / total) * 100;
  }, [mode, remainingSeconds, settings, cycles]);

  const commonButtonClass = "p-4 bg-gray-500 rounded-xl text-white";
  const actionButtonClass = `px-8 py-4 rounded-xl text-white flex items-center gap-2 ${
    mode === 'work' 
      ? 'bg-gradient-to-r from-rose-500 to-orange-500' 
      : 'bg-gradient-to-r from-green-500 to-teal-500'
  }`;

  return (
    <div 
      ref={fullscreenRef}
      className={`relative w-full ${
        isFullscreen ? 'h-screen' : 'min-h-[calc(100vh-4rem)]'
      } bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-rose-900/30 dark:to-orange-900/20 p-4 md:p-8`}
    >
      <AnimatePresence>
        {showSettings && (
          <SettingsPanel
            settings={settings}
            onSave={setSettings}
            onClose={() => setShowSettings(false)}
          />
        )}
      </AnimatePresence>

      <div className="relative max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-rose-500/10 to-orange-500/10 rounded-full mb-6">
            {mode === 'work' ? (
              <Focus className="w-12 h-12 text-rose-600 dark:text-rose-400" />
            ) : (
              <Coffee className="w-12 h-12 text-green-600 dark:text-green-400" />
            )}
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
            {t(mode === 'work' ? 'focusWork' : 'takeBreak')}
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            {t(mode === 'work' ? 'stayFocused' : 'recharge')}
          </p>
        </motion.div>

        <div className="mb-8">
          <ProgressBar progress={progress()} />
        </div>

        <TimeDisplay time={formatTime(remainingSeconds)} mode={mode} />

        <div className="mt-8 flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isRunning ? pauseTimer : startTimer}
            className={actionButtonClass}
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{t(isRunning ? 'pause' : 'start')}</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetTimer}
            className={commonButtonClass}
          >
            <RotateCcw className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSettings(!showSettings)}
            className={commonButtonClass}
          >
            <Settings className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleFullscreen}
            className={commonButtonClass}
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </motion.button>
        </div>

        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
          {t('workGroup')} {Math.floor(cycles / settings.longBreakInterval) + 1}
          <span className="mx-2">|</span>
          {t('pomodoroCount')} {(cycles % settings.longBreakInterval) + 1}
        </div>
      </div>
    </div>
  );
}