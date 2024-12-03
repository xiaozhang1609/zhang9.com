import React, { useState, useCallback } from 'react';
import { Type, Copy, Trash2, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';
import pangu from 'pangu';

export default function TextFormatter() {
  const [text, setText] = useState('');
  const [formattedText, setFormattedText] = useState('');
  const [isFormatting, setIsFormatting] = useState(false);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
  }, []);

  const formatText = () => {
    if (!text) return;
    
    setIsFormatting(true);
    try {
      const result = pangu.spacing(text);
      setFormattedText(result);
      toast.success('格式化完成', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'dark',
      });
    } catch (error) {
      console.error('Format error:', error);
      toast.error('格式化失败，请重试', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'dark',
      });
    } finally {
      setIsFormatting(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formattedText);
      toast.success('复制成功', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'dark',
      });
    } catch (error) {
      console.error('Copy error:', error);
      toast.error('复制失败，请重试', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'dark',
      });
    }
  };

  const clearText = () => {
    setText('');
    setFormattedText('');
    toast.success('已清空文本', {
      position: 'top-right',
      autoClose: 2000,
      theme: 'dark',
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="card bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/30 overflow-hidden">
        <div className="text-center p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-xl mb-4">
            <Type className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            中英文格式化工具
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            自动为中英文之间添加空格，让文本更易读
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                <span>原始文本</span>
              </div>
              <textarea
                value={text}
                onChange={handleTextChange}
                className="w-full h-64 p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 resize-none"
                placeholder="在此输入需要格式化的文本..."
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                  <span>格式化结果</span>
                </div>
                <button
                  onClick={copyToClipboard}
                  disabled={!formattedText || isFormatting}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  title="复制结果"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
              <textarea
                value={formattedText}
                readOnly
                className="w-full h-64 p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 resize-none"
                placeholder="格式化后的文本将显示在这里..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={clearText}
              disabled={!text || isFormatting}
              className="p-3 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title="清空文本"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={formatText}
              disabled={!text || isFormatting}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-xl transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-5 h-5 ${isFormatting ? 'animate-spin' : ''}`} />
              {isFormatting ? '格式化中...' : '格式化'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}