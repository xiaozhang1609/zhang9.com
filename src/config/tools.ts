import { lazy } from 'react';
import { createVersionAwareImport } from '../utils/dynamicImport';
import { 
  Hash, 
  FileText,
  FolderTree,
  Gamepad2,
  Image,
  QrCode,
  Type,
  Laptop,
  MessageSquare,
  KeyRound,
  Palette,
  LayoutGrid,
  Info,
  Link,
  Monitor,
  Wrench,
  Code2,
  Binary,
  Globe2,
  Timer,
  CalendarDays,
  Calculator,
  Scale,
  Wallet,
  Dices,
  Zap,
  Smartphone,
  GraduationCap,
  Clock,
  BookOpen,
  Sigma,
  History,
  BadgeDollarSign,
  Landmark,
  TrendingUp,
  PiggyBank,
  Pipette,
  Layers,
  Sun,
  Atom,
  FunctionSquare,
  Coins,
  Gem,
  Eye,
  Languages,
  AudioLines,
  ScrollText,
  Type as TypeIcon,
  Scissors,
  Sparkles,
  Grid3x3,
  Waves
} from 'lucide-react';

export interface ToolConfig {
  id: string;
  icon: any;
  name: string;
  category: keyof typeof categories;
  description: string;
  component: React.LazyExoticComponent<any>;
  isNew?: boolean;
}

export const categories = {
  common: '常用工具',
  images: '图片工具',
  text: '文本工具',
  dev: '开发工具',
  life: '生活查询',
  education: '教育学习',
  finance: '金融理财',
  design: '设计辅助',
  fun: '益智娱乐'
} as const;

// 使用健壮的动态导入
export const toolsConfig: ToolConfig[] = [
  {
    id: 'computerRepair',
    icon: Wrench,
    name: '电脑维修',
    category: 'common',
    description: '电脑维修联系方式',
    component: lazy(createVersionAwareImport(() => import('../components/tools/ComputerRepair'))),
    isNew: true
  },
  {
    id: 'computerRepairGlobal',
    icon: Wrench,
    name: '电脑维修(海外)',
    category: 'common',
    description: '海外电脑维修服务',
    component: lazy(createVersionAwareImport(() => import('../components/tools/ComputerRepairGlobal')))
  },
  {
    id: 'computerRepairNight',
    icon: Wrench,
    name: '电脑维修(夜间)',
    category: 'common',
    description: '夜间电脑维修服务，通过淘宝店铺下单',
    component: lazy(createVersionAwareImport(() => import('../components/tools/ComputerRepairNight')))
  },
  {
    id: 'officialWebsiteSearch',
    icon: Hash,
    name: '官网查询',
    category: 'common',
    description: '快速找到软件官方网站',
    component: lazy(createVersionAwareImport(() => import('../components/tools/OfficialWebsiteSearch')))
  },
  {
    id: 'quickLinks',
    icon: Link,
    name: '快捷导航',
    category: 'common',
    description: '精选实用网站导航',
    component: lazy(createVersionAwareImport(() => import('../components/tools/quickLinks')))
  },
  {
    id: 'winmirror',
    icon: Monitor,
    name: '镜像下载',
    category: 'common',
    description: 'Windows系统镜像下载',
    component: lazy(createVersionAwareImport(() => import('../components/tools/WinMirror')))
  },
  {
    id: 'fileTree',
    icon: FolderTree,
    name: '文件目录',
    category: 'common',
    description: '生成文件目录树结构',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'imageCompress',
    icon: Image,
    name: '图片压缩',
    category: 'images',
    description: '图片压缩工具，支持批量处理',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'imageConverter',
    icon: Image,
    name: '格式转换',
    category: 'images',
    description: '图片格式转换工具',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'imageSplit',
    icon: LayoutGrid,
    name: '图片分割',
    category: 'images',
    description: '图片分割工具',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'generator',
    icon: KeyRound,
    name: '密码生成',
    category: 'common',
    description: '随机生成名称或密码',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'pureBackground',
    icon: Palette,
    name: '纯色背景',
    category: 'common',
    description: '生成纯色背景图片',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'quadWallpaper',
    icon: LayoutGrid,
    name: '四屏壁纸',
    category: 'images',
    description: '创建四分屏壁纸',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'reviewGenerator',
    icon: MessageSquare,
    name: '评价生成',
    category: 'text',
    description: '快速生成评论文本',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'textTool',
    icon: Type,
    name: '文本统计',
    category: 'text',
    description: '文本字数统计工具',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'textFormatter',
    icon: Type,
    name: '文本排版',
    category: 'text',
    description: '快速规范化文本排版格式',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  // 开发工具
  {
    id: 'jsonFormatter',
    icon: Code2,
    name: 'JSON格式化',
    category: 'dev',
    description: 'JSON数据美化与校验',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'base64',
    icon: Binary,
    name: 'Base64转换',
    category: 'dev',
    description: '文本/图片Base64编码转换',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'urlEncoder',
    icon: Globe2,
    name: 'URL编解码',
    category: 'dev',
    description: 'URL参数编码与解码',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'timestamp',
    icon: Timer,
    name: '时间戳转换',
    category: 'dev',
    description: 'Unix时间戳与日期转换',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  // 生活查询
  {
    id: 'dateCalculator',
    icon: CalendarDays,
    name: '日期计算',
    category: 'life',
    description: '日期/天数间隔计算',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'unitConverter',
    icon: Scale,
    name: '单位换算',
    category: 'life',
    description: '常用计量单位换算',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'bmiCalculator',
    icon: Calculator,
    name: 'BMI计算',
    category: 'life',
    description: '身体质量指数(BMI)计算',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'taxCalculator',
    icon: Wallet,
    name: '个税计算',
    category: 'life',
    description: '个人所得税估算工具',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  // 教育学习
  {
    id: 'formulaManual',
    icon: FunctionSquare,
    name: '常用公式',
    category: 'education',
    description: '数学/物理常用公式手册',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'chineseConvert',
    icon: Languages,
    name: '简繁转换',
    category: 'education',
    description: '中文简体繁体相互转换',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'pinyinConvert',
    icon: AudioLines,
    name: '拼音转换',
    category: 'education',
    description: '汉字转拼音工具',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'poetry',
    icon: ScrollText,
    name: '诗词鉴赏',
    category: 'education',
    description: '中国古诗词随机欣赏',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  // 金融理财
  {
    id: 'depositCalc',
    icon: PiggyBank,
    name: '存款计算',
    category: 'finance',
    description: '银行存款利息计算',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'salaryCalc',
    icon: Coins,
    name: '工资计算',
    category: 'finance',
    description: '五险一金及到手工资计算',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'goldPrice',
    icon: Gem,
    name: '黄金价格',
    category: 'finance',
    description: '实时黄金价格查询',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  // 设计辅助
  {
    id: 'fontPreview',
    icon: TypeIcon,
    name: '字体预览',
    category: 'design',
    description: '在线预览不同字体效果',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'clipPath',
    icon: Scissors,
    name: 'CSS剪辑',
    category: 'design',
    description: 'CSS Clip-path生成器',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'glassmorphism',
    icon: Sparkles,
    name: '毛玻璃',
    category: 'design',
    description: 'CSS毛玻璃效果生成',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'gridLayout',
    icon: Grid3x3,
    name: '网格布局',
    category: 'design',
    description: 'CSS Grid布局生成器',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'svgWave',
    icon: Waves,
    name: 'SVG波浪',
    category: 'design',
    description: 'SVG波浪分隔线生成',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  // 益智娱乐
  {
    id: 'randomDecision',
    icon: Dices,
    name: '随机决策',
    category: 'fun',
    description: '帮你快速做出决定',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'reactionTest',
    icon: Zap,
    name: '反应测试',
    category: 'fun',
    description: '测试你的反应速度',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'handheldBarrage',
    icon: Smartphone,
    name: '手持弹幕',
    category: 'fun',
    description: '全屏滚动文字显示',
    component: lazy(() => import('../components/PlaceholderTool'))
  }
].filter(tool => !['readingRecord', 'blog', 'subscription'].includes(tool.id));

export const aboutConfig = {
  id: 'about',
  icon: Info,
  name: '关于',
  description: '关于章九工具箱',
  component: lazy(createVersionAwareImport(() => import('../components/About')))
};

export const getToolById = (id: string) => 
  id === 'about' ? aboutConfig : toolsConfig.find(tool => tool.id === id);

export const getToolsByCategory = (category: keyof typeof categories) => 
  toolsConfig.filter(tool => tool.category === category);