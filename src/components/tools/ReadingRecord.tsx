import { useEffect } from 'react';
import { BookOpen } from 'lucide-react';

export default function ReadingRecord() {
  useEffect(() => {
    window.open('https://read.itxiaozhang.com/', '_blank');
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-2xl mb-4">
          <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50">
          正在新标签页打开阅读记录...
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          如果没有自动打开，请点击<a href="https://read.itxiaozhang.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">这里</a>
        </p>
      </div>
    </div>
  );
}