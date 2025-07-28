import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { categories } from '../../config/tools';

interface SEOProps {
  toolId?: string;
  customTitle?: string;
  customDescription?: string;
  customKeywords?: string;
}

// 工具描述映射
const toolDescriptions: Record<string, string> = {
  officialWebsiteSearch: '快速找到软件官方网站',
  computerRepair: '电脑维修联系方式',
  computerRepairGlobal: '海外电脑维修服务',
  computerRepairNight: '夜间电脑维修服务',
  quickLinks: '精选实用网站导航',
  winmirror: 'Windows系统镜像下载',
  fileTree: '生成文件目录树结构',
  game2048: '经典的2048小游戏',
  imageCompress: '图片压缩工具，支持批量处理',
  imageConverter: '图片格式转换工具',
  imageSplit: '图片分割工具',
  generator: '随机生成名称或密码',
  qrCode: '二维码生成与扫描工具',
  quadWallpaper: '创建四分屏壁纸',
  reviewGenerator: '快速生成评论文本',
  textTool: '文本字数统计工具',
  textFormatter: '快速规范化文本排版格式',
  about: '关于章九工具箱'
};

// 工具名称映射
const toolNames: Record<string, string> = {
  officialWebsiteSearch: '官网查询',
  computerRepair: '电脑维修',
  computerRepairGlobal: '电脑维修(海外)',
  computerRepairNight: '电脑维修(夜间)',
  quickLinks: '快捷导航',
  winmirror: '镜像下载',
  fileTree: '文件目录',
  game2048: '数字游戏',
  imageCompress: '图片压缩',
  imageConverter: '格式转换',
  imageSplit: '图片分割',
  generator: '密码生成',
  qrCode: '二维码工具',
  quadWallpaper: '四屏壁纸',
  reviewGenerator: '评价生成',
  textTool: '文本统计',
  textFormatter: '文本排版',
  about: '关于'
};

export default function SEO({ 
  toolId,
  customTitle,
  customDescription,
  customKeywords
}: SEOProps) {
  const location = useLocation();
  
  const title = customTitle || toolNames[toolId || ''] || '章九工具箱';
  const description = customDescription || toolDescriptions[toolId || ''] || '章九工具箱 - 免费的在线工具集合';
  
  const keywords = [
    customKeywords,
    title,
    '在线工具',
    '免费工具',
    '章九工具箱',
    ...Object.values(categories)
  ].filter(Boolean).join(',');

  const canonicalUrl = `https://tools.itxiaozhang.com${location.pathname}`;

  return (
    <Helmet>
      <html lang="zh-CN" />
      <title>{`${title} - 章九工具箱`}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="章九工具箱" />
      <meta property="og:locale" content="zh_CN" />

      <link rel="canonical" href={canonicalUrl} />
      
      <meta name="baidu-site-verification" content="verification-code" />
      
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": title,
          "description": description,
          "url": canonicalUrl,
          "applicationCategory": "WebApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "CNY"
          }
        })}
      </script>
    </Helmet>
  );
}