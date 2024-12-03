import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface CountdownTime {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export default function CountdownTool() {
  const { t } = useTranslation();
  const [targetDate, setTargetDate] = useState('');
  const [targetTime, setTargetTime] = useState('00:00');
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });
  const [isRunning, setIsRunning] = useState(false);

  // 保持原有的倒计时逻辑
  const updateCountdown = useCallback(() => {
    if (!targetDate) return;
    const target = new Date(`${targetDate}T${targetTime}`);
    const now = new Date();
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      setIsRunning(false);
      setCountdown({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setCountdown({
      days: days.toString().padStart(2, '0'),
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    });
  }, [targetDate, targetTime]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(updateCountdown, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, updateCountdown]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* 标题区域 */}
      <div className="card text-center p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 rounded-xl mb-4">
          <Timer className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
          {t('countdown')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {t('countdownDesc')}
        </p>
      </div>

      {/* 主要内容区域 */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 左侧设置区域 */}
          <div className="space-y-4">
            <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <label className="block">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('date')}
                </span>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="input mt-1"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('time')}
                </span>
                <input
                  type="time"
                  value={targetTime}
                  onChange={(e) => setTargetTime(e.target.value)}
                  className="input mt-1"
                />
              </label>
            </div>

            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsRunning(!isRunning)}
                className="btn-primary flex-1"
              >
                {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {t(isRunning ? 'pause' : 'start')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setTargetDate('');
                  setTargetTime('00:00');
                  setIsRunning(false);
                  setCountdown({ days: '00', hours: '00', minutes: '00', seconds: '00' });
                }}
                className="btn-secondary"
              >
                <RotateCcw className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* 右侧显示区域 */}
          <div className="flex items-center justify-center p-6 bg-gradient-to-br from-purple-500/5 to-pink-500/5 dark:from-purple-500/10 dark:to-pink-500/10 rounded-xl">
            <div className="grid grid-cols-4 gap-4 w-full">
              {Object.entries(countdown).map(([key, value]) => (
                <motion.div
                  key={key}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-mono font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {t(key)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}