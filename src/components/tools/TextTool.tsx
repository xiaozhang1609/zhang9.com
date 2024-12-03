import React, { useState, useCallback } from 'react';
import { Type, Copy, Trash2, RefreshCw } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface TextStats {
  totalChars: number;
  noSpaceChars: number;
  chineseChars: number;
  englishWords: number;
  paragraphs: number;
  sentences: number;
  chinesePunctuation: number;
  englishPunctuation: number;
  numbers: number;
  spaces: number;
  lines: number;
}

export default function TextTool() {
  const [text, setText] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [stats, setStats] = useState<TextStats | null>(null);

  const calculateStats = useCallback(async (input: string) => {
    setIsCalculating(true);
    try {
      const result = {
        totalChars: input.length,
        noSpaceChars: input.replace(/\s/g, '').length,
        chineseChars: (input.match(/[\u4e00-\u9fa5]/g) || []).length,
        englishWords: (input.match(/[a-zA-Z]+/g) || []).length,
        paragraphs: input.split(/\n+/).filter(para => para.trim().length > 0).length,
        sentences: (input.match(/[。！？\.!?]+/g) || []).length,
        chinesePunctuation: (input.match(/[，。！？、；：""''（）【】《》〈〉「」『』〔〕…—～]/g) || []).length,
        englishPunctuation: (input.match(/[,.!?;:'"()\[\]<>]/g) || []).length,
        numbers: (input.match(/\d/g) || []).length,
        spaces: (input.match(/\s/g) || []).length,
        lines: (input.match(/\n/g) || []).length + 1
      };
      setStats(result);
      return result;
    } finally {
      setIsCalculating(false);
    }
  }, []);

  const handleTextChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    await calculateStats(newText);
  };

  const copyStats = () => {
    if (!stats) return;
    
    const result = `文本统计结果：
总字符数：${stats.totalChars}
不含空格字符数：${stats.noSpaceChars}
中文字数：${stats.chineseChars}
英文单词数：${stats.englishWords}
段落数：${stats.paragraphs}
句子数：${stats.sentences}
中文标点符号：${stats.chinesePunctuation}
英文标点符号：${stats.englishPunctuation}
数字：${stats.numbers}
空格：${stats.spaces}
行数：${stats.lines}`;

    navigator.clipboard.writeText(result).then(() => {
      toast.success('统计结果已复制', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'dark',
      });
    });
  };

  const clearText = () => {
    setText('');
    setStats(null);
    toast.success('已清空文本', {
      position: 'top-right',
      autoClose: 2000,
      theme: 'dark',
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="card bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/30 overflow-hidden">
        {/* 标题区域参考 Generator 组件 */}
        <div className="text-center p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-xl mb-4">
            <Type className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            文本统计工具
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            快速统计文本字数和其他信息
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <textarea
              value={text}
              onChange={handleTextChange}
              className="w-full h-64 p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 resize-none"
              placeholder="在此输入文本..."
            />
          </div>

          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl space-y-2">
                <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-400 mb-4">基本统计</h2>
                <p className="text-gray-700 dark:text-gray-300">总字符数：<span className="font-bold">{stats.totalChars}</span></p>
                <p className="text-gray-700 dark:text-gray-300">不含空格字符数：<span className="font-bold">{stats.noSpaceChars}</span></p>
                <p className="text-gray-700 dark:text-gray-300">中文字数：<span className="font-bold">{stats.chineseChars}</span></p>
                <p className="text-gray-700 dark:text-gray-300">英文单词数：<span className="font-bold">{stats.englishWords}</span></p>
                <p className="text-gray-700 dark:text-gray-300">段落数：<span className="font-bold">{stats.paragraphs}</span></p>
                <p className="text-gray-700 dark:text-gray-300">句子数：<span className="font-bold">{stats.sentences}</span></p>
              </div>

              <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-xl space-y-2">
                <h2 className="text-lg font-semibold text-cyan-800 dark:text-cyan-400 mb-4">详细统计</h2>
                <p className="text-gray-700 dark:text-gray-300">中文标点符号：<span className="font-bold">{stats.chinesePunctuation}</span></p>
                <p className="text-gray-700 dark:text-gray-300">英文标点符号：<span className="font-bold">{stats.englishPunctuation}</span></p>
                <p className="text-gray-700 dark:text-gray-300">数字：<span className="font-bold">{stats.numbers}</span></p>
                <p className="text-gray-700 dark:text-gray-300">空格：<span className="font-bold">{stats.spaces}</span></p>
                <p className="text-gray-700 dark:text-gray-300">行数：<span className="font-bold">{stats.lines}</span></p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-4">
            <button
              onClick={clearText}
              disabled={!text || isCalculating}
              className="p-3 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title="清空文本"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={copyStats}
              disabled={!stats || isCalculating}
              className="p-3 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title="复制统计结果"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
