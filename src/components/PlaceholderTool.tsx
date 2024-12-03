import React from 'react';
import { useTranslation } from 'react-i18next';
import { LucideIcon } from 'lucide-react';

interface PlaceholderToolProps {
  toolId: string;
  icon: LucideIcon;
}

export default function PlaceholderTool({ toolId, icon: Icon }: PlaceholderToolProps) {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/30">
      <div className="flex items-center justify-center mb-8">
        <Icon className="w-16 h-16 text-primary-600 dark:text-primary-400" />
      </div>
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
        {t(toolId)}
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400">
        {t('comingSoon')}
      </p>
    </div>
  );
}