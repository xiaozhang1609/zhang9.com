'use client'
import { useState, useEffect } from 'react'

const qrCodeGroups = [
  {
    weixin: '/weixin1.png',
    zhifubao: '/zhifubao1.png'
  },
  {
    weixin: '/weixin2.png',
    zhifubao: '/zhifubao2.png'
  }
];

export default function PCRepairServices() {
  const [selectedGroup, setSelectedGroup] = useState(qrCodeGroups[0]);

  useEffect(() => {
    const randomGroup = qrCodeGroups[Math.floor(Math.random() * qrCodeGroups.length)];
    setSelectedGroup(randomGroup);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <div className="bg-white rounded-2xl shadow-lg p-12 w-fit">
            <div className="flex flex-col items-center gap-12">
              <div className="flex justify-center items-center gap-16">
                <div className="w-80 aspect-[4/5]">
                  <img 
                    src={selectedGroup.weixin}
                    alt="WeChat QR Code" 
                    className="w-full h-full rounded-xl shadow-lg object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="w-80 aspect-[4/5]">
                  <img 
                    src={selectedGroup.zhifubao}
                    alt="Alipay QR Code" 
                    className="w-full h-full rounded-xl shadow-lg object-cover transition-transform hover:scale-105"
                  />
                </div>
              </div>
              <p className="text-2xl text-gray-700 font-medium tracking-wide">
                感谢您的信任与支持！
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


