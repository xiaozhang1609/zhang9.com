import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, ExternalLink, FileText, Video, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import officialWebsites from '../../data/official-websites.json';
import debounce from 'lodash/debounce';
import SEO from '../common/SEO';
import { motion } from 'framer-motion';

interface Website {
  id: string;
  name: string;
  description: string;
  link: string;
  alias: string[];
  textTutorial: string | null;
  videoTutorial: string | null;
}

export default function OfficialWebsiteSearch({ onToolChange }: { onToolChange?: (toolId: string) => void }) {
  const [searchName, setSearchName] = useState('');
  const [websites, setWebsites] = useState<Website[]>([]);
  const [foundWebsite, setFoundWebsite] = useState<Website | null>(null);
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const allWebsites = [
      ...officialWebsites['推荐软件'],
      ...officialWebsites['常用软件']
    ];
    setWebsites(allWebsites);
  }, []);

  const generateSearchQuery = (softwareName: string) => {
    const positiveKeywords = ["官方网站", "官网", "官方"];
    return `"${softwareName}" ${positiveKeywords.join(" ")}`;
  };

  const performSearch = useCallback(() => {
    if (searchName.trim()) {
      const found = websites.find(
        site => 
          site.name.toLowerCase() === searchName.trim().toLowerCase() ||
          site.alias.some(alias => alias.toLowerCase() === searchName.trim().toLowerCase())
      );

      if (found) {
        setFoundWebsite(found);
        if (!found.textTutorial && !found.videoTutorial) {
          window.open(found.link, "_blank");
        }
      } else {
        setFoundWebsite(null);
        const query = generateSearchQuery(searchName.trim());
        const searchUrl = `https://cn.bing.com/search?q=${encodeURIComponent(query)}`;
        window.open(searchUrl, "_blank");
      }
    } else {
      alert(t('pleaseEnterSoftwareName'));
    }
  }, [searchName, websites, t]);

  const debouncedSearch = useCallback(debounce(performSearch, 300), [performSearch]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      debouncedSearch();
    }
  };

  const handleComputerRepairClick = () => {
    if (onToolChange) {
      onToolChange('computerRepair');
    }
  };

  return (
    <>
      <SEO toolId="officialWebsiteSearch" />
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/30 space-y-8 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90"
      >
        <div className="text-center space-y-4">
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent tracking-tight"
          >
            {t('officialWebsiteSearch')}
          </motion.h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">{t('quickFindOfficialWebsite')}</p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleComputerRepairClick}
            className="mt-4 flex items-center mx-auto px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50 shadow-md"
          >
            <Wrench className="w-5 h-5 mr-2" />
            <span>需要修电脑？点击联系我</span>
          </motion.button>
        </div>
        
        <div className="relative mt-8">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('enterSoftwareName')}
                className="w-full p-4 text-xl bg-white dark:bg-gray-700 border-2 border-blue-200 dark:border-blue-700 rounded-xl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 focus:border-blue-300 dark:focus:border-blue-600 transition duration-300 ease-in-out placeholder-gray-400 dark:placeholder-gray-500 shadow-inner"
                aria-label={t('enterSoftwareName')}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={debouncedSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 shadow-md"
                aria-label={t('officialWebsiteSearch')}
              >
                <Search className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>

        {foundWebsite && (foundWebsite.textTutorial || foundWebsite.videoTutorial) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
          >
            {/* 软件信息头部 */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-750">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{foundWebsite.name}</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{foundWebsite.description}</p>
            </div>

            {/* 链接区域 */}
            <div className="p-6 grid gap-4 sm:grid-cols-3">
              {/* 官方网站 */}
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={foundWebsite.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 space-x-3 rounded-lg border border-blue-100 dark:border-blue-900 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-600 dark:text-blue-400 hover:shadow-md transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5 flex-shrink-0" />
                <div>
                  <div className="font-medium">{t('officialWebsite')}</div>
                  <div className="text-sm opacity-75 truncate">{t('visitWebsite')}</div>
                </div>
              </motion.a>

              {/* 文字教程 */}
              {foundWebsite.textTutorial && (
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href={foundWebsite.textTutorial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 space-x-3 rounded-lg border border-green-100 dark:border-green-900 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 text-green-600 dark:text-green-400 hover:shadow-md transition-all duration-300"
                >
                  <FileText className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{t('textTutorialTitle')}</div>
                    <div className="text-sm opacity-75 truncate">{t('viewTutorial')}</div>
                  </div>
                </motion.a>
              )}

              {/* 视频教程 */}
              {foundWebsite.videoTutorial && (
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href={foundWebsite.videoTutorial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 space-x-3 rounded-lg border border-red-100 dark:border-red-900 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 text-red-600 dark:text-red-400 hover:shadow-md transition-all duration-300"
                >
                  <Video className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{t('videoTutorialTitle')}</div>
                    <div className="text-sm opacity-75 truncate">{t('watchVideo')}</div>
                  </div>
                </motion.a>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}