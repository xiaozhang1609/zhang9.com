import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { categories, getToolsByCategory } from '../config/tools';
import { MessageSquare, Laptop } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  activeTool: string;
  onToolSelect: (toolId: string) => void;
  onHomeClick: () => void;
}

export default function Sidebar({ isOpen, activeTool, onToolSelect, onHomeClick }: SidebarProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: isOpen ? 0 : -280 }}
      className="fixed left-0 top-0 h-full w-70 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white shadow-xl z-[60] grid grid-rows-[auto_1fr_auto]"
    >
      {/* 简化后的头部设计 */}
      <div className="p-6 border-b border-white/10">
        <motion.div 
          className="flex items-center gap-6 cursor-pointer group" // 增加间距
          onClick={onHomeClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Logo容器 - 更大尺寸 */}
          <motion.div 
            whileHover={{ rotate: 5 }}
            className="flex items-center justify-center" // 添加居中对齐
          >
            <img 
              src="/favicon.svg" 
              alt="logo" 
              className="w-12 h-12 transform group-hover:scale-110 transition-transform duration-300" // 增大到 12x12
            />
          </motion.div>

          {/* 文字部分 */}
          <div className="transform group-hover:translate-x-1 transition-transform duration-300">
            <h1 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
              {t('toolbox')}
            </h1>
            <p className="text-sm text-indigo-200/90 font-medium mt-0.5">
              {t('boostProductivity')}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="overflow-y-auto scrollbar-hide">
        <div className="px-4 py-6">
          {Object.entries(categories).map(([category, label]) => (
            <div key={category} className="mb-6">
              <h3 className="px-4 text-xs font-medium text-indigo-300/70 uppercase tracking-wider mb-3">
                {t(label)}
              </h3>
              <div className="space-y-1">
                {getToolsByCategory(category as keyof typeof categories).map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => onToolSelect(tool.id)}
                    className={`w-full px-4 py-2.5 flex items-center gap-3 rounded-lg transition-all duration-200 ${
                      activeTool === tool.id
                        ? 'bg-white/10 text-white'
                        : 'hover:bg-white/5 text-gray-300 hover:text-white'
                    }`}
                  >
                    <tool.icon className={`w-5 h-5 ${activeTool === tool.id ? 'text-indigo-400' : ''}`} />
                    <span>{t(tool.name)}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full p-4 bg-gradient-to-t from-gray-900 via-gray-900/95 to-transparent">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <h3 className="text-sm font-medium mb-3 flex items-center text-indigo-200">
            {t('contact')}
            <span className="ml-2 px-2 py-0.5 text-xs bg-indigo-500/20 rounded-full">24/7</span>
          </h3>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-300 hover:text-white transition-colors">
              <MessageSquare className="w-4 h-4 mr-2 text-indigo-400" />
              <span>微信：xiaozhang1609</span>
            </div>
            <div className="flex items-center text-sm text-gray-300 hover:text-white transition-colors">
              <Laptop className="w-4 h-4 mr-2 text-indigo-400" />
              <span>提供各种IT服务</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
