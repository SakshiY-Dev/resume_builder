import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { PortfolioData, AppSettings, TemplateType, ThemeType } from '../types/portfolio';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage';

interface PortfolioState {
  portfolioData: PortfolioData;
  settings: AppSettings;
}

type PortfolioAction =
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<PortfolioData['personalInfo']> }
  | { type: 'UPDATE_SKILLS'; payload: PortfolioData['skills'] }
  | { type: 'UPDATE_EXPERIENCE'; payload: PortfolioData['experience'] }
  | { type: 'UPDATE_PROJECTS'; payload: PortfolioData['projects'] }
  | { type: 'UPDATE_EDUCATION'; payload: PortfolioData['education'] }
  | { type: 'UPDATE_ACHIEVEMENTS'; payload: PortfolioData['achievements'] }
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'SET_TEMPLATE'; payload: TemplateType }
  | { type: 'SET_THEME'; payload: ThemeType }
  | { type: 'SET_PREVIEW_MODE'; payload: 'split' | 'full' }
  | { type: 'LOAD_DATA'; payload: PortfolioState }
  | { type: 'CLEAR_ALL_DATA' };

const initialPortfolioData: PortfolioData = {
  personalInfo: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    profilePicture: '',
    summary: ''
  },
  skills: [],
  experience: [],
  projects: [],
  education: [],
  achievements: []
};

const initialSettings: AppSettings = {
  currentStep: 0,
  selectedTemplate: 'modern',
  theme: 'light',
  previewMode: 'split'
};

const initialState: PortfolioState = {
  portfolioData: initialPortfolioData,
  settings: initialSettings
};

function portfolioReducer(state: PortfolioState, action: PortfolioAction): PortfolioState {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        portfolioData: {
          ...state.portfolioData,
          personalInfo: { ...state.portfolioData.personalInfo, ...action.payload }
        }
      };
    case 'UPDATE_SKILLS':
      return {
        ...state,
        portfolioData: { ...state.portfolioData, skills: action.payload }
      };
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        portfolioData: { ...state.portfolioData, experience: action.payload }
      };
    case 'UPDATE_PROJECTS':
      return {
        ...state,
        portfolioData: { ...state.portfolioData, projects: action.payload }
      };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        portfolioData: { ...state.portfolioData, education: action.payload }
      };
    case 'UPDATE_ACHIEVEMENTS':
      return {
        ...state,
        portfolioData: { ...state.portfolioData, achievements: action.payload }
      };
    case 'SET_CURRENT_STEP':
      return {
        ...state,
        settings: { ...state.settings, currentStep: action.payload }
      };
    case 'SET_TEMPLATE':
      return {
        ...state,
        settings: { ...state.settings, selectedTemplate: action.payload }
      };
    case 'SET_THEME':
      return {
        ...state,
        settings: { ...state.settings, theme: action.payload }
      };
    case 'SET_PREVIEW_MODE':
      return {
        ...state,
        settings: { ...state.settings, previewMode: action.payload }
      };
    case 'LOAD_DATA':
      return action.payload;
    case 'CLEAR_ALL_DATA':
      return initialState;
    default:
      return state;
  }
}

interface PortfolioContextType {
  state: PortfolioState;
  dispatch: React.Dispatch<PortfolioAction>;
  saveData: () => void;
  loadData: () => void;
  clearData: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(portfolioReducer, initialState);

  const saveData = () => {
    saveToLocalStorage('portfolioData', state);
  };

  const loadData = () => {
    const savedData = loadFromLocalStorage('portfolioData');
    if (savedData) {
      dispatch({ type: 'LOAD_DATA', payload: savedData });
    }
  };

  const clearData = () => {
    dispatch({ type: 'CLEAR_ALL_DATA' });
    localStorage.removeItem('portfolioData');
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (state.portfolioData.personalInfo.fullName) {
      saveData();
    }
  }, [state]);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark && state.settings.theme === 'light') {
      dispatch({ type: 'SET_THEME', payload: 'dark' });
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.settings.theme === 'dark');
  }, [state.settings.theme]);

  return (
    <PortfolioContext.Provider value={{ state, dispatch, saveData, loadData, clearData }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}