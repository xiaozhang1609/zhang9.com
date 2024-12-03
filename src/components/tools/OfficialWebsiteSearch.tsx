import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, ExternalLink, FileText, Video } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import officialWebsites from '../../data/official-websites.json';
import debounce from 'lodash/debounce';
import SEO from '../common/SEO';

interface Website {
  id: string;
  name: string;
  description: string;
  link: string;
  alias: string[];
  textTutorial: string | null;
  videoTutorial: string | null;
}

export default function OfficialWebsiteSearch() {
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

  return (
    <>
      <SEO toolId="officialWebsiteSearch" />
      <div className="w-full max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/30 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">{t('officialWebsiteSearch')}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">{t('quickFindOfficialWebsite')}</p>
        </div>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('enterSoftwareName')}
            className="w-full p-4 text-xl bg-gray-50 dark:bg-gray-700 border-2 border-blue-200 dark:border-blue-700 rounded-xl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 focus:border-blue-300 dark:focus:border-blue-600 transition duration-300 ease-in-out placeholder-gray-400 dark:placeholder-gray-500"
            aria-label={t('enterSoftwareName')}
          />
          <button
            onClick={debouncedSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
            aria-label={t('officialWebsiteSearch')}
          >
            <Search className="w-6 h-6" />
          </button>
        </div>

        {foundWebsite && (foundWebsite.textTutorial || foundWebsite.videoTutorial) && (
          <div className="mt-8 overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            {/* 软件信息头部 */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{foundWebsite.name}</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{foundWebsite.description}</p>
            </div>

            {/* 链接区域 */}
            <div className="p-6 grid gap-4 sm:grid-cols-3">
              {/* 官方网站 */}
              <a
                href={foundWebsite.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 space-x-3 rounded-lg border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
              >
                <ExternalLink className="w-5 h-5 flex-shrink-0" />
                <div>
                  <div className="font-medium">{t('officialWebsite')}</div>
                  <div className="text-sm opacity-75 truncate">{t('visitWebsite')}</div>
                </div>
              </a>

              {/* 文字教程 */}
              {foundWebsite.textTutorial && (
                <a
                  href={foundWebsite.textTutorial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 space-x-3 rounded-lg border border-green-100 dark:border-green-900 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                >
                  <FileText className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{t('textTutorialTitle')}</div>
                    <div className="text-sm opacity-75 truncate">{t('viewTutorial')}</div>
                  </div>
                </a>
              )}

              {/* 视频教程 */}
              {foundWebsite.videoTutorial && (
                <a
                  href={foundWebsite.videoTutorial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 space-x-3 rounded-lg border border-red-100 dark:border-red-900 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                >
                  <Video className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{t('videoTutorialTitle')}</div>
                    <div className="text-sm opacity-75 truncate">{t('watchVideo')}</div>
                  </div>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}