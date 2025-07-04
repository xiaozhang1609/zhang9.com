"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Copy } from "lucide-react"

interface ContactInfo {
  type: "wechat" | "qq"
  id: string
  image: string
  label: string
}

const wechatContacts: ContactInfo[] = [
  { type: "wechat", id: "xiaozhang1609", image: "/weixin_xiaozhang1609.webp", label: "微信客服1" },
  { type: "wechat", id: "xiaozhang4096", image: "/weixin_xiaozhang4096.webp", label: "微信客服2" },
  { type: "wechat", id: "xiaozhang5029", image: "/weixin_xiaozhang5029.webp", label: "微信客服3" },
]

const qqContacts: ContactInfo[] = [
  { type: "qq", id: "2071006954", image: "/qq_2071006954.webp", label: "QQ客服1" },
  { type: "qq", id: "2275808937", image: "/qq_2275808937.webp", label: "QQ客服2" },
]

export default function ComputerRepair() {
  // 基于时间戳设置初始索引，实现自然分流
  const [wechatIndex, setWechatIndex] = useState(() => {
    // 获取当前时间戳并对联系人数量取模，得到一个0到联系人数量-1之间的值
    return Math.floor(Date.now() / 10000) % wechatContacts.length
  })
  
  const [qqIndex, setQqIndex] = useState(() => {
    // 对QQ联系人使用稍微不同的计算，避免与微信完全同步
    return Math.floor((Date.now() + 5000) / 10000) % qqContacts.length
  })
  
  const [copiedWechat, setCopiedWechat] = useState(false)
  const [copiedQQ, setCopiedQQ] = useState(false)
  const [wechatIntervalId, setWechatIntervalId] = useState<NodeJS.Timeout | null>(null)
  const [qqIntervalId, setQqIntervalId] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // 计算到下一个10秒时间点的毫秒数
    const now = Date.now()
    const nextInterval = 10000 - (now % 10000)
    
    // 首次延迟到下一个10秒时间点
    const initialTimeout = setTimeout(() => {
      // 更新索引
      setWechatIndex((prev) => (prev + 1) % wechatContacts.length)
      
      // 然后设置固定的10秒间隔
      const interval = setInterval(() => {
        setWechatIndex((prev) => (prev + 1) % wechatContacts.length)
      }, 10000)
      
      // 保存interval ID以便清理
      setWechatIntervalId(interval)
    }, nextInterval)
    
    return () => {
      clearTimeout(initialTimeout)
      if (wechatIntervalId) clearInterval(wechatIntervalId)
    }
  }, [])

  useEffect(() => {
    // 计算到下一个10秒时间点的毫秒数，但错开5秒
    const now = Date.now()
    const nextInterval = 10000 - ((now + 5000) % 10000)
    
    // 首次延迟到下一个时间点
    const initialTimeout = setTimeout(() => {
      // 更新索引
      setQqIndex((prev) => (prev + 1) % qqContacts.length)
      
      // 然后设置固定的10秒间隔
      const interval = setInterval(() => {
        setQqIndex((prev) => (prev + 1) % qqContacts.length)
      }, 10000)
      
      // 保存interval ID以便清理
      setQqIntervalId(interval)
    }, nextInterval)
    
    return () => {
      clearTimeout(initialTimeout)
      if (qqIntervalId) clearInterval(qqIntervalId)
    }
  }, [])

  const currentWechat = wechatContacts[wechatIndex]
  const currentQQ = qqContacts[qqIndex]

  const handleWechatCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentWechat.id)
      setCopiedWechat(true)
      setTimeout(() => setCopiedWechat(false), 2000)
    } catch (err) {
      console.error("复制失败:", err)
    }
  }

  const handleQQCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentQQ.id)
      setCopiedQQ(true)
      setTimeout(() => setCopiedQQ(false), 2000)
    } catch (err) {
      console.error("复制失败:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-3">
      <div className="w-full max-w-4xl">
        {/* 联系方式区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* 微信区域 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">微信咨询</h2>
            </div>

            <div className="text-center">
                <div className="w-full max-w-sm mx-auto mb-4">
                  <div className="aspect-square bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600">
                    <img
                      src={currentWechat.image || "/placeholder.svg"}
                      alt="微信二维码"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=300&width=300"
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={handleWechatCopy}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                    copiedWechat
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-2 border-green-200 dark:border-green-700"
                      : "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  }`}
                  disabled={copiedWechat}
                >
                  {copiedWechat ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>已复制到剪贴板</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{currentWechat.id}</span>
                    </>
                  )}
                </button>
              </div>
          </div>

          {/* QQ区域 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">QQ咨询</h2>
            </div>

            <div className="text-center">
                <div className="w-full max-w-sm mx-auto mb-4">
                  <div className="aspect-square bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600">
                    <img
                      src={currentQQ.image || "/placeholder.svg"}
                      alt="QQ二维码"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=300&width=300"
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={handleQQCopy}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                    copiedQQ
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-2 border-blue-200 dark:border-blue-700"
                      : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  }`}
                  disabled={copiedQQ}
                >
                  {copiedQQ ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>已复制到剪贴板</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{currentQQ.id}</span>
                    </>
                  )}
                </button>
              </div>
          </div>
        </div>

        {/* 服务提示区域 */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 text-sm">
                <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
                  <span className="text-base">💰</span>
                  <span className="font-medium">付费服务</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                  <span className="text-base">🖥️</span>
                  <span className="font-medium">远程诊断</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                  <span className="text-base">🔍</span>
                  <span className="font-medium">先诊断后报价</span>
                </div>
              </div>

              <a
                href="https://www.todesk.com/download.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                下载ToDesk
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
