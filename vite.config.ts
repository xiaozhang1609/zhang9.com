import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // 第三方库单独打包，减少变化频率
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'animation';
            }
            if (id.includes('lucide-react') || id.includes('react-icons')) {
              return 'icons';
            }
            if (id.includes('lodash')) {
              return 'utils';
            }
            return 'vendor';
          }
          
          // 工具组件按功能分组，避免单个文件变化影响所有组件
          if (id.includes('/components/tools/')) {
            if (id.includes('ComputerRepair')) {
              return 'repair-tools';
            }
            if (id.includes('WinMirror') || id.includes('OfficialWebsiteSearch')) {
              return 'system-tools';
            }
            return 'other-tools';
          }
        },
        // 使用更稳定的文件名策略
        chunkFileNames: (chunkInfo) => {
          // 对于 vendor 包使用内容 hash，对于业务代码使用版本号
          if (chunkInfo.name?.includes('vendor') || chunkInfo.name?.includes('react')) {
            return 'assets/[name]-[hash].js';
          }
          return 'assets/[name]-[hash:8].js';
        },
        entryFileNames: 'assets/entry-[hash:8].js',
        assetFileNames: 'assets/[name]-[hash:8].[ext]'
      }
    },
    // 启用更激进的代码分割
    cssCodeSplit: true,
    // 设置合理的 chunk 大小
    chunkSizeWarningLimit: 800,
    // 启用 sourcemap 便于调试
    sourcemap: false,
    // 优化依赖预构建
    commonjsOptions: {
      include: [/node_modules/]
    }
  },
  // 开发服务器配置
  server: {
    headers: {
      'Cache-Control': 'no-cache'
    }
  },
  // 优化依赖处理
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react']
  }
});
