import { lazy } from 'react';
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
  Monitor, // 添加新图标
  Wrench
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
  text: '文本工具',
  games: '小游戏'
} as const;

export interface ToolConfig {
  id: string;
  icon: any;
  name: string;
  category: keyof typeof categories;
  description: string;
  component: React.LazyExoticComponent<any>;
  isNew?: boolean; // 添加新属性标记新功能
}

export const toolsConfig: ToolConfig[] = [
  {
    id: 'computerRepair',
    icon: Wrench,
    name: 'computerRepair',
    category: 'common',
    description: 'computerRepairDesc',
    component: lazy(() => import('../components/tools/ComputerRepair')),
    isNew: true // 标记为新功能
  },
  {
    id: 'computerRepairGlobal',
    icon: Wrench,
    name: '电脑维修(海外)',
    category: 'common',
    description: 'computerRepairDesc',
    component: lazy(() => import('../components/tools/ComputerRepairGlobal')),
    isNew: true // 标记为新功能
  },
  {
    id: 'officialWebsiteSearch',
    icon: Hash,
    name: 'officialWebsiteSearch',
    category: 'common',
    description: 'officialWebsiteSearchDesc',
    component: lazy(() => import('../components/tools/OfficialWebsiteSearch'))
  },
  {
    id: 'quickLinks',
    icon: Link,
    name: 'quickLinks',
    category: 'common',
    description: 'quickLinksDesc',
    component: lazy(() => import('../components/tools/quickLinks'))
  },
  {
    id: 'winmirror',
    icon: Monitor,
    name: '镜像下载',
    category: 'common',
    description: 'winmirrorDesc',
    component: lazy(() => import('../components/tools/WinMirror'))
  },

  {
    id: 'fileTree',
    icon: FolderTree,
    name: 'fileTree',
    category: 'common',
    description: 'fileTreeDesc',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'game2048',
    icon: Gamepad2,
    name: 'game2048',
    category: 'games',
    description: 'game2048Desc',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'imageCompress',
    icon: Image,
    name: 'imageCompress',
    category: 'images',
    description: 'imageCompressDesc',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'imageConverter',
    icon: Image,
    name: 'imageConverter',
    category: 'images',
    description: 'imageConverterDesc',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'imageSplit',
    icon: LayoutGrid,
    name: 'imageSplit',
    category: 'images',
    description: 'imageSplitDesc',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'generator',
    icon: KeyRound,
    name: 'generator',
    category: 'common',
    description: 'generatorDesc',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'pureBackground',
    icon: Palette,
    name: 'pureBackground',
    category: 'common',
    description: 'pureBackgroundDesc',
    component: lazy(() => import('../components/PlaceholderTool'))
  },

  {
    id: 'quadWallpaper',
    icon: LayoutGrid,
    name: 'quadWallpaper',
    category: 'images',
    description: 'quadWallpaperDesc',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'reviewGenerator',
    icon: MessageSquare,
    name: 'reviewGenerator',
    category: 'text',
    description: 'reviewGeneratorDesc',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'textTool',
    icon: Type,
    name: 'textTool',
    category: 'text',
    description: 'textToolDesc',
    component: lazy(() => import('../components/PlaceholderTool'))
  },
  {
    id: 'textFormatter',
    icon: Type,
    name: 'textFormatter',
    category: 'text',
    description: 'textFormatterDesc',
    component: lazy(() => import('../components/PlaceholderTool'))
  }
].filter(tool => !['readingRecord', 'blog', 'subscription'].includes(tool.id));

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