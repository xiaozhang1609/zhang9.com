import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Link, 
  ExternalLink, 
  Search, 
  Code, 
  BookOpen, 
  Video, 
  ShoppingCart, 
  Music,
  Image,
  Gamepad,
  FileText,
  Palette,
  Globe,
  Volume2,
  Timer,
  Smile,
  Heart,
  LayoutGrid
} from 'lucide-react';
import { motion } from 'framer-motion';

interface QuickLink {
  title: string;
  url: string;
  icon: any;
  category: string;
  description?: string;
}

const categories = {
  tool: 'toolCategory',
  image: 'imageCategory',
  design: 'designCategory',
  game: 'gameCategory',
  text: 'textCategory',
  learn: 'learnCategory',
  media: 'mediaCategory',
  relax: 'relaxCategory'
};

const links: QuickLink[] = [
  
    // 装机
    { title: '远程安装系统', url: 'https://www.123pan.com/s/dptuVv-6fQW3.html', icon: Globe, category: 'tool', description: '远程系统安装工具' },
    { title: '启动U盘', url: 'https://www.123pan.com/s/dptuVv-yfQW3.html', icon: Globe, category: 'tool', description: 'U盘启动工具' },
    { title: '驱动备用', url: 'https://www.123pan.com/s/dptuVv-jfQW3.html', icon: Globe, category: 'tool', description: '驱动备份工具' },
    { title: '常用软件', url: 'https://www.123pan.com/s/dptuVv-baQW3.html', icon: Globe, category: 'tool', description: '常用软件合集' },
    { title: '临时文件分享', url: 'https://www.wenshushu.cn/', icon: Globe, category: 'tool', description: '文件分享工具' },
    { title: '镜像下载', url: 'https://winnew.cn/', icon: Globe, category: 'tool', description: '镜像下载' },
    // 实用工具
  { title: '在线剪切板', url: 'https://note.ms/itxiaozhang', icon: FileText, category: 'tool', description: '在线剪切板工具' },
  { title: '临时文件分享', url: 'https://www.wenshushu.cn/', icon: FileText, category: 'tool', description: '文件传输工具' },
  { title: '在线流程图', url: 'https://app.diagrams.net', icon: Code, category: 'tool', description: '在线流程图工具' },
  { title: '短网址生成', url: 'https://too.st/', icon: Link, category: 'tool', description: '短网址服务' },

  // 图片工具
  { title: 'TinyPNG', url: 'https://tinypng.com/', icon: Image, category: 'image', description: '在线图片压缩' },
  { title: 'remove.bg', url: 'https://www.remove.bg/zh', icon: Image, category: 'image', description: '在线去除背景' },
  { title: '壁纸网站', url: 'https://wallhaven.cc', icon: Image, category: 'image', description: '壁纸下载' },
  { title: '今日必应', url: 'https://www.todaybing.com/', icon: Image, category: 'image', description: '每日壁纸' },

  // 设计创作
  { title: '在线PS', url: 'https://zaixianps.net/', icon: Palette, category: 'design', description: '在线PS工具' },
  { title: '配色网站', url: 'https://colorkit.co/color-palette-generator/', icon: Palette, category: 'design', description: '在线调色板' },
  { title: '在线图标库', url: 'https://iconpark.oceanengine.com/official', icon: Palette, category: 'design', description: '图标资源' },
  { title: '在线白板绘图', url: 'https://okso.app/', icon: Palette, category: 'design', description: '在线白板' },

  // 游戏娱乐
  { title: '魔方游戏', url: 'https://pengfeiw.github.io/rubiks-cube/', icon: Gamepad, category: 'game', description: '魔方游戏' },
  { title: '在线扫雷', url: 'https://www.1000mines.com/', icon: Gamepad, category: 'game', description: '扫雷游戏' },
  { title: '俄罗斯方块', url: 'https://chvin.github.io/react-tetris/?lan=zh', icon: Gamepad, category: 'game', description: '方块游戏' },
  { title: '小霸王', url: 'https://www.yikm.net/', icon: Gamepad, category: 'game', description: '小游戏' },

  // 文本处理
  { title: '文本去重工具', url: 'https://www.lddgo.net/string/duplicate-remove', icon: FileText, category: 'text', description: '文本去重' },
  { title: 'Markdown编��器', url: 'https://markdown.devtool.tech/app', icon: FileText, category: 'text', description: 'Markdown编辑器' },
  { title: '网页OCR文字识别', url: 'https://web.baimiaoapp.com/', icon: FileText, category: 'text', description: 'OCR识别工具' },

  // 学习教程
  { title: '程序员做饭指南', url: 'https://github.com/Anduin2017/HowToCook', icon: BookOpen, category: 'learn', description: '烹饪指南' },
  { title: '在线练习打字', url: 'https://www.eletypes.com/', icon: BookOpen, category: 'learn', description: '打字练习' },

  // 影音资源
  { title: '白噪音网站', url: 'https://focus-sounds.vercel.app/', icon: Volume2, category: 'media', description: '白噪音' },
  { title: '四季下雨声', url: 'https://rainyscope.com/', icon: Volume2, category: 'media', description: '雨声模拟' },
  { title: '海洋的声音', url: 'https://virtocean.com/#', icon: Volume2, category: 'media', description: '海洋声音' },

  // 放松休闲
  { title: '在线放松网站', url: 'https://works.yangerxiao.com/breathe-relaxer/', icon: Heart, category: 'relax', description: '放松练习' },
  { title: '环游世界', url: 'https://www.airpano.org.cn/', icon: Globe, category: 'relax', description: '360°虚拟游览' },
  { title: '烟花模拟器', url: 'https://fireworks.nianbroken.top/', icon: Smile, category: 'relax', description: '烟花模拟' }
];

export default function QuickLinks() {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="space-y-8">
        {/* 标题区域 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="relative group inline-block">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl blur-xl transition-all duration-300 group-hover:scale-110" />
            <div className="relative inline-flex items-center justify-center p-4 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 rounded-xl mb-6">
              <LayoutGrid className="w-8 h-8 text-indigo-600 dark:text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t('quickLinks')}
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            {t('quickLinksDesc')}
          </p>
        </motion.div>

        {/* 链接分类展示 */}
        <div className="grid gap-8">
          {Object.entries(categories).map(([category, titleKey], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg">
                  <LayoutGrid className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {t(titleKey)}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {links
                  .filter(link => link.category === category)
                  .map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 p-4 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 backdrop-blur-sm transition-all duration-300"
                      whileHover={{ y: -2, scale: 1.02 }}
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 group-hover:from-indigo-200 group-hover:to-purple-200 dark:group-hover:from-indigo-800/30 dark:group-hover:to-purple-800/30 transition-colors duration-300">
                        <link.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 dark:text-gray-100 truncate">
                          {link.title}
                        </div>
                        {link.description && (
                          <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {link.description}
                          </div>
                        )}
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-600 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-300" />
                    </motion.a>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}



[
    { title: '在线剪切板', url: 'https://note.ms/itxiaozhang', category: '工具', description: '在线剪切板工具' },
    { title: 'note.ms', url: 'https://note.ms/itxiaozhang', category: '工具', description: '在线记事本' },
    { title: 'netcut.cn', url: 'https://netcut.cn/itxiaozhang', category: '工具', description: '网络管理工具' },
    { title: 'telegra', url: 'https://telegra.ph/', category: '工具', description: '在线文章编辑' },
  
    { title: 'coverview', url: 'https://coverview.vercel.app/editor', category: '设计', description: '封面图生成器' },
    { title: 'IMaker', url: 'https://img-maker.vercel.app/', category: '设计', description: '图片生成工具' },
    { title: 'picprose', url: 'https://www.picprose.net', category: '设计', description: '图像处理工具' },
  
    { title: '远程安装系统', url: 'https://www.123pan.com/s/dptuVv-6fQW3.html', category: '安装', description: '远程系统安装工具' },
    { title: '启动U盘', url: 'https://www.123pan.com/s/dptuVv-yfQW3.html', category: '安装', description: 'U盘启动工具' },
    { title: '驱动备用', url: 'https://www.123pan.com/s/dptuVv-jfQW3.html', category: '安装', description: '驱动备份工具' },
    { title: '常用软件', url: 'https://www.123pan.com/s/dptuVv-baQW3.html', category: '安装', description: '常用软件合集' },
    { title: '临时文件分享', url: 'https://www.wenshushu.cn/', category: '工具', description: '文件分享工具' },
  
    { title: 'TinyPNG', url: 'https://tinypng.com/', category: '图片', description: '在线图片压缩' },
    { title: 'lummi.ai', url: 'https://www.lummi.ai/', category: '图片', description: '无版权图片' },
    { title: 'remove.bg', url: 'https://www.remove.bg/zh', category: '图片', description: '在线去除背景' },
    { title: 'magicstudio', url: 'https://magicstudio.com/zh/magiceraser/', category: '图片', description: '物体删除工具' },
  
    { title: 'IT工具箱', url: 'https://itools.itxiaozhang.com/', category: '自建服务', description: 'IT工具集合' },
    { title: '图小小', url: 'https://picsmaller.itxiaozhang.com/', category: '自建服务', description: '图片压缩工具' },
  
    { title: '二维码解析1', url: 'https://jiema.wwei.cn', category: '工具', description: '二维码解析' },
    { title: '二维码解析2', url: 'https://www.toolkk.com/tools/qrcode-parser', category: '工具', description: '二维码解析' },
  
    { title: '在线文本去重工具', url: 'https://www.lddgo.net/string/duplicate-remove', category: '文本处理', description: '文本去重' },
    { title: '文本过滤和替换工具', url: 'https://www.qqxiuzi.cn/zh/wenbenguolv/', category: '文本处理', description: '文本过滤' },
    { title: '网页OCR文字识别', url: 'https://web.baimiaoapp.com/', category: '文本处理', description: 'OCR识别工具' },
  
    { title: 'Markdown 在线编辑器', url: 'https://markdown.devtool.tech/app', category: '文本处理', description: 'Markdown编辑器' },
    { title: '在线markdown转word', url: 'http://www.toolxq.com/static/tools/markdown2word/toword.html', category: '文本处理', description: 'Markdown转Word' },
    { title: '在线markdown编辑器', url: 'https://write.bmpi.dev/', category: '文本处理', description: 'Markdown编辑器' },
    { title: '在线markdown编辑器6', url: 'https://stackedit.io/app#', category: '文本处理', description: 'Markdown编辑器' },
  
    { title: '壁纸网站', url: 'https://wallhaven.cc', category: '图片', description: '壁纸下载' },
    { title: 'wallroom', url: 'https://wallroom.io/', category: '图片', description: '壁纸网站' },
    { title: '今日必应', url: 'https://www.todaybing.com/', category: '图片', description: '每日壁纸' },
    { title: 'alphacoders', url: 'https://alphacoders.com/the-best', category: '图片', description: '壁纸资源' },
  
    { title: '头像生成工具', url: 'https://sinqi.tools/zh/avatar', category: '头像', description: '头像生成' },
    { title: '像素风格头像生成器', url: 'http://www.atoolbox.net/Tool.php?Id=1035', category: '头像', description: '像素头像生成' },
    { title: 'notion-avatar', url: 'https://notion-avatar.vercel.app/zh', category: '头像', description: '头像生成' },
  
    { title: '在线PS', url: 'https://zaixianps.net/', category: '设计', description: '在线PS工具' },
    { title: 'photopea', url: 'https://www.photopea.com/', category: '设计', description: '在线图片编辑器' },
    { title: 'gaoding', url: 'https://ps.gaoding.com/#/', category: '设计', description: '在线PS工具' },
  
    { title: 'Yes Or No', url: 'https://yesno.wtf/', category: '工具', description: '快速决策工具' },
  
    { title: 'FlipClocker', url: 'https://flipclocker.com/', category: '工具', description: '数字翻页时钟' },
  
    { title: '代码图片生成器 - carbon', url: 'https://carbon.now.sh', category: '工具', description: '代码图片生成' },
    { title: '代码图片生成器 - showcode', url: 'https://showcode.app/', category: '工具', description: '代码图片生成' },
  
    { title: '配色网站', url: 'https://colorkit.co/color-palette-generator/', category: '设计', description: '在线调色板' },
  
    { title: '在线文件传输 - wormhole', url: 'https://wormhole.app/', category: '工具', description: '文件传输工具' },
  
    { title: '在线白板绘图', url: 'https://okso.app/', category: '绘图', description: '在线白板' },
    { title: 'excalidraw', url: 'https://excalidraw.com/', category: '绘图', description: '在线绘图工具' },
    { title: 'tldraw', url: 'https://www.tldraw.com/', category: '绘图', description: '在线绘图工具' },
  
    { title: '在线练习打字', url: 'https://www.eletypes.com/', category: '练习', description: '打字练习' },
    { title: 'dazidazi', url: 'https://dazidazi.com/', category: '练习', description: '打字练习' },
    { title: 'qwerty', url: 'https://qwerty.kaiyi.cool/', category: '练习', description: '打字练习' },
  
    { title: '随机动画', url: 'https://bleuje.com/randomanimations/', category: '动画', description: '随机动画效果' },
  
    { title: 'AI上色', url: 'https://github.com/lllyasviel/style2paints', category: 'AI工具', description: 'AI上色工具' },
  
    { title: '在线番茄', url: 'https://lazy-guy.github.io/tomodoro/index.html', category: '工具', description: '番茄钟应用' },
  
    { title: '在线流程图', url: 'https://app.diagrams.net', category: '工具', description: '在线流程图工具' },
  
    { title: '在线密码生成工具', url: 'https://mrjooz.github.io/password-generator/', category: '工具', description: '密码生成' },
  
    { title: '短网址生成', url: 'https://too.st/', category: '工具', description: '短网址服务' },
    { title: 'ffff.im', url: 'https://ffff.im/', category: '工具', description: '短网址服务' },
    { title: 'zws.im', url: 'https://zws.im/', category: '工具', description: '短网址服务' },
  
    { title: '词云图生成', url: 'https://tools.kalvinbg.cn/image/wordCloud', category: '工具', description: '词云图生成' },
  
    { title: 'edge浏览器删除', url: 'https://github.com/thebookisclosed/ViVe', category: '工具', description: 'Edge浏览器删除工具' },
  
    { title: '性教育网站', url: 'https://knowsex.net/', category: '教育', description: '性教育资源' },
  
    { title: 'Office Tool Plus', url: 'https://otp.landian.vip', category: '软件', description: 'Office工具' },
    { title: '软件目录', url: 'https://mp.weixin.qq.com/s/RjnC0PCa0xSWsCzAKR-t1A', category: '软件', description: '软件推荐' },
  
    { title: '在线拼图', url: 'http://www.jigzone.com/', category: '游戏', description: '在线拼图游戏' },
    { title: 'Fifteen puzzle', url: 'https://kirilllive.github.io/Fifteen_puzzle_maker/?utm_source=bestxtools.com', category: '游戏', description: '拼图游戏' },
  
    { title: '在线图标库', url: 'https://iconpark.oceanengine.com/official', category: '设计', description: '图标资源' },
    { title: 'iconfont', url: 'https://www.iconfont.cn/', category: '设计', description: '图标库' },
    { title: 'iconbuddy', url: 'https://iconbuddy.app/', category: '设计', description: '图标生成' },
  
    { title: '美国身份生成', url: 'https://fauxid.com/fake-name-generator/united-states', category: '工具', description: '身份生成器' },
  
    { title: '互联网档案馆', url: 'https://web.archive.org/', category: '工具', description: '文化遗产保存' },
  
    { title: '鼠标解压', url: 'http://www.staggeringbeauty.com/', category: '娱乐', description: '解压网站' },
  
    { title: '物理画线', url: 'https://www.xiwnn.com/huaxian/', category: '娱乐', description: '物理画线游戏' },
  
    { title: '程序员做饭指南', url: 'https://github.com/Anduin2017/HowToCook', category: '教程', description: '烹饪指南' },
    { title: '食用手册', url: 'https://cook.yunyoujun.cn/', category: '教程', description: '食谱' },
  
    { title: '在线体验 macOS', url: 'https://macos-web.app/', category: '体验', description: '体验macOS' },
  
    { title: 'Paramoji', url: 'https://paramoji.org/', category: '工具', description: '生成表情' },
  
    { title: '高质量插画', url: 'https://www.transhumans.xyz/', category: '插画', description: '插画资源' },
  
    { title: 'Emoji大全', url: 'https://www.emojiall.com/zh-hans', category: '表情', description: '表情符号词典' },
  
    { title: '纯文本格式的日历', url: 'https://www.namecheap.com/visual/font-generator/calendar/', category: '工具', description: '日历生成器' },
  
    { title: '举牌小人在线制作', url: 'https://www.jiuwa.net/jupai/?utm_source=bestxtools.com', category: '工具', description: '小人举牌生成' },
  
    { title: '在线钢琴模拟器', url: 'https://www.xiwnn.com/piano/', category: '娱乐', description: '钢琴模拟器' },
    { title: 'autopiano', url: 'https://www.autopiano.cn/', category: '娱乐', description: '在线钢琴' },
  
    { title: '魔方游戏', url: 'https://pengfeiw.github.io/rubiks-cube/', category: '游戏', description: '魔方游戏' },
  
    { title: '在线扫雷', url: 'https://www.1000mines.com/', category: '游戏', description: '扫雷游戏' },
  
    { title: '白噪音网站', url: 'https://focus-sounds.vercel.app/', category: '工具', description: '白噪音' },
  
    { title: '在线放松网站', url: 'https://works.yangerxiao.com/breathe-relaxer/', category: '放松', description: '放松练习' },
  
    { title: '俄罗斯方块', url: 'https://chvin.github.io/react-tetris/?lan=zh', category: '游戏', description: '方块游戏' },
  
    { title: '城市道路可视化', url: 'https://anvaka.github.io/city-roads/', category: '可视化', description: '城市道路可视化' },
  
    { title: '支付宝到账语音', url: 'https://mm.cqu.cc/share/zhifubaodaozhang/', category: '工具', description: '到账语音' },
  
    { title: '环游世界', url: 'https://www.airpano.org.cn/', category: '旅游', description: '360°虚拟游览' },
  
    { title: '千亿像素看中国', url: 'https://pf.bigpixel.cn/zh-CN.html', category: '旅游', description: '高分辨率图像' },
  
    { title: '泡面神器', url: 'https://www.maemo.cc/Timer/', category: '工具', description: '泡面计时器' },
  
    { title: '猜数字游戏', url: 'https://elrumo.github.io/guess_the_number/', category: '游戏', description: '猜数字游戏' },
  
    { title: 'Emoji 融合', url: 'https://tikolu.net/emojimix', category: '工具', description: '表情融合' },
  
    { title: '烟花模拟器', url: 'https://fireworks.nianbroken.top/', category: '工具', description: '烟花模拟' },
  
    { title: '小霸王，其乐无穷', url: 'https://www.yikm.net/', category: '娱乐', description: '小游戏' },
  
    { title: '超动感打字', url: 'http://magickeyboard.io/', category: '练习', description: '打字练习' },
  
    { title: '四季下雨声', url: 'https://rainyscope.com/', category: '声音', description: '雨声模拟' },
  
    { title: '海洋的声音', url: 'https://virtocean.com/#', category: '声音', description: '海洋声音' },
  
    { title: 'Web闯关游戏', url: 'https://nazo.one-story.cn/', category: '游戏', description: '闯关游戏' },
  
    { title: '指尖陀螺', url: 'https://ffffidget.com/', category: '娱乐', description: '陀螺游戏' },
  
    { title: '奇趣网站收藏家', url: 'https://fuun.fun/', category: '趣味', description: '趣味网站' },
    { title: '益智游戏', url: 'https://www.gamesforthebrain.com/', category: '游戏', description: '益智游戏' },
    { title: '物理游戏合集', url: 'https://www.physicsgames.net/', category: '游戏', description: '物理游戏' },
  
    { title: '中文性教育资源网', url: 'https://res.knowsex.org/', category: '教育', description: '性教育资源' }
  ]
  