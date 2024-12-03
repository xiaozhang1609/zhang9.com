import React, { useState, useRef, useCallback } from 'react';
import { Image, Upload, Download, AlertCircle, X } from 'lucide-react';
import JSZip from 'jszip';

interface CompressOptions {
  format: 'jpeg' | 'png' | 'webp';
  compressionLevel: 'low' | 'medium' | 'high' | 'ultra';
}

interface ImageFile {
  file: File;
  preview: string;
  compressed?: {
    blob: Blob;
    ratio: number;
  };
}

export default function ImageCompress() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [options, setOptions] = useState<CompressOptions>({
    format: 'jpeg',
    compressionLevel: 'medium'
  });

  const handleImageUpload = useCallback((files: FileList) => {
    const validImages = Array.from(files)
      .filter(file => file.type.startsWith('image/'))
      .map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));

    if (validImages.reduce((sum, { file }) => sum + file.size, 0) > 50 * 1024 * 1024) {
      setError('总文件大小不能超过 50MB');
      return;
    }

    setError(null);
    setImages(prev => [...prev, ...validImages]);
  }, []);

  const compressImage = useCallback(async (image: ImageFile): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.src = image.preview;
      
      img.onload = () => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;

        const { scale, quality } = {
          low: { scale: 1, quality: 0.8 },
          medium: { scale: 0.8, quality: 0.6 },
          high: { scale: 0.6, quality: 0.4 },
          ultra: { scale: 0.4, quality: 0.2 }
        }[options.compressionLevel];

        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => blob ? resolve(blob) : reject('压缩失败'),
          `image/${options.format}`,
          quality
        );
      };
      img.onerror = () => reject('图片加载失败');
    });
  }, [options]);

  const handleCompress = useCallback(async () => {
    if (images.length === 0) return;
    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      const compressedImages = [];
      for (let i = 0; i < images.length; i++) {
        const compressed = await compressImage(images[i]);
        compressedImages.push({
          ...images[i],
          compressed: {
            blob: compressed,
            ratio: Math.round((compressed.size / images[i].file.size) * 100)
          }
        });
        setProgress(Math.round(((i + 1) / images.length) * 100));
      }
      setImages(compressedImages);
    } catch (err) {
      setError(typeof err === 'string' ? err : '压缩过程中出现错误');
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  }, [images, compressImage]);

  const removeImage = useCallback((index: number) => {
    setImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(prev[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  }, []);

  const handleDownloadZip = useCallback(async () => {
    const compressedImages = images.filter(img => img.compressed);
    if (compressedImages.length === 0) return;

    const zip = new JSZip();
    compressedImages.forEach((image, index) => {
      zip.file(`compressed_${index + 1}.${options.format}`, image.compressed!.blob);
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = `压缩后的图片.zip`;
    link.click();
  }, [images, options.format]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      <div className="card p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
          <div className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-2xl">
            <Image className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50">
              图片压缩工具
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1.5 text-sm md:text-base">
              支持批量压缩图片，可自定义压缩参数
            </p>
          </div>
        </div>

        <div className="mb-6 space-y-4">
          <div>
            <label className="block text-sm mb-2">压缩级别</label>
            <div className="grid grid-cols-4 gap-2">
              {['low', 'medium', 'high', 'ultra'].map(level => (
                <button
                  key={level}
                  onClick={() => setOptions(prev => ({
                    ...prev,
                    compressionLevel: level as CompressOptions['compressionLevel']
                  }))}
                  className={`p-2 rounded-lg text-sm ${
                    options.compressionLevel === level
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  {{
                    low: '轻度压缩',
                    medium: '中度压缩',
                    high: '高度压缩',
                    ultra: '极限压缩'
                  }[level]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm mb-2">输出格式</label>
            <div className="flex gap-4">
              {['jpeg', 'png', 'webp'].map(fmt => (
                <label key={fmt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="format"
                    value={fmt}
                    checked={options.format === fmt}
                    onChange={(e) => setOptions(prev => ({
                      ...prev,
                      format: e.target.value as CompressOptions['format']
                    }))}
                    className="text-blue-600"
                  />
                  <span className="uppercase text-sm">{fmt}</span>
                </label>
              ))}
            </div>
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
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.multiple = true;
              input.onchange = (e) => {
                const files = (e.target as HTMLInputElement).files;
                if (files) handleImageUpload(files);
              };
              input.click();
            }}
          >
            <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400">
              点击或拖拽上传图片<br />
              <span className="text-sm text-gray-500">支持批量上传，单次最大 50MB</span>
            </p>
          </div>

          {images.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">已上传 {images.length} 张图片</h2>
                <button
                  onClick={() => setImages([])}
                  className="text-sm text-red-500 hover:text-red-600"
                >
                  清空
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <img
                      src={image.preview}
                      alt={image.file.name}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                    <div className="text-sm text-gray-500 mb-2 truncate">
                      {image.file.name}
                    </div>
                    <div className="text-sm">
                      原始大小：{(image.file.size / 1024).toFixed(1)}KB
                      {image.compressed && (
                        <>
                          <br />
                          压缩后：{(image.compressed.blob.size / 1024).toFixed(1)}KB
                          <br />
                          压缩率：{image.compressed.ratio}%
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {isProcessing && progress > 0 && (
                <div className="mt-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    正在压缩: {progress}%
                  </p>
                </div>
              )}

              <div className="flex gap-4 items-center">
                <button
                  onClick={handleCompress}
                  disabled={isProcessing}
                  className="flex-1 h-12 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-xl disabled:opacity-50 transition-all"
                >
                  <Download className="w-5 h-5" />
                  {isProcessing ? '压缩中...' : '开始压缩'}
                </button>
                {images.length > 1 && images.some(img => img.compressed) && (
                  <button
                    onClick={handleDownloadZip}
                    disabled={isProcessing}
                    className="h-12 px-6 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl disabled:opacity-50 transition-all"
                  >
                    <Download className="w-5 h-5" />
                    打包下载
                  </button>
                )}
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mt-4">
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