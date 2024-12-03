import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Upload, AlertCircle, FileType } from 'lucide-react';
import JSZip from 'jszip';

export default function ImageConverter() {
  const { t } = useTranslation();
  const [images, setImages] = useState<File[]>([]);
  const [format, setFormat] = useState('png');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [uploadCount, setUploadCount] = useState(0);

  const handleImageUpload = useCallback((files: FileList) => {
    const validImages = Array.from(files).filter(file => file.type.startsWith('image/'));
    const totalSize = validImages.reduce((sum, file) => sum + file.size, 0);
    
    if (totalSize > 50 * 1024 * 1024) {
      setError('总文件大小不能超过 50MB');
      return;
    }
    
    setError(validImages.length === 0 ? '请上传图片文件' : null);
    setImages(validImages);
    setUploadCount(validImages.length);
  }, []);

  const convertImages = useCallback(async () => {
    if (images.length === 0 || !canvasRef.current) return;

    setIsLoading(true);
    setProgress(0);
    const zip = new JSZip();

    try {
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const img = new window.Image();
        img.src = URL.createObjectURL(image);
        await new Promise<void>((resolve, reject) => {
          img.onload = () => {
            const canvas = canvasRef.current!;
            const ctx = canvas.getContext('2d')!;
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            canvas.toBlob((blob) => {
              if (blob) {
                zip.file(`${image.name.split('.')[0]}.${format}`, blob);
                setProgress(Math.round(((i + 1) / images.length) * 100));
                resolve();
              } else {
                reject('图片转换失败');
              }
            }, `image/${format}`);
          };
          img.onerror = () => reject('图片加载失败');
        });
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = '转换后的图片.zip';
      link.click();
    } catch (err) {
      setError(typeof err === 'string' ? err : '转换过程中出现错误');
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  }, [images, format]);

  const handleFileInputClick = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) handleImageUpload(files);
    };
    input.click();
  }, [handleImageUpload]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      <div className="card bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
          <div className="p-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 rounded-2xl">
            <FileType className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50">
              图片格式转换
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1.5 text-sm md:text-base">
              支持批量转换图片格式，可同时转换多张图片
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div
            className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleImageUpload(e.dataTransfer.files);
            }}
            onClick={handleFileInputClick}
          >
            <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" />
            <p className="text-gray-600 dark:text-gray-400">
              点击或拖拽上传图片<br />
              <span className="text-sm text-gray-500">支持批量上传，单次最大 50MB</span>
            </p>
          </div>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
              <FileType className="w-5 h-5" />
              <h2 className="font-medium">选择输出格式</h2>
            </div>
            <div className="flex gap-6">
              {['png', 'jpeg', 'webp'].map((fmt) => (
                <label key={fmt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    value={fmt}
                    checked={format === fmt}
                    onChange={(e) => setFormat(e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="uppercase text-gray-700 dark:text-gray-300">{fmt}</span>
                </label>
              ))}
            </div>
          </section>

          {uploadCount > 0 && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <p className="text-gray-600 dark:text-gray-400">
                已选择 {uploadCount} 张图片
              </p>
            </div>
          )}

          {isLoading && progress > 0 && (
            <div className="space-y-2">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                正在转换: {progress}%
              </p>
            </div>
          )}

          <button
            onClick={convertImages}
            disabled={images.length === 0 || isLoading}
            className="w-full h-12 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="loader" aria-hidden="true" />
            ) : (
              <Download className="w-5 h-5" />
            )}
            {isLoading ? '正在转换...' : '开始转换'}
          </button>

          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}