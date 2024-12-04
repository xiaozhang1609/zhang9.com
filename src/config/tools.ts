import { lazy } from 'react';
import { 
  Hash, 
  FileText,
  FolderTree,
  Gamepad2,
  Image,
  QrCode,
  Type,
  Timer,
  Laptop,
  MessageSquare,
  KeyRound,
  Palette,
  LayoutGrid,
  Info,
  Link,
  BookOpen,
  Rss,
  Newspaper
} from 'lucide-react';

export interface ToolConfig {
  id: string;
  icon: any;
  name: string;
  category: keyof typeof categories;
  description: string;
  component: React.LazyExoticComponent<any>;
}

export const categories = {
  common: '常用工具',
  images: '图片工具',
  time: '时间工具',
  text: '文本工具',
  files: '文件工具',
  games: '小游戏',
  special: '自用工具'
} as const;

export const toolsConfig: ToolConfig[] = [
  {
    id: 'officialWebsiteSearch',
    icon: Hash,
    name: 'officialWebsiteSearch',
    category: 'common',
    description: 'officialWebsiteSearchDesc',
    component: lazy(() => import('../components/tools/OfficialWebsiteSearch'))
  },

  {
    id: 'fixpc',
    icon: Laptop,
    name: 'fixpc',
    category: 'common',
    description: 'fixpcDesc',
    component: lazy(() => import('../components/tools/fixpc'))
  },
  {
    id: 'fileTree',
    icon: FolderTree,
    name: 'fileTree',
    category: 'files',
    description: 'fileTreeDesc',
    component: lazy(() => import('../components/tools/FileTree'))
  },
  {
    id: 'game2048',
    icon: Gamepad2,
    name: 'game2048',
    category: 'games',
    description: 'game2048Desc',
    component: lazy(() => import('../components/tools/Game2048'))
  },
  {
    id: 'imageCompress',
    icon: Image,
    name: 'imageCompress',
    category: 'images',
    description: 'imageCompressDesc',
    component: lazy(() => import('../components/tools/imageCompress'))
  },
  {
    id: 'imageConverter',
    icon: Image,
    name: 'imageConverter',
    category: 'images',
    description: 'imageConverterDesc',
    component: lazy(() => import('../components/tools/imageConverter'))
  },
  {
    id: 'imageSplit',
    icon: LayoutGrid,
    name: 'imageSplit',
    category: 'images',
    description: 'imageSplitDesc',
    component: lazy(() => import('../components/tools/imageSplit'))
  },
  {
    id: 'generator',
    icon: KeyRound,
    name: 'generator',
    category: 'common',
    description: 'generatorDesc',
    component: lazy(() => import('../components/tools/Generator'))
  },
  {
    id: 'pureBackground',
    icon: Palette,
    name: 'pureBackground',
    category: 'common',
    description: 'pureBackgroundDesc',
    component: lazy(() => import('../components/tools/PureBackground'))
  },
  {
    id: 'qrCode',
    icon: QrCode,
    name: 'qrCode',
    category: 'common',
    description: 'qrCodeDesc',
    component: lazy(() => import('../components/tools/QRCode'))
  },
  {
    id: 'quadWallpaper',
    icon: LayoutGrid,
    name: 'quadWallpaper',
    category: 'images',
    description: 'quadWallpaperDesc',
    component: lazy(() => import('../components/tools/QuadWallpaper'))
  },
  {
    id: 'reviewGenerator',
    icon: MessageSquare,
    name: 'reviewGenerator',
    category: 'special',
    description: 'reviewGeneratorDesc',
    component: lazy(() => import('../components/tools/ReviewGenerator'))
  },
  {
    id: 'textTool',
    icon: Type,
    name: 'textTool',
    category: 'text',
    description: 'textToolDesc',
    component: lazy(() => import('../components/tools/TextTool'))
  },
  {
    id: 'countdown',
    icon: Timer,
    name: 'countdown',
    category: 'time',
    description: 'countdownDesc',
    component: lazy(() => import('../components/tools/CountdownTool'))
  },
  {
    id: 'newYearCountdown',
    icon: Timer,
    name: 'newYearCountdown',
    category: 'time',
    description: 'newYearCountdownDesc',
    component: lazy(() => import('../components/tools/NewYearCountdown'))
  },
  {
    id: 'pomodoro',
    icon: Timer,
    name: 'pomodoro',
    category: 'time',
    description: 'pomodoroDesc',
    component: lazy(() => import('../components/tools/PomodoroTool'))
  },
  {
    id: 'basicTimer',
    icon: Timer,
    name: 'basicTimer',
    category: 'time',
    description: 'basicTimerDesc',
    component: lazy(() => import('../components/tools/BasicTimerTool'))
  },
  {
    id: 'quickLinks',
    icon: Link,
    name: 'quickLinks',
    category: 'special',
    description: 'quickLinksDesc',
    component: lazy(() => import('../components/tools/quickLinks'))
  },
  {
    id: 'readingRecord',
    icon: BookOpen,
    name: 'readingRecord',
    category: 'special',
    description: 'readingRecordDesc',
    component: lazy(() => import('../components/tools/ReadingRecord'))
  },
  {
    id: 'blog',
    icon: Rss,
    name: 'blog',
    category: 'special',
    description: 'blogDesc',
    component: lazy(() => import('../components/tools/Blog'))
  },
  {
    id: 'subscription',
    icon: Newspaper,
    name: 'subscription',
    category: 'special',
    description: 'subscriptionDesc',
    component: lazy(() => import('../components/tools/Subscription'))
  },
  {
    id: 'textFormatter',
    icon: Type,
    name: 'textFormatter',
    category: 'text',
    description: 'textFormatterDesc',
    component: lazy(() => import('../components/tools/TextFormatter'))
  }
];

// 单独的 about 页面配置
export const aboutConfig = {
  id: 'about',
  icon: Info,
  name: 'about',
  description: 'aboutDescription',
  component: lazy(() => import('../components/About'))
};

// 获取指定ID的工具配置
export const getToolById = (id: string) => 
  id === 'about' ? aboutConfig : toolsConfig.find(tool => tool.id === id);

// 获取指定分类的工具列表
export const getToolsByCategory = (category: keyof typeof categories) => 
  toolsConfig.filter(tool => tool.category === category);