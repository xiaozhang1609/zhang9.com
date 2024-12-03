import { useTranslation } from 'react-i18next';
import { Menu, Sun, Moon, Home, Info } from 'lucide-react';
import { SiBilibili } from 'react-icons/si';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
  onMenuClick: () => void;
  onHomeClick: () => void;
  onLogoClick: () => void;
  onAboutClick: () => void;
}

export default function Header({ onMenuClick, onHomeClick, onAboutClick }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700 transition-all duration-200">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 active:scale-95"
            aria-label={t('toggleMenu')}
            title={t('toggleMenu')}
          >
            <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          
          <button
            onClick={onHomeClick}
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 active:scale-95"
            aria-label="Home"
            title={t('toolbox')}
          >
            <Home className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://space.bilibili.com/3546607630944387"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 active:scale-95"
            title="Bilibili"
          >
            <SiBilibili className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </a>

          <button
            onClick={toggleTheme}
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 active:scale-95"
            aria-label={t('toggleTheme')}
            title={t('toggleTheme')}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>

          <button
            onClick={toggleLanguage}
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 active:scale-95"
            aria-label={t('switchLang')}
            title={t('switchLang')}
          >
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {i18n.language === 'zh' ? 'EN' : '中文'}
            </span>
          </button>

          <button
            onClick={onAboutClick}
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 active:scale-95"
            aria-label={t('about')}
            title={t('about')}
          >
            <Info className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </header>
  );
}
