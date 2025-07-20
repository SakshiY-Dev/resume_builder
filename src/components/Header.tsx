import React, { useState } from 'react';
import { Moon, Sun, Monitor, Palette, Eye, Download, Trash2, Save } from 'lucide-react';
import { Button } from './common/Button';
import { usePortfolio } from '../context/PortfolioContext';
import { Toast } from './common/Toast';
import { exportToPDF } from '../utils/pdfExport';
import { TemplateType } from '../types/portfolio';

export function Header() {
  const { state, dispatch, clearData } = usePortfolio();
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'warning'; message: string } | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const toggleTheme = () => {
    dispatch({
      type: 'SET_THEME',
      payload: state.settings.theme === 'light' ? 'dark' : 'light'
    });
  };

  const togglePreviewMode = () => {
    dispatch({
      type: 'SET_PREVIEW_MODE',
      payload: state.settings.previewMode === 'split' ? 'full' : 'split'
    });
  };

  const handleTemplateChange = (template: TemplateType) => {
    dispatch({ type: 'SET_TEMPLATE', payload: template });
    setToast({ type: 'success', message: `Switched to ${template} template` });
  };

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      await exportToPDF('portfolio-preview', `${state.portfolioData.personalInfo.fullName || 'portfolio'}.pdf`);
      setToast({ type: 'success', message: 'Portfolio exported as PDF successfully!' });
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to export PDF. Please try again.' });
    } finally {
      setIsExporting(false);
    }
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all portfolio data? This action cannot be undone.')) {
      clearData();
      setToast({ type: 'warning', message: 'All portfolio data has been cleared' });
    }
  };

  const handleSaveData = () => {
    setToast({ type: 'success', message: 'Portfolio data saved successfully!' });
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Portfolio Generator
            </h1>
            <div className="hidden md:flex items-center space-x-2">
              <Palette className="w-4 h-4 text-gray-500" />
              <select
                value={state.settings.selectedTemplate}
                onChange={(e) => handleTemplateChange(e.target.value as TemplateType)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
                <option value="creative">Creative</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePreviewMode}
              icon={Eye}
            >
              <span className="hidden sm:inline">
                {state.settings.previewMode === 'split' ? 'Full Preview' : 'Split View'}
              </span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              icon={state.settings.theme === 'light' ? Moon : Sun}
            >
              <span className="hidden sm:inline">
                {state.settings.theme === 'light' ? 'Dark' : 'Light'}
              </span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveData}
              icon={Save}
            >
              <span className="hidden sm:inline">Save</span>
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={handleExportPDF}
              loading={isExporting}
              icon={Download}
            >
              <span className="hidden sm:inline">Export PDF</span>
            </Button>

            <Button
              variant="danger"
              size="sm"
              onClick={handleClearData}
              icon={Trash2}
            >
              <span className="hidden sm:inline">Clear</span>
            </Button>
          </div>
        </div>
      </header>

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}