import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Download, Upload, FileType } from 'lucide-react';
import JSZip from 'jszip';

interface ImageState {
  file: File | null;
  preview: string | null;
}

interface Preset {
  id: string;
  name: string;
  rows: number;
  cols: number;
  description: string;
}

const presets: Preset[] = [
  { id: '2x2', name: '2x2', rows: 2, cols: 2, description: '4份' },
  { id: '3x3', name: '3x3', rows: 3, cols: 3, description: '9份' },
  { id: '4x4', name: '4x4', rows: 4, cols: 4, description: '16份' },
];

const validateDimensions = (value: number) => value > 0 && value <= 10;

export default function ImageSplit() {
  const { t } = useTranslation();
  const [image, setImage] = useState<ImageState>({ file: null, preview: null });
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [isProcessing, setIsProcessing] = useState(false);
  const [format, setFormat] = useState('png');
  const [gridColor, setGridColor] = useState('rgba(255, 255, 255, 0.5)');
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const updatePreview = useCallback((img: HTMLImageElement) => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size while maintaining aspect ratio
    const maxWidth = 800;
    const scale = Math.min(1, maxWidth / img.width);
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate each split area size
    const cellWidth = canvas.width / cols;
    const cellHeight = canvas.height / rows;

    // Draw each split area
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const sx = (j * img.width) / cols;
        const sy = (i * img.height) / rows;
        const sWidth = img.width / cols;
        const sHeight = img.height / rows;
        const dx = j * cellWidth;
        const dy = i * cellHeight;

        ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, cellWidth, cellHeight);

        // Draw grid lines
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(dx, dy, cellWidth, cellHeight);

        // Add numbering
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = `${14 * scale}px sans-serif`;
        ctx.fillText(`${i + 1}-${j + 1}`, dx + 5, dy + 20 * scale);
      }
    }
  }, [cols, rows, gridColor]);

  const handleImageUpload = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('请上传图片文件');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('图片大小不能超过 10MB');
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setImage({ file, preview: img.src });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const splitImage = useCallback(async () => {
    if (!image.file || !canvasRef.current) return;

    setIsProcessing(true);
    try {
      setError(null);
      const img = new Image();
      img.src = image.preview!;
      await new Promise((resolve) => { img.onload = resolve; });

      const width = img.width / cols;
      const height = img.height / rows;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d')!;
      const zip = new JSZip();

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, j * width, i * height, width, height, 0, 0, width, height);
          const blob = await new Promise<Blob>((resolve) =>
            canvas.toBlob((blob) => resolve(blob!), `image/${format}`)
          );
          zip.file(`part_${i + 1}_${j + 1}.${format}`, blob);
        }
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = 'split_images.zip';
      link.click();
    } catch (error) {
      console.error('Error splitting image:', error);
      setError('图片分割失败，请重试');
    } finally {
      setIsProcessing(false);
    }
  }, [cols, rows, image, format]);

  useEffect(() => {
    if (image.preview) {
      const img = new Image();
      img.onload = () => updatePreview(img);
      img.src = image.preview;
    }
  }, [image, updatePreview]);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
      {/* 标题区域 */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Grid className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            图片分割
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* 左侧控制面板 */}
        <div className="lg:col-span-2 space-y-4">
          {/* 预设选择 */}
          <div className="card p-6">
            <h3 className="text-base font-medium mb-3">预设</h3>
            <div className="grid grid-cols-3 gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    setRows(preset.rows);
                    setCols(preset.cols);
                  }}
                  className="aspect-square flex flex-col items-center justify-center p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="font-medium">{preset.name}</div>
                  <div className="text-xs text-gray-500 mt-1 text-center">
                    {preset.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 自定义设置 */}
          <div className="card p-6 space-y-4">
            <h3 className="text-base font-medium">自定义</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">行数</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={rows}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (validateDimensions(value)) setRows(value);
                  }}
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">列数</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={cols}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (validateDimensions(value)) setCols(value);
                  }}
                  className="input w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">格式</label>
              <div className="flex gap-4">
                {['png', 'jpeg', 'webp'].map((fmt) => (
                  <label key={fmt} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="format"
                      value={fmt}
                      checked={format === fmt}
                      onChange={(e) => setFormat(e.target.value)}
                      className="text-blue-600"
                    />
                    <span className="uppercase text-sm">{fmt}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={splitImage}
              disabled={isProcessing || !image.preview}
              className="w-full h-11 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-lg disabled:opacity-50 transition-all"
            >
              <Download className="w-5 h-5" />
              {isProcessing ? '处理中' : '下载'}
            </button>
          </div>
        </div>

        {/* 右侧预览区域 */}
        <div className="lg:col-span-3">
          <div className="card p-6">
            {!image.preview ? (
              <div className="aspect-[4/3] flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file && file.type.startsWith('image/')) handleImageUpload(file);
                }}
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) handleImageUpload(file);
                  };
                  input.click();
                }}>
                <div className="text-center">
                  <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" />
                  <p className="text-gray-600 dark:text-gray-400">
                    点击或拖拽上传<br />
                    <span className="text-sm text-gray-500">最大 10MB</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                <canvas ref={previewCanvasRef} className="w-full h-auto" />
              </div>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}