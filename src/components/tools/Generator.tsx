import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Key, User } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const characterSets = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
  chinese: '的一是了我不人在他有这个上们来到时大地为子中你说生国年着就那和要她出也得里后自以会家可下而过天去能对小多然于心学么之都好看起发当没成只如事把还用第样道想作种开美总从无情己面最女但现前些所同日手又行意动方期它头经长儿回位分爱老因很给名法间斯知世什两次使身者被高已亲其进此话常与活正感'
};

export default function Generator() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameLength, setUsernameLength] = useState(8);
  const [passwordLength, setPasswordLength] = useState(14);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  useEffect(() => {
    generateUsername();
    generatePassword();
  }, []);

  const generateRandomString = (length, characterSet) => {
    let result = '';
    const charactersLength = characterSet.length;
    for (let i = 0; i < length; i++) {
      result += characterSet.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const generateUsername = () => {
    const characterSet = characterSets.lowercase + characterSets.uppercase + characterSets.numbers;
    setUsername(generateRandomString(usernameLength, characterSet));
  };

  const generatePassword = () => {
    let characterSet = '';
    if (includeLowercase) characterSet += characterSets.lowercase;
    if (includeUppercase) characterSet += characterSets.uppercase;
    if (includeNumbers) characterSet += characterSets.numbers;
    if (includeSymbols) characterSet += characterSets.symbols;

    setPassword(generateRandomString(passwordLength, characterSet));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
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
            <Key className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            名称/密码生成器
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            生成随机用户名和安全密码
          </p>
        </div>

        {/* 内容区域 */}
        <div className="p-6 space-y-6">
          {/* 用户名设置区域 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              <User className="w-5 h-5" />
              <span>用户名设置</span>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                长度: {usernameLength}
              </label>
              <input
                type="range"
                min="4"
                max="16"
                value={usernameLength}
                onChange={(e) => setUsernameLength(Number(e.target.value))}
                className="w-2/3"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={username}
                readOnly
                className="flex-1 p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl"
              />
              <button
                onClick={() => copyToClipboard(username)}
                className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
                title="复制"
              >
                <Copy className="w-5 h-5" />
              </button>
              <button
                onClick={generateUsername}
                className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
                title="重新生成"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 密码设置区域 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              <Key className="w-5 h-5" />
              <span>密码设置</span>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                长度: {passwordLength}
              </label>
              <input
                type="range"
                min="8"
                max="32"
                value={passwordLength}
                onChange={(e) => setPasswordLength(Number(e.target.value))}
                className="w-2/3"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={() => setIncludeLowercase(!includeLowercase)}
                  className="rounded border-gray-300 dark:border-gray-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">小写字母</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={() => setIncludeUppercase(!includeUppercase)}
                  className="rounded border-gray-300 dark:border-gray-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">大写字母</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={() => setIncludeNumbers(!includeNumbers)}
                  className="rounded border-gray-300 dark:border-gray-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">数字</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={() => setIncludeSymbols(!includeSymbols)}
                  className="rounded border-gray-300 dark:border-gray-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">特殊字符</span>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={password}
                readOnly
                className="flex-1 p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl"
              />
              <button
                onClick={() => copyToClipboard(password)}
                className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
                title="复制"
              >
                <Copy className="w-5 h-5" />
              </button>
              <button
                onClick={generatePassword}
                className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
                title="重新生成"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 生成按钮 */}
          <button
            onClick={() => { generateUsername(); generatePassword(); }}
            className="w-full p-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-xl transition-all duration-200"
          >
            生成名称和密码
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
