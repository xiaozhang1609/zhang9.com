// 新建动态导入工具
interface ImportOptions {
  maxRetries?: number;
  retryDelay?: number;
  fallbackComponent?: React.ComponentType;
}

export function createRobustImport<T = any>(
  importFn: () => Promise<T>,
  options: ImportOptions = {}
) {
  const { maxRetries = 3, retryDelay = 1000, fallbackComponent } = options;
  
  return async (): Promise<T> => {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await importFn();
      } catch (error) {
        lastError = error as Error;
        
        // 检查是否是 chunk 加载失败
        const isChunkError = 
          error instanceof Error && 
          (error.message.includes('Loading chunk') || 
           error.message.includes('Failed to fetch dynamically imported module'));
        
        if (isChunkError && attempt < maxRetries) {
          console.warn(`Chunk loading failed, attempt ${attempt + 1}/${maxRetries + 1}`, error);
          
          // 等待后重试
          await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
          continue;
        }
        
        // 如果是最后一次尝试或非 chunk 错误，抛出错误
        throw error;
      }
    }
    
    throw lastError!;
  };
}

// 创建带版本检查的导入函数
export function createVersionAwareImport<T = any>(importFn: () => Promise<T>) {
  return createRobustImport(async () => {
    try {
      return await importFn();
    } catch (error) {
      // 如果是 chunk 错误，检查是否需要刷新页面
      if (error instanceof Error && 
          (error.message.includes('Loading chunk') || 
           error.message.includes('Failed to fetch dynamically imported module'))) {
        
        // 检查页面版本是否过期
        const shouldReload = await checkIfPageNeedsReload();
        if (shouldReload) {
          // 显示友好提示并刷新
          showReloadPrompt();
          throw new Error('Page version outdated, reload required');
        }
      }
      throw error;
    }
  });
}

// 检查页面是否需要重新加载
async function checkIfPageNeedsReload(): Promise<boolean> {
  try {
    // 尝试获取当前页面的 HTML
    const response = await fetch(window.location.href, { 
      cache: 'no-cache',
      headers: { 'Cache-Control': 'no-cache' }
    });
    
    if (!response.ok) return false;
    
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // 比较当前页面的脚本标签和新获取的脚本标签
    const currentScripts = Array.from(document.querySelectorAll('script[src]'))
      .map(script => (script as HTMLScriptElement).src);
    const newScripts = Array.from(doc.querySelectorAll('script[src]'))
      .map(script => (script as HTMLScriptElement).src);
    
    // 如果脚本文件有变化，说明需要重新加载
    return !arraysEqual(currentScripts, newScripts);
  } catch {
    return true; // 如果检查失败，保守地建议重新加载
  }
}

function arraysEqual(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((val, i) => val === b[i]);
}

function showReloadPrompt(): void {
  const message = '页面已更新到新版本，需要刷新以获取最新功能。';
  
  // 创建自定义提示框
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    font-family: system-ui, -apple-system, sans-serif;
  `;
  
  const modal = document.createElement('div');
  modal.style.cssText = `
    background: white;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    text-align: center;
    max-width: 400px;
    margin: 20px;
  `;
  
  modal.innerHTML = `
    <h3 style="margin: 0 0 16px 0; color: #1f2937;">页面更新</h3>
    <p style="margin: 0 0 20px 0; color: #6b7280; line-height: 1.5;">${message}</p>
    <button id="reload-btn" style="
      background: #4f46e5;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    ">立即刷新</button>
  `;
  
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  
  // 绑定刷新事件
  document.getElementById('reload-btn')?.addEventListener('click', () => {
    window.location.reload();
  });
  
  // 5秒后自动刷新
  setTimeout(() => {
    window.location.reload();
  }, 5000);
}