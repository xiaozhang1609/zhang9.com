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
  { type: "wechat", id: "xiaozhang1609", image: "/weixin_xiaozhang1609.webp", label: "微信客服1-九" },
  //{ type: "wechat", id: "xiaozhang4096", image: "/weixin_xiaozhang4096.webp", label: "微信客服2-章" },
  { type: "wechat", id: "xiaozhang5029", image: "/weixin_xiaozhang5029.webp", label: "微信客服3-五" },
  //{ type: "wechat", id: "xiaozhang8192", image: "/weixin_xiaozhang8192.webp", label: "微信客服4-二" },
  { type: "wechat", id: "ZYD-xiaoyudian-0909", image: "/weixin_ZYD-xiaoyudian-0909.webp", label: "wangyan-六" },
  { type: "wechat", id: "WY-Yanzi-0909", image: "/weixin_WY-Yanzi-0909.webp", label: "wangyan2-锤" },
  { type: "wechat", id: "zb15349507383", image: "/weixin_zb15349507383.webp", label: "zhangb-四" },
  { type: "wechat", id: "zb---qq238349", image: "/weixin_zb---qq238349.webp", label: "zhangb2-兵" },
  //{ type: "wechat", id: "dabing9999", image: "/weixin_dabing9999.webp", label: "dabing" },
  { type: "wechat", id: "QZY786786", image: "/weixin_QZY786786.webp", label: "jie1" },
  //{ type: "wechat", id: "TXZ77886", image: "/weixin_TXZ77886.webp", label: "jie2" },
  //{ type: "wechat", id: "git_david", image: "/weixin_git_david.webp", label: "david" },
]

const qqContacts: ContactInfo[] = [
  { type: "qq", id: "2071006954", image: "/qq_2071006954.webp", label: "QQ客服1" },
  //{ type: "qq", id: "2275808937", image: "/qq_2275808937.webp", label: "QQ客服2" },
  { type: "qq", id: "3187903391", image: "/qq_3187903391.webp", label: "wangyan" },
  { type: "qq", id: "1079455150", image: "/qq_1079455150.webp", label: "zhangb" },
  { type: "qq", id: "429196871", image: "/qq_429196871.webp", label: "jie1" },
]

export default function ComputerRepair() {
  // 随机设置初始索引，每次刷新页面时随机显示
  const [wechatIndex, setWechatIndex] = useState(() => {
    // 随机生成一个0到联系人数量-1之间的值
    return Math.floor(Math.random() * wechatContacts.length)
  })
  
  const [qqIndex, setQqIndex] = useState(() => {
    // 随机生成一个0到联系人数量-1之间的值
    return Math.floor(Math.random() * qqContacts.length)
  })
  
  const [copiedWechat, setCopiedWechat] = useState(false)
  const [copiedQQ, setCopiedQQ] = useState(false)

  // 移除了轮询逻辑，每次刷新页面时随机显示二维码

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
