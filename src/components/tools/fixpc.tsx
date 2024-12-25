'use client'

import React, { useState } from 'react';
import { 
  Monitor, Zap, Gamepad2, Wifi, AlertTriangle, Box, Database, 
  Cog, FileType2, Laptop, HardDrive, XCircle, Chrome, Printer, 
  Wrench, MessageCircle, Phone, X, ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  { title: '重装系统', desc: '系统重装与性能优化', icon: Monitor },
  { title: '电脑加速', desc: '解决卡顿提升流畅度', icon: Zap },
  { title: '游戏优化', desc: '游戏问题与性能提升', icon: Gamepad2 },
  { title: '网络修复', desc: '解决网络连接问题', icon: Wifi },
  { title: '故障修复', desc: '蓝屏/死机等故障处理', icon: AlertTriangle },
  { title: '软件修复', desc: '软件安装与问题处理', icon: Box },
  { title: '数据恢复', desc: '文件数据恢复服务', icon: Database },
  { title: '驱动安装', desc: '各类驱动安装更新', icon: Cog },
  { title: '格式转换', desc: '文档视频格式转换', icon: FileType2 },
  { title: '新机开荒', desc: '新电脑环境配置', icon: Laptop },
  { title: 'C盘清理', desc: '系统空间清理优化', icon: HardDrive },
  { title: '弹窗清除', desc: '清除各类广告弹窗', icon: XCircle },
  { title: '浏览器修复', desc: '浏览器故障处理', icon: Chrome },
  { title: '打印机修复', desc: '打印机配置维修', icon: Printer },
  { title: '其他服务', desc: '各类疑难问题解决', icon: Wrench },
];

const ServiceCard = ({ title, desc, icon: Icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.3)' }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 flex flex-col items-center p-6 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-blue-600 dark:text-blue-300" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white text-center">{title}</h3>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-blue-600 bg-opacity-90 dark:bg-blue-900 dark:bg-opacity-90 flex items-center justify-center p-4"
          >
            <p className="text-white text-center">{desc}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Modal = ({ isOpen, onClose, children }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default function PCRepairServices() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleContact = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative inline-block"
          >
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white sm:text-6xl sm:tracking-tight lg:text-7xl mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                远程电脑维修
              </span>
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 flex justify-center"
          >
            <button
              onClick={handleContact}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              立即咨询
            </button>
          </motion.div>
        </div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="px-6 py-12 sm:px-12 lg:py-16 lg:px-20 flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-4">
                需要帮助？
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                我们的专业团队随时为您服务
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button onClick={handleContact} className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out">
                <MessageCircle className="w-5 h-5 mr-2" />
                立即咨询
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="relative">
          {/* Header */}
          <div className="text-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              联系我们
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              扫描下方二维码添加微信
            </p>
          </div>

          {/* QR Code Section */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white rounded-2xl shadow-inner">
              <img 
                src="/wechat.webp" 
                alt="WeChat QR Code" 
                className="w-48 h-48 rounded-lg"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-blue-50 dark:bg-gray-700 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-300">
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">微信号：xiaozhang1609</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
            添加好友后，小章将第一时间为您解答问题
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                // 这里可以添加复制微信号的功能
                navigator.clipboard.writeText('xiaozhang1609');
              }}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center"
            >
              复制微信号
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center"
            >
              关闭
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <X className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
          </button>
        </div>
      </Modal>
    </div>
  );
}


