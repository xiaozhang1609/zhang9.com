import React, { useState } from 'react';
import { MessageSquare, Copy, RefreshCw } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface GenerateOptions {
  useEmoji: boolean;
  useCustomerCount: boolean;
}

const idioms = [
  "一帆风顺", "二龙腾飞", "三羊开泰", "四季平安", "五福临门",
  "六六大顺", "七星高照", "八方来财", "九九同心", "十全十美",
  "万事如意", "吉祥如意", "年年有余", "吉星高照", "财运亨通",
  "健康长寿", "花开富贵", "飞黄腾达", "福如东海", "寿比南山",
  "万事顺意", "幸福美满", "官运亨通", "恭贺新禧", "财源广进",
  "恭贺新喜", "美梦连连", "万事顺利", "荣华富贵", "金玉满堂",
  "百业兴旺", "六畜兴旺", "五谷丰登", "喜上眉梢", "福满门庭",
  "万福临门", "心想事成", "福满人间", "喜气临门", "万事亨通",
  "万象更新", "鹏程万里", "门迎百福", "瑞气盈门", "旭日东升",
  "和气生财", "出入平安", "欣欣向荣", "美满幸福", "和气致祥",
  "鸾凤和鸣", "喜气盈门", "招财进宝", "福星高照", "福禄寿禧",
  "大展鸿图", "前途无量", "前程似锦", "生意兴隆", "诸事如意",
  "诸事顺利", "步步高升", "家业兴旺", "阖家幸福", "龙马精神",
  "喜气洋洋", "欢乐祥和", "长命百岁", "蒸蒸日上", "日新月异",
  "财源滚滚", "大吉大利", "文定吉祥", "意气风发", "好事连连",
  "寿与天齐", "日月长明", "鹤寿添寿", "奉觞上寿", "吉庆有余",
  "百花献瑞", "登峰造极", "福禄双星", "日年偕老", "升官发财",
  "寿域同登", "椿萱并茂", "家中全福", "身体健康", "学习进步",
  "工作顺利", "开开心心", "生活幸福", "鸿案齐眉", "开门大吉",
  "万马奔腾", "全家福气", "满院春光", "庆云跃日", "一家瑞气",
  "二气雍和", "三星拱户", "五星高照", "神采奕奕", "六合同春",
  "四时平安", "天天开心", "笑口常开", "幸福安康", "好运连连",
  "龙缠启岁", "凤纪书元", "与山同静", "家庭幸福", "丰财聚宝",
  "四时吉庆", "八节安康", "天开景运", "多财满家", "家肥屋润",
  "快乐年年", "招财有道", "长揾长有", "称觞祝假", "万事胜意",
  "人强马壮", "事事顺心", "福寿安康", "祝无量寿", "彪炳千秋",
  "鼎新革旧", "豫立亨通", "庆衍萱畴", "随地有春", "春舍澄空",
  "白梅吐艳", "黄菊傲霜", "松柏同春", "华堂偕老", "桃开连理",
  "如写阳春", "梅柳迎春", "缔结良缘", "白首成约", "鱼水和谐",
  "缘订三生", "家庭和睦", "事业有成", "幸福快乐", "彩蝶翩翩",
  "大红大紫", "大显身手"
];

export default function ReviewGenerator() {
  const [initialCount, setInitialCount] = useState(1577);
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [options, setOptions] = useState<GenerateOptions>({
    useEmoji: true,
    useCustomerCount: true,
  });

  const generateMessages = async () => {
    setIsGenerating(true);
    let customerCount = initialCount;
    let outputText = "";

    try {
      for (let i = 0; i < 200; i++) {
        const selectedIdioms = getRandomIdioms(idioms, 10);
        
        const part1 = options.useEmoji 
          ? "❤️非常感谢您购买本店的商品🙏🏻小章祝您⏬️"
          : "非常感谢您购买本店的商品，小章祝您";
        
        const part2 = options.useEmoji
          ? selectedIdioms.join("🎉") + "🎉"
          : selectedIdioms.join("，") + "！";
        
        const part3 = options.useCustomerCount
          ? `${options.useEmoji ? "❤️" : ""}您是我们的第${customerCount}位客户${options.useEmoji ? "❤️" : ""}期待您再次光临${options.useEmoji ? "❤️" : ""}`
          : `${options.useEmoji ? "❤️" : ""}期待您再次光临${options.useEmoji ? "❤️" : ""}`;

        outputText += `${part1}\n${part2}\n${part3}\n\n`;
        customerCount++;

        // 每生成50条更新一次显示
        if (i % 50 === 0) {
          setOutput(outputText);
          await new Promise(resolve => setTimeout(resolve, 0));
        }
      }
      setOutput(outputText);
      toast.success('生成完成！', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'dark',
      });
    } catch (error) {
      toast.error('生成过程中出现错误', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'dark',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const getRandomIdioms = (idioms: string[], count: number) => {
    let shuffled = [...idioms];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output).then(() => {
      toast.success('复制成功', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'dark',
      });
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="card bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/30 overflow-hidden">
        {/* 标题区域 */}
        <div className="text-center p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-xl mb-4">
            <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            评价生成
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            快速生成200条随机评价，适用于电商平台
          </p>
        </div>

        {/* 内容区域 */}
        <div className="p-6 space-y-6">
          {/* 基础设置 */}
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={options.useEmoji}
                onChange={(e) => setOptions({...options, useEmoji: e.target.checked})}
                className="rounded border-gray-300 dark:border-gray-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">使用表情符号</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={options.useCustomerCount}
                onChange={(e) => setOptions({...options, useCustomerCount: e.target.checked})}
                className="rounded border-gray-300 dark:border-gray-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">显示客户编号</span>
            </label>
          </div>

          {options.useCustomerCount && (
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                起始编号:
              </label>
              <input
                type="number"
                value={initialCount}
                onChange={(e) => setInitialCount(Number(e.target.value))}
                min="1"
                placeholder="1577"
                className="flex-1 p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl"
              />
            </div>
          )}

          {/* 操作按钮 */}
          <div className="flex gap-4">
            <button
              onClick={generateMessages}
              disabled={isGenerating}
              className="flex-1 p-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? '生成中...' : '生成评价'}
            </button>
            <button
              onClick={copyToClipboard}
              disabled={!output || isGenerating}
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              title="复制到剪贴板"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>

          {/* 输出区域 */}
          <textarea
            value={output}
            readOnly
            className="w-full h-48 p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 resize-none"
            placeholder="点击生成按钮开始生成评价..."
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
