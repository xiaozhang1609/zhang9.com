'use client'

import { useState, useEffect } from 'react'
import { Monitor, ExternalLink } from 'lucide-react'
import { MdDownload, MdContentCopy, MdError, MdCheckCircle } from 'react-icons/md'
import { Loader2 } from 'lucide-react'

interface WindowsSystem {
  SystemCode: string
  VerCode: string
  BuildVer: string
  Size: string
  Sha1: string
  FilePath: string
}

const API_HOST = 'https://api.hotpe.top'

export default function WinMirror() {
  const [currentSystem, setCurrentSystem] = useState<'11' | '10'>('11')
  const [systems, setSystems] = useState<WindowsSystem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetchWinInfos(currentSystem)
  }, [currentSystem])

  const fetchWinInfos = async (systemCode: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_HOST}/API/WinNew/getFileList.php?SystemCode=${systemCode}`)
      if (!response.ok) throw new Error('网络请求失败')
      const data = await response.json()
      setSystems(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : '获取数据失败')
    } finally {
      setLoading(false)
    }
  }

  const copyToClip = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      alert('复制失败: ' + err)
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="card bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/30 overflow-hidden">
        {/* 标题区域 */}
        <div className="text-center p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-xl mb-4">
            <Monitor className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            Windows系统下载
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            获取最新的Windows系统ISO镜像文件，支持Windows 10/11
          </p>
        </div>

        {/* 内容区域 */}
        <div className="p-6 space-y-6">
          {/* 系统选择 */}
          <div className="flex justify-center gap-4 mb-8">
            {(['11', '10'] as const).map((system) => (
              <button
                key={system}
                onClick={() => setCurrentSystem(system)}
                className={`
                  px-8 py-3 rounded-xl transition-all duration-200
                  flex items-center gap-2 font-medium text-base
                  ${currentSystem === system
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25 scale-105'
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                <Monitor className="w-5 h-5" />
                Windows {system}
              </button>
            ))}
          </div>

          {/* 加载状态 */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
              <p className="text-gray-600 dark:text-gray-400">正在获取系统信息...</p>
            </div>
          )}

          {/* 错误提示 */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl text-center">
              <MdError className="w-10 h-10 text-red-500 mx-auto mb-3" />
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* 系统列表 */}
          {!loading && !error && systems.map((system, index) => (
            <div 
              key={index} 
              className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Windows {system.SystemCode} {system.VerCode}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">Build {system.BuildVer}</p>
                </div>
                <span className="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                  {(Number(system.Size) / 1024 / 1024 / 1024).toFixed(2)} GB
                </span>
              </div>

              <div className="bg-white dark:bg-gray-900/50 p-4 rounded-lg mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-mono">
                  <span className="text-gray-400 dark:text-gray-500">SHA1:</span>
                  {system.Sha1}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => window.open(system.FilePath, '_self')}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 
                           bg-gradient-to-r from-blue-600 to-cyan-500 
                           text-white font-medium rounded-xl
                           hover:from-blue-700 hover:to-cyan-600 
                           transition-all duration-200 shadow-lg shadow-blue-500/25
                           transform hover:translate-y-[-1px]"
                >
                  <MdDownload className="w-5 h-5" />
                  下载系统镜像
                </button>
                <button
                  onClick={() => copyToClip(system.FilePath)}
                  className={`
                    min-w-[120px] flex items-center justify-center gap-2 px-4 py-3
                    rounded-xl transition-all duration-200
                    ${copied 
                      ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                      : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  {copied ? (
                    <>
                      <MdCheckCircle className="w-5 h-5" />
                      已复制
                    </>
                  ) : (
                    <>
                      <MdContentCopy className="w-5 h-5" />
                      复制链接
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}

          {/* 参考链接 */}
          <div className="flex items-center justify-center gap-2 pt-6 mt-8 border-t border-gray-200 dark:border-gray-700">
            <ExternalLink className="w-4 h-4 text-gray-400" />
            <a 
              href="https://winnew.cn/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              参考来源: winnew.cn
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
