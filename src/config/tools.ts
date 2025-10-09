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
  Wrench
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
  games: '小游戏'
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
    id: 'game2048',
    icon: Gamepad2,
    name: '数字游戏',
    category: 'games',
    description: '经典的2048小游戏',
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