'use client'

export default function PCRepairServices() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full">
            <div className="flex flex-col items-center gap-12">
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="w-full aspect-square">
                  <img 
                    src="/3.png" 
                    alt="WeChat QR Code" 
                    className="w-full h-full rounded-xl shadow-lg object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="w-full aspect-square">
                  <img 
                    src="/4.png" 
                    alt="Alipay QR Code" 
                    className="w-full h-full rounded-xl shadow-lg object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="w-full aspect-square">
                  <img 
                    src="/5.png" 
                    alt="QR Code" 
                    className="w-full h-full rounded-xl shadow-lg object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="w-full aspect-square">
                  <img 
                    src="/6.png" 
                    alt="QR Code" 
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


