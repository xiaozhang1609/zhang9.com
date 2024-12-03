import { useTranslation } from 'react-i18next';
import { SiBilibili } from 'react-icons/si';
import { FaYoutube } from 'react-icons/fa';
import { Github } from 'lucide-react';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{t('about')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {t('aboutDescription')}
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            {t('socialMedia')}
          </h2>
          <div className="flex flex-col space-y-4">
            <a
              href="https://space.bilibili.com/3546607630944387"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              <SiBilibili className="w-6 h-6" />
              <span>Bilibili</span>
            </a>
            <a
              href="https://www.youtube.com/@itxiaozhang"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              <FaYoutube className="w-6 h-6" />
              <span>YouTube</span>
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            {t('contact')}
          </h2>
          <div className="flex flex-col space-y-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Github className="w-6 h-6" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
