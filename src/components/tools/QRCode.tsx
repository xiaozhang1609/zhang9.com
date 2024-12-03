import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, Download, Upload, Scan, Copy } from 'lucide-react';
import { toast } from 'react-toastify';
import jsQR from 'jsqr';

interface ScanResult {
  text: string;
  error?: string;
}

export default function QRCode() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [copyMessage, setCopyMessage] = useState('');
  const qrRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Existing download function
  const downloadQRCode = () => {
    if (!qrRef.current) return;
    
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = 256;
      canvas.height = 256;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = 'qrcode.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  // New scanning function
  const handleScan = async (file: File) => {
    setIsScanning(true);
    setScanResult(null);
    setPreviewUrl(URL.createObjectURL(file));

    try {
      const image = new Image();
      const imageUrl = URL.createObjectURL(file);
      
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
        image.src = imageUrl;
      });

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = image.width;
      canvas.height = image.height;
      ctx?.drawImage(image, 0, 0);

      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      if (!imageData) throw new Error('图片加载失败');

      const code = jsQR(imageData.data, imageData.width, imageData.height);
      
      if (code) {
        setScanResult({ text: code.data });
      } else {
        setScanResult({ text: '', error: '未找到二维码' });
      }
    } catch (error) {
      setScanResult({ text: '', error: '扫描出错' });
    } finally {
      setIsScanning(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast('复制成功', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'bg-gray-800 text-white',
      });
    });
  };

  const renderCopyButton = (text: string) => (
    <div className="relative inline-block">
      <button 
        onClick={() => copyToClipboard(text)} 
        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
      >
        <Copy className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 rounded-2xl mb-4">
          <QrCode className="w-8 h-8 text-purple-600 dark:text-purple-400" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50">
          二维码扫描/生成
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          扫描已有二维码或生成新的二维码
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 扫描二维码部分 */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Scan className="w-5 h-5" />
            扫描二维码
          </h2>
          <div className="space-y-6">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 text-lg flex items-center justify-center gap-2"
            >
              <Upload className="w-5 h-5" />
              上传二维码图片
            </button>

            <div className="flex flex-col items-center justify-center">
              {previewUrl ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg dark:shadow-gray-900/30 mb-4">
                  <img 
                    src={previewUrl} 
                    alt="二维码预览" 
                    className="max-w-full h-auto"
                    style={{ maxHeight: '256px' }}
                  />
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8 flex items-center justify-center mb-4" style={{ width: '256px', height: '256px' }}>
                  <Upload className="w-12 h-12 text-gray-400" />
                </div>
              )}

              {scanResult && (
                <div className="w-full">
                  <div className={`p-4 rounded-xl mb-2 ${
                    scanResult.error 
                      ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      : 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                  }`}>
                    {scanResult.error || '扫描成功'}
                  </div>
                  {!scanResult.error && (
                    <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                      <span className="truncate">{scanResult.text}</span>
                      {renderCopyButton(scanResult.text)}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 生成二维码部分 */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            生成二维码
          </h2>
          <div className="space-y-6">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="请输入文本或网址"
              className="w-full p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 text-lg"
            />

            <div className="flex flex-col items-center justify-center">
              <div ref={qrRef} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg dark:shadow-gray-900/30 mb-4">
                <QRCodeSVG
                  value={text || ' '}
                  size={256}
                  level="H"
                  includeMargin
                />
              </div>
              <button
                onClick={downloadQRCode}
                disabled={!text}
                className="w-full p-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                下载二维码
              </button>
            </div>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleScan(file);
        }}
      />
    </div>
  );
}
