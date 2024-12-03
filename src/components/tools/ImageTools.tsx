import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Download, Upload, FileType } from 'lucide-react';
import JSZip from 'jszip';

interface ImageState {
  file: File | null;
  preview: string | null;
}

const validateDimensions = (value: number) => value > 0 && value <= 10; // Limit max split count to 10

export default function ImageTools() {
  const { t } = useTranslation();
  const [image, setImage] = useState<ImageState>({ file: null, preview: null });
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
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
      setError(t('invalidFileType'));
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError(t('fileTooLarge'));
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
  }, [t]);

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
            canvas.toBlob((blob) => resolve(blob!))
          );
          zip.file(`part_${i + 1}_${j + 1}.png`, blob);
        }
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = 'split_images.zip';
      link.click();
    } catch (error) {
      console.error('Error splitting image:', error);
      setError(t('splitError'));
    } finally {
      setIsProcessing(false);
    }
  }, [cols, rows, image, t]);

  // Update preview whenever image, rows, or cols change
  useEffect(() => {
    if (image.preview) {
      const img = new Image();
      img.onload = () => updatePreview(img);
      img.src = image.preview;
    }
  }, [image, updatePreview]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      <div className="card p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
          <div className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-2xl">
            <Grid className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50">
              {t('imageTools')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1.5 text-sm md:text-base">
              {t('imageToolsDesc')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Control Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 space-y-6">
              {/* Rows and Columns Input */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2.5">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('rows')}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={rows}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (validateDimensions(value)) setRows(value);
                    }}
                    className="input ring-offset-white dark:ring-offset-gray-900 h-11"
                  />
                </div>
                <div className="space-y-2.5">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('columns')}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={cols}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (validateDimensions(value)) setCols(value);
                    }}
                    className="input ring-offset-white dark:ring-offset-gray-900 h-11"
                  />
                </div>
              </div>
              
              {/* Format Selection */}
              <section className="mb-8">
                <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 mb-4">
                  <FileType className="w-5 h-5" />
                  <h2 className="font-medium">{t('selectFormat')}</h2>
                </div>
                <div className="flex gap-4">
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
            </div>
            
            {/* Action Button */}
            <button
              onClick={splitImage}
              disabled={isProcessing || !image.preview}
              className="w-full h-12 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50"
            >
              <Download className="w-5 h-5" />
              {isProcessing ? t('processing') : t('splitAndDownload')}
            </button>
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-2">
            {!image.preview ? (
              <div className="upload-area">
                <div
                  className="relative w-full mb-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
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
                  }}
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('dragAndDrop')}
                  </p>
                </div>
              </div>
            ) : (
              <div className="preview-area">
                <div className="relative w-full rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <canvas ref={previewCanvasRef} className="w-full h-auto" />
                </div>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
            {error}
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}