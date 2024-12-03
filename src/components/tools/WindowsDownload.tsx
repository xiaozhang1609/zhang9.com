import React, { useEffect, useState } from 'react';
import { Download, MonitorDown, AlertCircle } from 'lucide-react';

interface WinFileInfo {
  FileName: string;
  LanguageCode: string;
  Language: string;
  Edition: string;
  Architecture: string;
  Size: string;
  Sha1: string;
  FilePath: string;
  Architecture_Loc: string;
  Edition_Loc: string;
  PushTime: string;
  BuildVer: string;
  VerCode: string;
  SystemCode: string;
}

interface FilterOptions {
  SystemCode: string;
  Version: string;
  LanguageCode: string;
  Edition: string;
}

function WindowsDownload() {
  const [winInfos, setWinInfos] = useState<WinFileInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    SystemCode: '',
    Version: '',
    LanguageCode: '',
    Edition: '',
  });

  const fetchWinInfos = async (options: FilterOptions) => {
    setLoading(true);
    setError(null);
    
    const queryParams = new URLSearchParams();
    Object.entries(options).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });

    try {
      const response = await fetch(`https://windowsdownload1101.suoliweng2099.workers.dev/api/windows?${queryParams}`);
      if (!response.ok) throw new Error('获取数据失败');
      
      const data = await response.json();
      setWinInfos(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : '获取数据失败');
      console.error('Failed to fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWinInfos(filters);
  }, [filters]);

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleDownload = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* 标题区域 */}
      <div className="card p-6 text-center border-b border-gray-200 dark:border-gray-700">
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-xl mb-4">
          <MonitorDown className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
          Windows 镜像下载
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          提供 Windows 10/11 官方镜像下载，数据来自微软官方
        </p>
      </div>

      {/* 筛选器区域 */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">系统版本</label>
            <select 
              value={filters.SystemCode}
              onChange={(e) => handleFilterChange('SystemCode', e.target.value)}
              className="w-full p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl"
            >
              <option value="">全部</option>
              <option value="win11">Windows 11</option>
              <option value="win10">Windows 10</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">具体版本</label>
            <select 
              value={filters.Version}
              onChange={(e) => handleFilterChange('Version', e.target.value)}
              className="w-full p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl"
            >
              <option value="">全部</option>
              <option value="22H2">22H2</option>
              <option value="21H2">21H2</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">语言</label>
            <select 
              value={filters.LanguageCode}
              onChange={(e) => handleFilterChange('LanguageCode', e.target.value)}
              className="w-full p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl"
            >
              <option value="">全部</option>
              <option value="zh-cn">简体中文</option>
              <option value="en-us">English (US)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">版本</label>
            <select 
              value={filters.Edition}
              onChange={(e) => handleFilterChange('Edition', e.target.value)}
              className="w-full p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl"
            >
              <option value="">全部</option>
              <option value="pro">专业版</option>
              <option value="home">家庭版</option>
            </select>
          </div>
        </div>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="card p-4 bg-red-50 dark:bg-red-900/30">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* 加载状态 */}
      {loading ? (
        <div className="card p-8">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">加载中...</p>
          </div>
        </div>
      ) : (
        /* 镜像列表 */
        <div className="space-y-4">
          {winInfos.map((info, index) => (
            <div key={index} className="card p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <h2 className="text-xl font-semibold">{info.FileName}</h2>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm rounded-full">
                      {info.SystemCode === 'win11' ? 'Windows 11' : 'Windows 10'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p><span className="text-gray-500">版本:</span> {info.Edition_Loc}</p>
                      <p><span className="text-gray-500">语言:</span> {info.Language}</p>
                      <p><span className="text-gray-500">架构:</span> {info.Architecture_Loc}</p>
                      <p><span className="text-gray-500">构建版本:</span> {info.BuildVer}</p>
                    </div>
                    <div className="space-y-2">
                      <p><span className="text-gray-500">大小:</span> {info.Size}</p>
                      <p><span className="text-gray-500">发布时间:</span> {new Date(info.PushTime).toLocaleDateString()}</p>
                      <p className="font-mono text-sm truncate">
                        <span className="text-gray-500">SHA1:</span> {info.Sha1}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <button
                    onClick={() => handleDownload(info.FilePath)}
                    className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    下载
                  </button>
                </div>
              </div>
            </div>
          ))}

          {!loading && winInfos.length === 0 && (
            <div className="card p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                没有找到符合条件的镜像文件
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WindowsDownload;