// 版本检查工具
interface VersionInfo {
  version: string;
  buildTime: string;
  hash: string;
}

class VersionChecker {
  private currentVersion: VersionInfo | null = null;
  private checkInterval: number | null = null;
  private readonly CHECK_INTERVAL = 5 * 60 * 1000; // 5分钟检查一次

  constructor() {
    this.init();
  }

  private async init() {
    // 从页面中提取版本信息
    this.currentVersion = this.extractVersionFromPage();
    
    // 开始定期检查
    this.startPeriodicCheck();
  }

  private extractVersionFromPage(): VersionInfo | null {
    try {
      // 从脚本文件名中提取 hash
      const scripts = Array.from(document.querySelectorAll('script[src]'));
      const mainScript = scripts.find(script => 
        (script as HTMLScriptElement).src.includes('/assets/index-')
      ) as HTMLScriptElement;

      if (mainScript) {
        const match = mainScript.src.match(/index-([a-zA-Z0-9_-]+)\.js/);
        if (match) {
          return {
            version: '1.0.0', // 可以从 package.json 读取
            buildTime: new Date().toISOString(),
            hash: match[1]
          };
        }
      }
    } catch (error) {
      console.warn('Failed to extract version info:', error);
    }
    return null;
  }

  private async checkForUpdates(): Promise<boolean> {
    try {
      const response = await fetch(window.location.href, {
        cache: 'no-cache',
        headers: { 'Cache-Control': 'no-cache' }
      });

      if (!response.ok) return false;

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // 检查主脚本文件是否有变化
      const newScripts = Array.from(doc.querySelectorAll('script[src]'));
      const newMainScript = newScripts.find(script => 
        (script as HTMLScriptElement).src.includes('/assets/index-')
      ) as HTMLScriptElement;

      if (newMainScript && this.currentVersion) {
        const newMatch = newMainScript.src.match(/index-([a-zA-Z0-9_-]+)\.js/);
        if (newMatch && newMatch[1] !== this.currentVersion.hash) {
          return true; // 发现新版本
        }
      }

      return false;
    } catch (error) {
      console.warn('Version check failed:', error);
      return false;
    }
  }

  private startPeriodicCheck() {
    this.checkInterval = window.setInterval(async () => {
      const hasUpdate = await this.checkForUpdates();
      if (hasUpdate) {
        this.notifyUpdate();
      }
    }, this.CHECK_INTERVAL);
  }

  private notifyUpdate() {
    // 显示更新提示
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4f46e5;
      color: white;
      padding: 16px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      font-family: system-ui, -apple-system, sans-serif;
      max-width: 300px;
      animation: slideIn 0.3s ease-out;
    `;

    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <div>
          <div style="font-weight: 600; margin-bottom: 4px;">发现新版本</div>
          <div style="font-size: 14px; opacity: 0.9;">点击刷新获取最新功能</div>
        </div>
        <button id="update-btn" style="
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
        ">刷新</button>
      </div>
    `;

    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // 绑定刷新事件
    document.getElementById('update-btn')?.addEventListener('click', () => {
      window.location.reload();
    });

    // 10秒后自动消失
    setTimeout(() => {
      notification.remove();
    }, 10000);
  }

  public destroy() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }
}

// 导出单例
export const versionChecker = new VersionChecker();