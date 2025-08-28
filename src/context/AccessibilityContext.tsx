"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type FontSize = 'small' | 'medium' | 'large' | 'extra-large';
type Theme = 'light' | 'dark' | 'high-contrast';

interface AccessibilityContextType {
  fontSize: FontSize;
  theme: Theme;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  setTheme: (theme: Theme) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

interface AccessibilityProviderProps {
  children: ReactNode;
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [theme, setThemeState] = useState<Theme>('light');

  // Load saved preferences from localStorage
  useEffect(() => {
    try {
      const savedFontSize = localStorage.getItem('accessibility-font-size') as FontSize;
      const savedTheme = localStorage.getItem('accessibility-theme') as Theme;
      
      if (savedFontSize && ['small', 'medium', 'large', 'extra-large'].includes(savedFontSize)) {
        setFontSize(savedFontSize);
      }
      
      if (savedTheme && ['light', 'dark', 'high-contrast'].includes(savedTheme)) {
        setThemeState(savedTheme);
      }
    } catch (error) {
      console.error('Error loading accessibility preferences:', error);
    }
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('accessibility-font-size', fontSize);
      localStorage.setItem('accessibility-theme', theme);
    } catch (error) {
      console.error('Error saving accessibility preferences:', error);
    }
  }, [fontSize, theme]);

  const increaseFontSize = () => {
    try {
      setFontSize(current => {
        switch (current) {
          case 'small': return 'medium';
          case 'medium': return 'large';
          case 'large': return 'extra-large';
          case 'extra-large': return 'extra-large';
          default: return 'medium';
        }
      });
    } catch (error) {
      console.error('Error increasing font size:', error);
    }
  };

  const decreaseFontSize = () => {
    try {
      setFontSize(current => {
        switch (current) {
          case 'extra-large': return 'large';
          case 'large': return 'medium';
          case 'medium': return 'small';
          case 'small': return 'small';
          default: return 'medium';
        }
      });
    } catch (error) {
      console.error('Error decreasing font size:', error);
    }
  };

  const setTheme = (newTheme: Theme) => {
    try {
      setThemeState(newTheme);
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  };

  const value = {
    fontSize,
    theme,
    increaseFontSize,
    decreaseFontSize,
    setTheme,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      <div className={`font-size-${fontSize} theme-${theme}`}>
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
