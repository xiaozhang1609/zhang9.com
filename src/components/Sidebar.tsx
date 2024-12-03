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
      <div className="p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border-b border-white/10">
        <div 
          className="flex items-center gap-4 cursor-pointer group" 
          onClick={onHomeClick}
        >
          <div className="p-3 bg-white/90 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-200">
            <img src="/favicon.svg" alt="logo" className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-wide">{t('toolbox')}</h1>
            <p className="text-sm text-indigo-200/90">{t('boostProductivity')}</p>
          </div>
        </div>
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
              <span>各种IT咨询服务</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
