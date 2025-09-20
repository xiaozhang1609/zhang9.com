import React from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuickLink {
  title: string;
  url: string;
  category: 'system' | 'image' | 'game' | 'personal';
}

const links: QuickLink[] = [
  // 系统工具
  { title: '小章软件推荐', url: 'https://www.123912.com/s/dptuVv-D1oW3', category: 'system' },
  { title: '远程安装系统', url: 'https://www.123pan.com/s/dptuVv-6fQW3.html', category: 'system' },
  { title: '启动U盘', url: 'https://www.123pan.com/s/dptuVv-yfQW3.html', category: 'system' },
  { title: '驱动备用', url: 'https://www.123pan.com/s/dptuVv-jfQW3.html', category: 'system' },
  { title: '常用软件', url: 'https://www.123pan.com/s/dptuVv-baQW3.html', category: 'system' },
  { title: '桌面美化', url: 'https://v0-wallpaper-viewer-app.vercel.app/', category: 'system' },
  { title: '24小时后删除', url: 'https://www.123912.com/s/dptuVv-7VEW3', category: 'system' },
  { title: '临时文件分享', url: 'https://www.wenshushu.cn/', category: 'system' },
  { title: '镜像下载', url: 'https://winnew.cn/', category: 'system' },
  { title: 'PDF工具', url: 'https://stirlingpdf.io/', category: 'system' },
  { title: '网页OCR', url: 'https://web.baimiaoapp.com/', category: 'system' },
  { title: '在线剪切板', url: 'https://note.ms/itxiaozhang', category: 'system' },
  
  // 图片工具
  { title: 'TinyPNG', url: 'https://tinypng.com/', category: 'image' },
  { title: 'remove.bg', url: 'https://www.remove.bg/zh', category: 'image' },
  { title: '壁纸网站', url: 'https://wallhaven.cc', category: 'image' },
  { title: '今日必应', url: 'https://www.todaybing.com/', category: 'image' },
  
  // 游戏娱乐
  { title: '魔方游戏', url: 'https://pengfeiw.github.io/rubiks-cube/', category: 'game' },
  { title: '在线扫雷', url: 'https://www.1000mines.com/', category: 'game' },
  
  // 个人导航
  { title: '阅读记录', url: 'https://read.itxiaozhang.com/', category: 'personal' },
  { title: '订阅记录', url: 'https://sub.itxiaozhang.com/', category: 'personal' },
  { title: '我的博客', url: 'https://itxiaozhang.com/', category: 'personal' }
];

const categories = {
  personal: '个人导航',
  system: '系统工具',
  image: '图片工具',
  game: '游戏娱乐'
};

export default function QuickLinks() {
  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-8">
        {(Object.keys(categories) as Array<keyof typeof categories>).map((category) => (
          <div key={category} className="mb-12">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 
                         pl-2 border-l-4 border-indigo-500">
              {categories[category]}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {links
                .filter(link => link.category === category)
                .map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group relative"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 
                                rounded-xl transform -rotate-1 scale-[1.02] opacity-0 
                                group-hover:opacity-100 transition-all duration-300"/>
                    <div className="relative backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 
                                rounded-xl p-6
                                border border-gray-200/50 dark:border-gray-700/50 
                                shadow-lg shadow-gray-100/20 dark:shadow-black/30
                                group-hover:shadow-xl group-hover:shadow-indigo-200/20 
                                dark:group-hover:shadow-indigo-900/20
                                group-hover:border-indigo-300/50 dark:group-hover:border-indigo-500/50
                                transition-all duration-500 ease-out">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold text-gray-700 dark:text-gray-200 
                                   group-hover:text-indigo-600 dark:group-hover:text-indigo-400 
                                   transition-colors duration-300">
                          {link.title}
                        </h3>
                        <div className="relative">
                          <div className="absolute inset-0 bg-indigo-500/20 dark:bg-indigo-400/20 
                                      rounded-full blur opacity-0 group-hover:opacity-100 
                                      transition-opacity duration-300"/>
                          <ExternalLink className="w-4 h-4 relative z-10 text-gray-400/80
                                              group-hover:text-indigo-500 dark:group-hover:text-indigo-400 
                                              transition-all duration-300 
                                              group-hover:rotate-12" />
                        </div>
                      </div>
                    </div>
                  </motion.a>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
