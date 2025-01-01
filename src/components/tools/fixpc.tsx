'use client'

import { useState } from 'react'
import { 
  MdRefresh, MdSpeed, MdSportsEsports, MdWifi, MdBuild,
  MdApps, MdGamepad, MdStorage, MdBluetooth, MdLaptop,
  MdClose, MdMessage, MdMoreHoriz, MdPrint, MdInstallDesktop,
  MdQrCode2, MdContentCopy
} from 'react-icons/md'

const services = [
  { name: "重装系统", icon: MdRefresh },
  { name: "电脑加速", icon: MdSpeed },
  { name: "游戏优化", icon: MdSportsEsports },
  { name: "网络修复", icon: MdWifi },
  { name: "故障修复", icon: MdBuild },
  { name: "软件修复", icon: MdApps },
  { name: "游戏问题", icon: MdGamepad },
  { name: "驱动安装", icon: MdStorage },
  { name: "蓝牙问题", icon: MdBluetooth },
  { name: "新机开荒", icon: MdLaptop },
  { name: "C盘清理", icon: MdStorage },
  { name: "弹窗清除", icon: MdClose },
  { name: "浏览器修复", icon: MdApps },
  { name: "打印机修复", icon: MdPrint },
  { name: "软件安装", icon: MdInstallDesktop },
  { name: "其他服务", icon: MdMoreHoriz }
]

export default function PCRepairServices() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('xiaozhang1609')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          {/* Contact Info Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto mb-12">
            <div className="flex justify-center mb-6">
              <img 
                src="/wechat.webp" 
                alt="WeChat QR Code" 
                className="w-48 h-48 rounded-lg shadow-md"
              />
            </div>
            <div className="flex items-center justify-center gap-2 text-blue-600 mb-4">
              <MdQrCode2 className="w-5 h-5" />
              <span className="font-medium">扫码添加微信</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
              <MdMessage className="w-5 h-5" />
              <span className="font-medium">微信号：xiaozhang1609</span>
              <button
                onClick={handleCopy}
                className="ml-2 text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <MdContentCopy className="w-4 h-4" />
                {copied ? '已复制' : '复制'}
              </button>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <div 
                key={service.name}
                className="bg-white rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors duration-300 shadow-md hover:shadow-lg hover:bg-blue-50"
              >
                <IconComponent className="text-4xl mb-3 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-800">{service.name}</h2>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}


