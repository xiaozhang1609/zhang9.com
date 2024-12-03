import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { LayoutGrid, Download, RefreshCcw, Monitor } from 'lucide-react';

// Types
type Layout = {
  x: number;
  y: number;
  width: number;
  height: number;
};

// Constants
const layouts = {
  even4: [
    { x: 0, y: 0, width: 0.5, height: 0.5 },
    { x: 0.5, y: 0, width: 0.5, height: 0.5 },
    { x: 0, y: 0.5, width: 0.5, height: 0.5 },
    { x: 0.5, y: 0.5, width: 0.5, height: 0.5 }
  ],
  vertical3: [
    { x: 0, y: 0, width: 0.33, height: 1 },
    { x: 0.33, y: 0, width: 0.34, height: 1 },
    { x: 0.67, y: 0, width: 0.33, height: 1 }
  ],
  vertical4: [
    { x: 0, y: 0, width: 0.25, height: 1 },
    { x: 0.25, y: 0, width: 0.25, height: 1 },
    { x: 0.5, y: 0, width: 0.25, height: 1 },
    { x: 0.75, y: 0, width: 0.25, height: 1 }
  ]
} as const;

const resolutions = [
  { value: '1920x1080', label: '1920x1080 (16:9)' },
  { value: '2560x1440', label: '2560x1440 (16:9)' },
  { value: '3840x2160', label: '3840x2160 (4K)' },
] as const;

const presetColors = [
  '#F7F8FA', '#2ECC71', '#E74C3C', '#F39C12', 
  '#9B59B6', '#1ABC9C', '#34495E', '#7F8C8D'
];

const layoutPresets = {
  even4: {
    classic: ['#2C3E50', '#E74C3C', '#ECF0F1', '#3498DB'],
    nature: ['#27AE60', '#2ECC71', '#F1C40F', '#E67E22'],
    modern: ['#34495E', '#9B59B6', '#1ABC9C', '#F39C12']
  },
  vertical3: {
    classic: ['#2C3E50', '#E74C3C', '#3498DB'],
    nature: ['#27AE60', '#2ECC71', '#F1C40F'],
    modern: ['#34495E', '#9B59B6', '#1ABC9C']
  },
  vertical4: {
    classic: ['#2C3E50', '#E74C3C', '#3498DB', '#ECF0F1'],
    nature: ['#27AE60', '#2ECC71', '#F1C40F', '#E67E22'],
    modern: ['#34495E', '#9B59B6', '#1ABC9C', '#F39C12']
  }
} as const;

const layoutOptions = [
  { id: 'even4', label: '2x2', icon: layouts.even4 },
  { id: 'vertical3', label: '1x3', icon: layouts.vertical3 },
  { id: 'vertical4', label: '1x4', icon: layouts.vertical4 },
] as const;

export default function QuadWallpaper() {
  const { t } = useTranslation();
  const [layout, setLayout] = useState<keyof typeof layouts>('even4');
  const [resolution, setResolution] = useState<typeof resolutions[number]['value']>('1920x1080');
  const [colors, setColors] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getRandomColor = useCallback(() => (
    '#' + Array.from({ length: 6 }, () => '0123456789ABCDEF'[Math.floor(Math.random() * 16)]).join('')
  ), []);

  const refreshColors = useCallback(() => {
    setColors(layouts[layout].map(() => getRandomColor()));
  }, [layout, getRandomColor]);

  const handleColorChange = (index: number, color: string) => {
    setColors(prev => Object.assign([...prev], { [index]: color }));
  };

  const drawWallpaper = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const [width, height] = resolution.split('x').map(Number);
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    layouts[layout].forEach((rect, index) => {
      ctx.fillStyle = colors[index] || getRandomColor();
      ctx.fillRect(
        rect.x * width,
        rect.y * height,
        rect.width * width,
        rect.height * height
      );
    });
  }, [colors, layout, resolution, getRandomColor]);

  const downloadWallpaper = useCallback(() => {
    if (!canvasRef.current) return;
    drawWallpaper();
    const link = document.createElement('a');
    link.download = `wallpaper_${resolution}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  }, [drawWallpaper, resolution]);

  React.useEffect(() => {
    refreshColors();
  }, [layout, refreshColors]);

  React.useEffect(() => {
    drawWallpaper();
  }, [colors, layout, resolution, drawWallpaper]);

  const renderLayoutPreview = (layoutId: keyof typeof layouts, presetName: string) => (
    <div className={`w-full h-full ${
      layoutId === 'vertical3' ? 'grid grid-cols-3' :
      layoutId === 'vertical4' ? 'grid grid-cols-4' :
      'grid grid-cols-2 grid-rows-2'
    }`}>
      {layoutPresets[layoutId][presetName].map((color, idx) => (
        <div
          key={idx}
          className="w-full h-full"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl blur-xl transition-all duration-300 group-hover:scale-110" />
          <div className="relative p-3 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 rounded-xl">
            <LayoutGrid className="w-6 h-6 text-indigo-600 dark:text-indigo-400 transition-transform duration-300 group-hover:rotate-12" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t('quadWallpaper')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('quadWallpaperDesc')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
        {/* Control Panel */}
        <div className="lg:col-span-1 h-full">
          <div className="card p-6 space-y-10 h-full">
            {/* Layout Selection */}
            <div className="space-y-8">
              {layoutOptions.map((option) => (
                <div key={option.id} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-lg">
                      <LayoutGrid className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="text-lg font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {option.label}
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {['classic', 'nature', 'modern'].map((presetName) => (
                      <button
                        key={presetName}
                        onClick={() => {
                          setLayout(option.id);
                          setColors(layoutPresets[option.id][presetName]);
                        }}
                        className={`group relative border border-gray-200 dark:border-gray-700 
                          hover:border-blue-500 transition-colors ${
                          layout === option.id ? 'border-blue-500' : ''
                        }`}
                        style={{ aspectRatio: '16/9' }}
                      >
                        {renderLayoutPreview(option.id, presetName)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Resolution Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Monitor className="w-6 h-6 text-gray-500" />
                <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  {t('resolution')}
                </h2>
              </div>
              <select
                value={resolution}
                onChange={(e) => setResolution(e.target.value as typeof resolution)}
                className="w-full p-3 text-base rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                {resolutions.map((res) => (
                  <option key={res.value} value={res.value}>
                    {res.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
              <button 
                onClick={refreshColors} 
                className="btn-secondary h-12 text-base gap-3 group"
              >
                <RefreshCcw className="w-6 h-6 transition-transform duration-300 group-hover:rotate-180" />
                <span>{t('refreshColors')}</span>
              </button>
              <button 
                onClick={downloadWallpaper} 
                className="btn-primary h-12 text-base gap-3 group"
              >
                <Download className="w-6 h-6 transition-transform duration-300 group-hover:translate-y-1" />
                <span>{t('downloadWallpaper')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Preview and Color Palette */}
        <div className="lg:col-span-2 space-y-8 h-full flex flex-col">
          {/* Preview */}
          <div className="card p-6 flex-grow">
            <div
              className="relative w-full h-full overflow-hidden rounded-xl shadow-sm bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"
              style={{ 
                paddingBottom: `${(parseInt(resolution.split('x')[1]) / parseInt(resolution.split('x')[0])) * 100}%`
              }}
            >
              {layouts[layout].map((rect, index) => (
                <div
                  key={index}
                  className="absolute transition-all duration-300 hover:shadow-lg"
                  style={{
                    left: `${rect.x * 100}%`,
                    top: `${rect.y * 100}%`,
                    width: `${rect.width * 100}%`,
                    height: `${rect.height * 100}%`,
                    backgroundColor: colors[index] || '#000000'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Color Palette */}
          <div className="card p-6">
            <div className={`grid gap-4 ${
              layout === 'even4' ? 'grid-cols-2' : 
              layout === 'vertical3' ? 'grid-cols-3' : 
              'grid-cols-4'
            }`}>
              {colors.map((color, index) => (
                <div key={index} className="space-y-2">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                    className="w-full h-10 rounded-lg cursor-pointer"
                  />
                  <div className="flex flex-wrap gap-1.5">
                    {presetColors.map((presetColor) => (
                      <button
                        key={presetColor}
                        onClick={() => handleColorChange(index, presetColor)}
                        className="w-6 h-6 rounded-full cursor-pointer hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                        style={{ backgroundColor: presetColor }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}