import React from 'react';
import { ChevronLeft, ChevronRight, User, Star, Briefcase, Code, GraduationCap, Award } from 'lucide-react';
import { Button } from './common/Button';
import { usePortfolio } from '../context/PortfolioContext';

const steps = [
  { id: 0, title: 'Personal Info', icon: User },
  { id: 1, title: 'Skills', icon: Star },
  { id: 2, title: 'Experience', icon: Briefcase },
  { id: 3, title: 'Projects', icon: Code },
  { id: 4, title: 'Education', icon: GraduationCap },
  { id: 5, title: 'Achievements', icon: Award },
];

export function StepNavigation() {
  const { state, dispatch } = usePortfolio();
  const currentStep = state.settings.currentStep;

  const goToStep = (step: number) => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: step });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      dispatch({ type: 'SET_CURRENT_STEP', payload: currentStep + 1 });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      dispatch({ type: 'SET_CURRENT_STEP', payload: currentStep - 1 });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
      {/* Step Indicators */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => goToStep(step.id)}
                  className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors min-w-0 ${
                    isActive
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                      : isCompleted
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 hover:bg-green-200'
                      : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : isCompleted
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium whitespace-nowrap">{step.title}</span>
                </button>
                
                {index < steps.length - 1 && (
                  <div className={`h-px w-8 ${
                    currentStep > step.id ? 'bg-green-400' : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          icon={ChevronLeft}
        >
          Previous
        </Button>
        
        <div className="flex space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400 self-center">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>

        <Button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          icon={ChevronRight}
          iconPosition="right"
        >
          Next
        </Button>
      </div>
    </div>
  );
}