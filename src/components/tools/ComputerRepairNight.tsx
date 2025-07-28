"use client"

import { motion } from "framer-motion"
import { ExternalLink, Clock } from "lucide-react"
import { useState, useEffect } from "react"

export default function ComputerRepairNight() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleString('zh-CN', {
      timeZone: 'Asia/Shanghai',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        {/* 主要内容卡片 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-300 dark:border-gray-600 p-10 text-center shadow-2xl">
          
          {/* 当前时间显示 */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center mb-3">
              <Clock className="w-6 h-6 text-gray-600 dark:text-gray-400 mr-3" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                北京时间
              </span>
            </div>
            <div className="text-2xl font-mono font-bold text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-600">
              {formatTime(currentTime)}
            </div>
          </motion.div>
          
          {/* 头像 - 放大版本 */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-8"
          >
            <img 
              src="/head.webp" 
              alt="章九" 
              className="w-24 h-24 rounded-full mx-auto border-4 border-gray-300 dark:border-gray-600 shadow-lg"
            />
          </motion.div>
          
          {/* 核心信息 - 放大版本 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-10"
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 tracking-wide">
              夜间维修服务
            </h1>
            <div className="w-24 h-1 bg-gray-800 dark:bg-gray-300 mx-auto rounded-full"></div>
          </motion.div>
          
          {/* 主要操作 - 放大版本 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <motion.a
              href="https://zhang9.taobao.com/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 12px 30px rgba(0,0,0,0.2)"
              }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center w-full px-8 py-4 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white font-semibold text-lg rounded-xl transition-all duration-300 shadow-lg border-2 border-gray-900 dark:border-gray-600"
            >
              <span>进入淘宝店铺</span>
              <ExternalLink className="w-5 h-5 ml-3" />
            </motion.a>
          </motion.div>
          
          {/* 次要信息 - 放大版本 */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="border-t-2 border-gray-200 dark:border-gray-700 pt-6"
          >
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2 font-medium">
              <p className="flex items-center justify-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                zhang9.taobao.com
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                工作时间 06:00 - 22:00
              </p>
            </div>
          </motion.div>
        </div>
        
        {/* 底部标识 */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-6"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide">
            专业电脑维修服务 · 值得信赖
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}