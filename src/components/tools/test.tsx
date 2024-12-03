import { useTranslation } from 'react-i18next';
import { FaBlog, FaToolbox, FaWeixin, FaDownload } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
import toast from 'react-hot-toast';

export default function Abouttest() {
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);

  const exportAsImage = async () => {
    if (!contentRef.current) return;

    try {
      const loadingToast = toast.loading('正在生成图片...');
      const canvas = await html2canvas(contentRef.current, {
        scale: 4,
        backgroundColor: '#0A0F1C',
        logging: false,
        useCORS: true,
        allowTaint: true,
        removeContainer: true,
      });

      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = '我的联系方式.png';
      link.href = image;
      link.click();
      URL.revokeObjectURL(link.href);

      toast.success('图片已成功导出！', { id: loadingToast });
    } catch (error) {
      toast.error('导出图片失败，请重试');
      console.error('Export failed:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <button
        onClick={exportAsImage}
        className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg shadow-sm shadow-slate-200 mb-4 ml-auto hover:bg-slate-700 transition-all font-medium"
      >
        <FaDownload className="w-4 h-4" />
        <span>导出</span>
      </button>

      <div 
        ref={contentRef} 
        className="relative bg-white shadow-[0_8px_32px_-8px_rgba(148,163,184,0.2)]"
        style={{ aspectRatio: '4/5' }}
      >
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white" />
        <div className="absolute inset-0 bg-[url('/hexagon-pattern.png')] opacity-[0.02]" />
        
        {/* 内容区域 */}
        <div className="relative p-8">
          {/* 头像和标题区域 */}
          <div className="flex items-center gap-8 mb-10">
            <div className="relative">
              {/* 头像框 */}
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 p-[1px]">
                <div className="w-full h-full rounded-full bg-white p-2">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img 
                      src="/head.webp" 
                      alt="头像" 
                      className="w-full h-full object-cover"
                      crossOrigin="anonymous"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-700 mb-2 tracking-wide">IT小章</h1>
              <div className="text-sm text-slate-500 tracking-wide font-medium">
                电脑维修 | 编程服务 | 问题咨询
              </div>
            </div>
          </div>

          {/* 联系方式区域 */}
          <div className="space-y-4">
            {/* 博客卡片 */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-white p-4 border border-slate-100 hover:border-slate-200 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-500/[0.02] to-slate-600/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-slate-100 to-white group-hover:from-slate-200 group-hover:to-slate-100 transition-all shadow-sm">
                  <FaBlog className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-700 group-hover:text-slate-800 transition-colors">我的博客</h2>
                  <p className="text-sm text-slate-500">itxiaozhang.com</p>
                </div>
              </div>
            </div>

            {/* 工具箱卡片 */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-white p-4 border border-slate-100 hover:border-slate-200 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-500/[0.02] to-slate-600/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-slate-100 to-white group-hover:from-slate-200 group-hover:to-slate-100 transition-all shadow-sm">
                  <FaToolbox className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-700 group-hover:text-slate-800 transition-colors">小章工具箱</h2>
                  <p className="text-sm text-slate-500">fixpc.cc</p>
                </div>
              </div>
            </div>

            {/* 微信卡片 */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-white p-4 border border-slate-100 hover:border-slate-200 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-500/[0.02] to-slate-600/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-slate-100 to-white group-hover:from-slate-200 group-hover:to-slate-100 transition-all shadow-sm">
                  <FaWeixin className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-700 group-hover:text-slate-800 transition-colors">绿泡泡</h2>
                  <p className="text-sm text-slate-500">xiaozhang1609</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}