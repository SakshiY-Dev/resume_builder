import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { SkillsForm } from './forms/SkillsForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { ProjectsForm } from './forms/ProjectsForm';
import { EducationForm } from './forms/EducationForm';
import { AchievementsForm } from './forms/AchievementsForm';
import { ModernTemplate } from './preview/ModernTemplate';

const formComponents = [
  PersonalInfoForm,
  SkillsForm,
  ExperienceForm,
  ProjectsForm,
  EducationForm,
  AchievementsForm,
];

export function PortfolioBuilder() {
  const { state } = usePortfolio();
  const { currentStep, previewMode } = state.settings;
  const CurrentForm = formComponents[currentStep];

  if (previewMode === 'full') {
    return (
      <div className="min-h-screen p-8">
        <div id="portfolio-preview">
          <ModernTemplate data={state.portfolioData} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Form Section */}
      <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 overflow-y-auto">
        <div className="p-6">
          <CurrentForm />
        </div>
      </div>

      {/* Preview Section */}
      <div className="w-full lg:w-1/2 bg-gray-100 dark:bg-gray-900 overflow-y-auto">
        <div className="p-6">
          <div className="sticky top-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Live Preview</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your portfolio updates automatically as you fill out the form
              </p>
            </div>
            <div id="portfolio-preview" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <ModernTemplate data={state.portfolioData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}