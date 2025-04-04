'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { WechatOutlined, AlipayCircleOutlined } from '@ant-design/icons'
import debounce from 'lodash/debounce'

const paymentMethods = [
  { id: 'wechat', name: '微信支付', images: ['/weixin1.webp', '/weixin2.webp'], icon: <WechatOutlined className="text-2xl text-[#07C160]" /> },
  { id: 'alipay', name: '支付宝', images: ['/zhifubao1.webp', '/zhifubao2.webp'], icon: <AlipayCircleOutlined className="text-2xl text-[#1677FF]" /> }
]

export default function PaymentQRCode() {
  const [currentIndex, setCurrentIndex] = useState(0)
const [imageIndex, setImageIndex] = useState(() => Math.floor(Math.random() * 2))
const [imageError, setImageError] = useState(false)
const [isTransitioning, setIsTransitioning] = useState(false)

  // 切换到另一张图片
  const getNextImageIndex = useCallback((methodIndex: number, currentImageIndex: number) => {
    return (currentImageIndex + 1) % paymentMethods[methodIndex].images.length
  }, [])

  // 优化防抖时间和切换逻辑
  const debouncedPaymentChange = useCallback(
    debounce((index: number) => {
      if (isTransitioning) return
      setIsTransitioning(true)
      setCurrentIndex(index)
      setImageIndex(prevIndex => getNextImageIndex(index, prevIndex))
      setImageError(false)
      setTimeout(() => setIsTransitioning(false), 400)
    }, 150),
    [getNextImageIndex, isTransitioning]
  )

  // 预加载图片
  useEffect(() => {
    paymentMethods.forEach(method => {
      method.images.forEach(imageSrc => {
        const img = new Image()
        img.src = imageSrc
      })
    })
  }, [])

  // 自动轮询切换二维码
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true)
        setImageIndex(prevIndex => getNextImageIndex(currentIndex, prevIndex))
        setImageError(false)
        setTimeout(() => setIsTransitioning(false), 400)
      }
    }, 10000)

    return () => {
      clearInterval(timer)
    }
  }, [currentIndex, isTransitioning, getNextImageIndex])

  // 组件卸载时清理防抖函数
  useEffect(() => {
    return () => {
      debouncedPaymentChange.cancel()
    }
  }, [debouncedPaymentChange])

  const handlePaymentChange = (index: number) => {
    debouncedPaymentChange(index)
  }

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50
    if (Math.abs(info.offset.x) > swipeThreshold) {
      if (info.offset.x > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      } else if (info.offset.x < 0 && currentIndex < paymentMethods.length - 1) {
        setCurrentIndex(currentIndex + 1)
      }
    }
  }

  return (
    <div className="min-h-screen h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-3xl px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full">
          <div className="flex flex-col items-center gap-6">
            {/* Payment Method Selector */}
            <div className="flex w-full border-b border-gray-200 relative p-2">
              {paymentMethods.map((method, index) => (
                <button
                  key={method.id}
                  onClick={() => handlePaymentChange(index)}
                  className={`flex-1 py-3 px-4 flex flex-col items-center gap-2 rounded-lg transition-all ${currentIndex === index ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                >
                  {method.icon}
                  <span className={`text-sm font-medium ${currentIndex === index ? 'text-blue-500' : 'text-gray-600'}`}>
                    {method.name}
                  </span>
                  {currentIndex === index && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-t-full"
                      layoutId="underline"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* QR Code Display */}
            <div className="w-full aspect-square max-w-[500px] relative overflow-hidden bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100">
              <AnimatePresence mode="wait">
                <>
                {!imageError ? (
                  <motion.img
                    key={currentIndex}
                    src={paymentMethods[currentIndex].images[imageIndex]}
                    alt={paymentMethods[currentIndex].name}
                    className="w-full h-full object-contain"
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.3 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <p className="text-gray-500">二维码加载失败，请刷新页面重试</p>
                  </div>
                )}
                </>
              </AnimatePresence>
            </div>

            <p className="text-lg text-gray-700 font-medium mt-4 text-center">
              {`请使用${paymentMethods[currentIndex].name}扫码支付`}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


