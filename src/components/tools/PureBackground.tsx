import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Palette, Download, Monitor, FileType } from 'lucide-react';
import { toast } from 'react-toastify';

const presetColors = [
  { value: '#F7F8FA', name: '浅灰白' },
  { value: '#2ECC71', name: '翠绿' },
  { value: '#E74C3C', name: '朱红' },
  { value: '#F39C12', name: '金橙' },
  { value: '#9B59B6', name: '紫罗兰' },
  { value: '#1ABC9C', name: '青碧' },
  { value: '#34495E', name: '深青灰' },
  { value: '#7F8C8D', name: '石墨灰' }
];

const resolutions = [
  { value: '1920x1080', label: '1920×1080 (16:9)' },
  { value: '1280x720', label: '1280×720 (16:9)' },
  { value: '3840x2160', label: '3840×2160 (4K)' },
  { value: '1080x1920', label: '1080×1920 (9:16)' },
  { value: 'custom', label: '自定义尺寸' }
];

export default function PureBackground() {
  const { t } = useTranslation();
  const [color, setColor] = useState('#F7F8FA');
  const [resolution, setResolution] = useState('1920x1080');
  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');
  const [format, setFormat] = useState('png');

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    document.body.style.backgroundColor = newColor;
  };

  const generateImage = () => {
    let width: number, height: number;

    if (resolution === 'custom') {
      width = parseInt(customWidth, 10);
      height = parseInt(customHeight, 10);
      if (!width || !height) {
        toast.error(t('pleaseEnterValidSize'), {
          position: 'top-right',
          autoClose: 2000,
          theme: 'dark'
        });
        return;
      }
    } else {
      [width, height] = resolution.split('x').map(Number);
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, width, height);

      canvas.toBlob(blob => {
        if (blob) {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `background_${width}x${height}.${format}`;
          link.click();
          URL.revokeObjectURL(link.href);
        }
      }, `image/${format}`);
    }
  };

  // 组件卸载时清除背景色
  React.useEffect(() => {
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      <div className="card bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
          <div className="p-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 rounded-2xl">
            <Palette className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50">
              {t('pureBackground')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1.5 text-sm md:text-base">
              {t('pureBackgroundDesc')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
              <Palette className="w-5 h-5" />
              <h2 className="font-medium">{t('selectColor')}</h2>
            </div>
            <div className="space-y-4">
              <input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-full h-14 rounded-xl cursor-pointer"
              />
              <div>
                <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t('presetColors')}</h3>
                <div className="grid grid-cols-4 gap-2">
                  {presetColors.map((presetColor) => (
                    <button
                      key={presetColor.value}
                      onClick={() => handleColorChange(presetColor.value)}
                      className="group relative aspect-square rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      style={{ backgroundColor: presetColor.value }}
                      title={presetColor.name}
                    >
                      <span className="absolute inset-0 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white rounded-xl">
                        {presetColor.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
              <Monitor className="w-5 h-5" />
              <h2 className="font-medium">{t('selectResolution')}</h2>
            </div>
            <div className="space-y-4">
              <select
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
              >
                {resolutions.map((res) => (
                  <option key={res.value} value={res.value}>{res.label}</option>
                ))}
              </select>
              
              <div 
                className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300"
                style={{ backgroundColor: color }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="px-3 py-1.5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg text-xs text-gray-600 dark:text-gray-300 font-medium">
                    {resolution === 'custom' 
                      ? `${customWidth || '0'}×${customHeight || '0'}`
                      : resolution.replace('x', '×')}
                  </div>
                </div>
              </div>
            </div>
            
            {resolution === 'custom' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {t('width')}
                  </label>
                  <input
                    type="number"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                    placeholder="1920"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {t('height')}
                  </label>
                  <input
                    type="number"
                    value={customHeight}
                    onChange={(e) => setCustomHeight(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                    placeholder="1080"
                  />
                </div>
              </div>
            )}
          </section>
        </div>

        <section className="mb-8">
          <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 mb-4">
            <FileType className="w-5 h-5" />
            <h2 className="font-medium">{t('selectFormat')}</h2>
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

        <button
          onClick={generateImage}
          className="w-full h-12 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium rounded-xl transition-all duration-200"
        >
          <Download className="w-5 h-5" />
          {t('generateAndDownload')}
        </button>
      </div>
    </div>
  );
}
