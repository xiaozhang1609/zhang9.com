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
  
  // 开发工具
  jsonFormatter: 'JSON数据美化与校验',
  base64: '文本/图片Base64编码转换',
  urlEncoder: 'URL参数编码与解码',
  timestamp: 'Unix时间戳与日期转换',

  // 生活查询
  dateCalculator: '日期/天数间隔计算',
  unitConverter: '常用计量单位换算',
  bmiCalculator: '身体质量指数(BMI)计算',
  taxCalculator: '个人所得税估算工具',

  // 益智娱乐
  randomDecision: '帮你快速做出决定',
  reactionTest: '测试你的反应速度',
  handheldBarrage: '全屏滚动文字显示',

  // 教育学习
  focusTimer: '专注学习计时器',
  wordCard: '简易生词记忆卡片',
  mathGraph: '数学函数图像绘制',
  historyToday: '查看历史上的今天',
  periodicTable: '化学元素周期表查询',
  formulaManual: '数学/物理常用公式手册',
  chineseConvert: '中文简体繁体相互转换',
  pinyinConvert: '汉字转拼音工具',
  poetry: '中国古诗词随机欣赏',

  // 金融理财
  exchangeRate: '实时货币汇率转换',
  mortgageCalc: '商业贷款与公积金计算',
  compoundInterest: '复利增长计算器',
  depositCalc: '银行存款利息计算',
  salaryCalc: '五险一金及到手工资计算',
  goldPrice: '实时黄金价格查询',

  // 设计辅助
  colorPalette: '设计师配色方案生成',
  gradientGen: 'CSS渐变色生成工具',
  contrastCheck: '颜色对比度可读性检测',
  cssShadow: 'CSS阴影效果生成器',
  imageColorPicker: '上传图片提取主色调',
  fontPreview: '在线预览不同字体效果',
  clipPath: 'CSS Clip-path生成器',
  glassmorphism: 'CSS毛玻璃效果生成',
  gridLayout: 'CSS Grid布局生成器',
  svgWave: 'SVG波浪分隔线生成',

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
  imageCompress: '图片压缩',
  imageConverter: '格式转换',
  imageSplit: '图片分割',
  generator: '密码生成',
  pureBackground: '纯色背景',
  qrCode: '二维码工具',
  quadWallpaper: '四屏壁纸',
  reviewGenerator: '评价生成',
  textTool: '文本统计',
  textFormatter: '文本排版',

  // 开发工具
  jsonFormatter: 'JSON格式化',
  base64: 'Base64转换',
  urlEncoder: 'URL编解码',
  timestamp: '时间戳转换',

  // 生活查询
  dateCalculator: '日期计算',
  unitConverter: '单位换算',
  bmiCalculator: 'BMI计算',
  taxCalculator: '个税计算',

  // 益智娱乐
  randomDecision: '随机决策',
  reactionTest: '反应测试',
  handheldBarrage: '手持弹幕',

  // 教育学习
  focusTimer: '番茄钟',
  wordCard: '单词卡',
  mathGraph: '函数绘图',
  historyToday: '历史今天',
  periodicTable: '元素周期',
  formulaManual: '常用公式',
  chineseConvert: '简繁转换',
  pinyinConvert: '拼音转换',
  poetry: '诗词鉴赏',

  // 金融理财
  exchangeRate: '汇率转换',
  mortgageCalc: '房贷计算',
  compoundInterest: '复利计算',
  depositCalc: '存款计算',
  salaryCalc: '工资计算',
  goldPrice: '黄金价格',

  // 设计辅助
  colorPalette: '配色板',
  gradientGen: '渐变生成',
  contrastCheck: '对比度检测',
  cssShadow: '光影生成',
  imageColorPicker: '图片取色',
  fontPreview: '字体预览',
  clipPath: 'CSS剪辑',
  glassmorphism: '毛玻璃',
  gridLayout: '网格布局',
  svgWave: 'SVG波浪',

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

  // 如果标题本身就是"章九工具箱"，就不再重复添加后缀
  const finalTitle = title === '章九工具箱' ? title : `${title} - 章九工具箱`;

  return (
    <Helmet>
      <html lang="zh-CN" />
      <title>{finalTitle}</title>
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