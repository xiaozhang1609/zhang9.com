import { motion } from 'framer-motion';
import { categories, getToolsByCategory } from '../config/tools';

interface SidebarProps {
  isOpen: boolean;
  activeTool: string;
  onToolSelect: (toolId: string) => void;
  onHomeClick: () => void;
}

export default function Sidebar({ isOpen, activeTool, onToolSelect, onHomeClick }: SidebarProps) {
  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: isOpen ? 0 : -280 }}
      className="fixed left-0 top-0 h-full w-70 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white shadow-xl z-[60] grid grid-rows-[auto_1fr_auto]"
    >
      {/* 简化后的头部设计 */}
      <div className="p-6 border-b border-white/10">
        <motion.div 
          className="flex items-center gap-6 cursor-pointer group"
          onClick={onHomeClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Logo容器 - 更大尺寸 */}
          <motion.div 
            whileHover={{ rotate: 5 }}
            className="flex items-center justify-center"
          >
            <img 
              src="/favicon.svg" 
              alt="logo" 
              className="w-12 h-12 transform group-hover:scale-110 transition-transform duration-300"
            />
          </motion.div>

          {/* 文字部分 */}
          <div className="transform group-hover:translate-x-1 transition-transform duration-300">
            <h1 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
              章九工具箱
            </h1>
            <p className="text-sm text-indigo-200/90 font-medium mt-0.5">
              提升您的工作效率
            </p>
          </div>
        </motion.div>
      </div>

      <div className="overflow-y-auto scrollbar-hide">
        <div className="px-4 py-6">
          {Object.entries(categories).map(([category, label]) => (
            <div key={category} className="mb-6">
              <h3 className="px-4 text-xs font-medium text-indigo-300/70 uppercase tracking-wider mb-3">
                {label}
              </h3>
              <div className="space-y-1">
                {getToolsByCategory(category as keyof typeof categories).map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => onToolSelect(tool.id)}
                    className={`w-full px-4 py-2.5 flex items-center gap-3 rounded-lg transition-all duration-200 ${
                      activeTool === tool.id
                        ? 'bg-white/10 text-white'
                        : tool.isNew 
                          ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 text-white'
                          : 'hover:bg-white/5 text-gray-300 hover:text-white'
                    }`}
                  >
                    <tool.icon className={`w-5 h-5 ${activeTool === tool.id ? 'text-indigo-400' : tool.isNew ? 'text-amber-400' : ''}`} />
                    <div className="flex items-center">
                      <span>{tool.name}</span>
                      {tool.isNew && (
                        <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-amber-500 text-white rounded-full animate-pulse">
                          NEW
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}