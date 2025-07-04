import { useTranslation } from 'react-i18next';
import { Menu, Home, Info } from 'lucide-react';


interface HeaderProps {
  onMenuClick: () => void;
  onHomeClick: () => void;
  onLogoClick: () => void;
  onAboutClick: () => void;
}

export default function Header({ onMenuClick, onHomeClick }: Omit<HeaderProps, 'onAboutClick'>) {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200 transition-all duration-200">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 active:scale-95"
            aria-label={t('toggleMenu')}
            title={t('toggleMenu')}
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
          
          <button
            onClick={onHomeClick}
            className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 active:scale-95"
            aria-label="Home"
            title={t('toolbox')}
          >
            <Home className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <div className="flex items-center gap-2">


          
        </div>
      </div>
    </header>
  );
}
