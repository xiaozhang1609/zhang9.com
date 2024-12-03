import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Timer, Copy, Calendar, Clock, Sparkles, PartyPopper } from 'lucide-react';
import { toast } from 'react-toastify';
import chineseDays from 'chinese-days';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

interface LunarDate {
  lunarYear: string;
  lunarMonCN: string;
  lunarDayCN: string;
  lunarMon: number;
  lunarDay: number;
}

interface CountdownTime {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export default function TimeTools() {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState('');
  const [lunarDate, setLunarDate] = useState('');
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });
  const [nextNewYear, setNextNewYear] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getNextLunarNewYear = useCallback(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    for (let year = currentYear; year <= currentYear + 2; year++) {
      // 只在农历春节可能的月份(1-2月)查找
      for (let month = 1; month <= 2; month++) {
        for (let day = 1; day <= 31; day++) {
          const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
          try {
            const lunarDate = chineseDays.getLunarDate(date);
            if (lunarDate.lunarMon === 1 && lunarDate.lunarDay === 1) {
              const nextLunarNewYear = new Date(year, month - 1, day);
              if (nextLunarNewYear > now) {
                return nextLunarNewYear;
              }
            }
          } catch (e) {
            continue;
          }
        }
      }
    }
    return null;
  }, []);

  const updateDate = useCallback(() => {
    try {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        weekday: 'long' 
      };
      setCurrentDate(now.toLocaleDateString('zh-CN', options));
      
      const lunarDateObj = chineseDays.getLunarDate(now.toISOString().split('T')[0]);
      setLunarDate(`农历${lunarDateObj.lunarYear}年${lunarDateObj.lunarMonCN}${lunarDateObj.lunarDayCN}`);
    } catch (error) {
      toast.error('日期更新失败', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'dark',
      });
    }
  }, []);

  const updateCountdown = useCallback(() => {
    try {
      const now = new Date();
      const nextLunarNewYear = getNextLunarNewYear();
      if (!nextLunarNewYear) return;

      const timeDiff = nextLunarNewYear.getTime() - now.getTime();
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setCountdown({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
      });

      const nextLunarNewYearSolar = nextLunarNewYear.toLocaleDateString('zh-CN');
      const nextLunarNewYearLunar = chineseDays.getLunarDate(nextLunarNewYear.toISOString().split('T')[0]);
      setNextNewYear(`下一个农历新年：${nextLunarNewYearSolar} (农历${nextLunarNewYearLunar.lunarYear}年正月初一)`);
    } catch (error) {
      toast.error('倒计时更新失败', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'dark',
      });
    }
  }, [getNextLunarNewYear]);

  const copyCountdown = useCallback(() => {
    const text = `距离${nextNewYear}\n还有 ${countdown.days}天 ${countdown.hours}时 ${countdown.minutes}分 ${countdown.seconds}秒`;
    navigator.clipboard.writeText(text).then(() => {
      toast.success('复制成功', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'dark',
      });
    });
  }, [countdown, nextNewYear]);

  useEffect(() => {
    const dateInterval = setInterval(updateDate, 1000);
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    updateDate();
    updateCountdown();
    setIsLoading(false);

    return () => {
      clearInterval(dateInterval);
      clearInterval(countdownInterval);
    };
  }, [updateDate, updateCountdown]);

  const renderCountdownBox = useMemo(() => (label: string, value: string) => (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 w-full text-center">
        {value}
      </div>
      <span className="text-sm text-gray-600 dark:text-gray-400 mt-2">{label}</span>
    </div>
  ), []);

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <div className="text-center">
          <Timer className="w-8 h-8 mx-auto mb-4 animate-spin text-blue-500" />
          <p className="text-gray-600 dark:text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-red-900/30 dark:to-orange-900/20 p-4 md:p-8">
      {/* 装饰性元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-yellow-500/10 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* 标题区域 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-red-500/10 via-orange-500/10 to-yellow-500/10 dark:from-red-500/20 dark:via-orange-500/20 dark:to-yellow-500/20 rounded-full mb-6 group hover:scale-110 transition-transform duration-300">
            <PartyPopper className="w-12 h-12 text-red-600 dark:text-red-400 group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
            {t('newYearCountdown')}
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            倒数春节，共迎新年
          </p>
        </motion.div>

        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 当前时间卡片 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl dark:shadow-red-900/20 border border-red-100/50 dark:border-red-900/20">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-red-500" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">今日时间</h2>
              </div>
              <div className="space-y-6">
                <TimeDisplay label="公历" value={currentDate} />
                <TimeDisplay label="农历" value={lunarDate} />
              </div>
            </div>
          </motion.div>

          {/* 倒计时卡片 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl dark:shadow-red-900/20 border border-red-100/50 dark:border-red-900/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-red-500" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">春节倒计时</h2>
                </div>
                <button
                  onClick={copyCountdown}
                  className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors"
                >
                  <Copy className="w-5 h-5 text-red-500" />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                {['天', '时', '分', '秒'].map((label, index) => (
                  <CountdownBox
                    key={label}
                    label={label}
                    value={[countdown.days, countdown.hours, countdown.minutes, countdown.seconds][index]}
                  />
                ))}
              </div>

              <div className="text-center text-gray-600 dark:text-gray-400">
                {nextNewYear}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// 新增的子组件
const TimeDisplay = ({ label, value }: { label: string; value: string }) => (
  <div className="relative group">
    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity" />
    <div className="relative p-4 bg-red-50/50 dark:bg-red-900/10 rounded-2xl">
      <div className="flex items-center justify-between">
        <span className="text-gray-500 dark:text-gray-400">{label}</span>
        <span className="text-lg font-medium text-gray-900 dark:text-gray-50">{value}</span>
      </div>
    </div>
  </div>
);

const CountdownBox = ({ label, value }: { label: string; value: string }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity" />
    <div className="relative bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-4 text-center">
      <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
        {value}
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
    </div>
  </motion.div>
);
