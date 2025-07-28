"use client"

import { motion } from "framer-motion"
import { ExternalLink, Clock } from "lucide-react"

export default function ComputerRepairNight() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* 主要内容卡片 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center shadow-lg">
          {/* 头像图标 */}
          <div className="mb-6">
            <img 
              src="/head.webp" 
              alt="章九修电脑" 
              className="w-20 h-20 rounded-full mx-auto border-4 border-gray-100 dark:border-gray-700 shadow-md"
            />
          </div>
          
          {/* 标题 */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            章九修电脑
          </h1>
          
          {/* 副标题 */}
          <div className="flex items-center justify-center mb-4">
            <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              夜间维修服务
            </span>
          </div>
          
          {/* 说明文字 */}
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-sm">
            夜间时段请通过淘宝店铺下单<br/>
            工作时间内及时处理您的维修需求
          </p>
          
          {/* 店铺信息卡片 */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4 mb-6 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-center mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <p className="text-sm text-gray-700 dark:text-gray-200 font-semibold">
                官方淘宝店铺
              </p>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 font-mono bg-white dark:bg-gray-800 px-3 py-1 rounded border">
              zhang9.taobao.com
            </p>
          </div>
          
          {/* 进入按钮 */}
          <motion.a
            href="https://zhang9.taobao.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(0,0,0,0.15)" }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 w-full justify-center shadow-md hover:shadow-lg"
          >
            <span>进入淘宝店铺</span>
            <ExternalLink className="w-4 h-4 ml-2" />
          </motion.a>
          
          {/* 工作时间提示 */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
              <Clock className="w-3 h-3 mr-1" />
              工作时间：06:00 - 22:00
            </p>
          </div>
        </div>
        
        {/* 底部装饰 */}
        <div className="text-center mt-4">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            专业电脑维修服务
          </p>
        </div>
      </motion.div>
    </div>
  )
}