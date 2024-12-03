import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FolderTree, Download, Copy, Upload, FileText, Folder } from 'lucide-react';

interface FileStructure {
  [key: string]: FileStructure | null;
}

interface Stats {
  files: number;
  folders: number;
  depth: number;
}

export default function FileTree() {
  const { t } = useTranslation();
  const [structure, setStructure] = useState<FileStructure | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);

  const calculateStats = useCallback((struct: FileStructure, depth = 1): Stats => {
    let stats = { files: 0, folders: 0, depth };
    
    Object.entries(struct).forEach(([_, value]) => {
      if (value === null) {
        stats.files++;
      } else {
        stats.folders++;
        const subStats = calculateStats(value, depth + 1);
        stats.files += subStats.files;
        stats.folders += subStats.folders;
        stats.depth = Math.max(stats.depth, subStats.depth);
      }
    });
    
    return stats;
  }, []);

  const handleFiles = useCallback((files: FileList) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      const fileStructure: FileStructure = {};
      
      for (const file of files) {
        const parts = file.webkitRelativePath.split('/');
        let current = fileStructure;
        
        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];
          if (i === parts.length - 1) {
            current[part] = null;
          } else {
            current[part] = current[part] || {};
            current = current[part] as FileStructure;
          }
        }
      }
      
      setStructure(fileStructure);
      setStats(calculateStats(fileStructure));
    } catch (err) {
      setError(t('processError'));
      console.error('Error processing files:', err);
    } finally {
      setIsProcessing(false);
    }
  }, [t, calculateStats]);

  const formatStructure = useCallback((struct: FileStructure, prefix = ''): string => {
    const entries = Object.entries(struct).sort(([a], [b]) => {
      const aIsFolder = struct[a] !== null;
      const bIsFolder = struct[b] !== null;
      if (aIsFolder === bIsFolder) return a.localeCompare(b);
      return aIsFolder ? -1 : 1;
    });

    return entries.reduce((result, [key, value], index) => {
      const isLast = index === entries.length - 1;
      const isFolder = value !== null;
      const icon = isFolder ? '📁 ' : '📄 ';
      const line = `${prefix}${isLast ? '└── ' : '├── '}${icon}${key}\n`;
      
      if (value !== null) {
        const newPrefix = prefix + (isLast ? '    ' : '│   ');
        return result + line + formatStructure(value, newPrefix);
      }
      return result + line;
    }, '');
  }, []);

  const downloadStructure = useCallback(() => {
    if (!structure) return;
    
    const content = formatStructure(structure);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'directory_structure.txt';
    link.click();
    URL.revokeObjectURL(url);
  }, [structure, formatStructure]);

  const copyToClipboard = useCallback(() => {
    if (!structure) return;
    
    navigator.clipboard.writeText(formatStructure(structure))
      .then(() => alert(t('copiedToClipboard')))
      .catch(() => setError(t('copyFailed')));
  }, [structure, formatStructure, t]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      <div className="card p-6 md:p-8">
        {/* Header section - 保持原有样式 */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
          <div className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-2xl">
            <FolderTree className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50">
              {t('fileTree')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1.5 text-sm md:text-base">
              {t('fileTreeDesc')}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Upload area */}
          <div
            className={`relative w-full border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
              isProcessing
                ? 'border-gray-400 bg-gray-50'
                : 'border-gray-300 hover:border-blue-500 dark:border-gray-700 dark:hover:border-blue-400'
            }`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFiles(e.dataTransfer.files);
            }}
            onClick={() => {
              if (isProcessing) return;
              const input = document.createElement('input');
              input.type = 'file';
              input.webkitdirectory = true;
              input.multiple = true;
              input.onchange = (e) => {
                const files = (e.target as HTMLInputElement).files;
                if (files) handleFiles(files);
              };
              input.click();
            }}
          >
            {isProcessing ? (
              <div className="animate-pulse">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-300 dark:bg-gray-600" />
                <p className="text-gray-500 dark:text-gray-400">{t('processing')}</p>
              </div>
            ) : (
              <>
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
                <p className="text-gray-600 dark:text-gray-400">{t('dragAndDropFolder')}</p>
              </>
            )}
          </div>

          {/* Stats display */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <Folder className="w-5 h-5" />
                  <span className="font-medium">{t('folders')}</span>
                </div>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300 mt-2">
                  {stats.folders}
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">{t('files')}</span>
                </div>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300 mt-2">
                  {stats.files}
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                  <FolderTree className="w-5 h-5" />
                  <span className="font-medium">{t('depth')}</span>
                </div>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300 mt-2">
                  {stats.depth}
                </p>
              </div>
            </div>
          )}

          {structure && (
            <>
              <div className="flex gap-4">
                <button
                  onClick={downloadStructure}
                  className="flex-1 h-11 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors"
                >
                  <Download className="w-5 h-5" />
                  {t('download')}
                </button>
                <button
                  onClick={copyToClipboard}
                  className="flex-1 h-11 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl transition-colors"
                >
                  <Copy className="w-5 h-5" />
                  {t('copy')}
                </button>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  {t('preview')}
                </h2>
                <pre className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-sm font-mono whitespace-pre overflow-x-auto">
                  {formatStructure(structure)}
                </pre>
              </div>
            </>
          )}

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}