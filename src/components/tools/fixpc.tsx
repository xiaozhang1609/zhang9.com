import React from 'react';
import { MessageSquare, Star, Users, Video, ChevronDown, QrCode } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FixPC() {
  const ServiceCard = ({ title, price, features, highlight = false }) => (
    <motion.div
      whileHover={{ y: -5 }}
      className={`relative overflow-hidden border border-gray-200/50 dark:border-gray-700/50 
        ${highlight 
          ? 'bg-gradient-to-br from-blue-500/5 to-cyan-500/5 dark:from-blue-500/10 dark:to-cyan-500/10' 
          : 'bg-white/90 dark:bg-gray-800/90'
        } backdrop-blur-lg shadow-lg`}
    >
      {highlight && (
        <div className="absolute -right-12 top-6 rotate-45 bg-gradient-to-r from-blue-500 to-cyan-500 px-12 py-1.5 text-xs font-medium text-white">
          推荐
        </div>
      )}
      <div className="p-6 flex flex-col items-center text-center">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h3>
        <div className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
          {price.replace('起', '')}
          <span className="text-sm ml-0.5">起</span>
        </div>
        <ul className="mt-4 space-y-3 w-full">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center justify-center gap-2">
              <span className="flex-shrink-0 w-4 h-4 bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Star className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
        <button className="mt-6 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-sm font-medium transition-all duration-300">
          立即咨询
        </button>
      </div>
    </motion.div>
  );

  const getColorClasses = (color: string) => ({
    border: `border-${color}-100/50 dark:border-${color}-800/50`,
    gradient: `from-${color}-100 to-${color}-200 dark:from-${color}-900 dark:to-${color}-800`,
    icon: `text-${color}-600 dark:text-${color}-400`,
    text: `text-${color}-700 dark:text-${color}-300`,
    textGradient: `from-${color}-600 to-${color}-500 dark:from-${color}-400 dark:to-${color}-500`
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-6xl mx-auto p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 lg:space-y-12">
        {/* Header Card */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-6 lg:p-8 shadow-xl border border-gray-100/50 dark:border-gray-700/50">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-4 sm:gap-6">
              <div className="p-4 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 group hover:scale-105 transition-transform duration-300">
                <img
                  src="/head.webp"
                  alt="头像"
                  className="w-20 h-20 shadow-lg group-hover:rotate-6 transition-transform duration-300"
                />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
                  IT小章
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">电脑维修 | 编程服务 | 问题咨询</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 shadow-xl group hover:scale-105 transition-transform duration-300">
                <img
                  src="/wechat.webp"
                  alt="微信二维码"
                  className="w-24 sm:w-28 h-24 sm:h-28"
                />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
                <div className="p-2 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 mb-2 mx-auto sm:mx-0 w-fit">
                  <QrCode className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="font-medium text-gray-800 dark:text-gray-200">扫码添加微信</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">工作时间：9:00-21:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {[
            { icon: Users, value: "3,764+", label: "服务用户", color: "blue" },
            { icon: Star, value: "1,747+", label: "好评数", color: "indigo" },
            { icon: MessageSquare, value: "17,889+", label: "解答数", color: "purple" },
            { icon: Video, value: "35+", label: "教程数", color: "violet" }
          ].map((stat, index) => {
            const colors = getColorClasses(stat.color);
            return (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-6 shadow-xl ${colors.border} transition-all duration-300`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 bg-gradient-to-br ${colors.gradient}`}>
                    <stat.icon className={colors.icon} />
                  </div>
                  <div>
                    <div className={colors.text + " text-2xl font-bold"}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <ServiceCard
            title="基础服务"
            price="￥50起"
            features={['系统维护', '软件配置', '问题咨询']}
          />
          <ServiceCard
            title="进阶服务"
            price="￥100起"
            features={['数据恢复', '远程支持', '性能优化']}
            highlight={true}
          />
          <ServiceCard
            title="专业服务"
            price="￥200起"
            features={['网站建设', '技术咨询', '定制服务']}
          />
        </div>
      </div>
    </div>
  );
}