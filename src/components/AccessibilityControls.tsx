"use client";

import { useAccessibility } from "@/context/AccessibilityContext";

export default function AccessibilityControls() {
  const { fontSize, theme, increaseFontSize, decreaseFontSize, setTheme } = useAccessibility();

  const handleIncreaseFontSize = () => {
    try {
      increaseFontSize();
    } catch (error) {
      console.error('Erro ao aumentar fonte:', error);
    }
  };

  const handleDecreaseFontSize = () => {
    try {
      decreaseFontSize();
    } catch (error) {
      console.error('Erro ao diminuir fonte:', error);
    }
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'high-contrast') => {
    try {
      setTheme(newTheme);
    } catch (error) {
      console.error('Erro ao alterar tema:', error);
    }
  };

  return (
    <div className="accessibility-controls">
      <h3 className="text-sm font-semibold mb-3 text-foreground">
        Controles de Acessibilidade
      </h3>
      
      {/* Font Size Controls */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2">
          Tamanho da Fonte: {fontSize}
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleDecreaseFontSize}
            className="accessibility-button text-xs"
            aria-label="Diminuir tamanho da fonte"
            disabled={fontSize === 'small'}
          >
            A-
          </button>
          <button
            onClick={handleIncreaseFontSize}
            className="accessibility-button text-xs"
            aria-label="Aumentar tamanho da fonte"
            disabled={fontSize === 'extra-large'}
          >
            A+
          </button>
        </div>
      </div>

      {/* Theme Controls */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">
          Tema: {theme === 'light' ? 'Claro' : theme === 'dark' ? 'Escuro' : 'Alto Contraste'}
        </p>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => handleThemeChange('light')}
            className={`accessibility-button text-xs ${theme === 'light' ? 'opacity-50' : ''}`}
            aria-label="Ativar tema claro"
            disabled={theme === 'light'}
          >
            Claro
          </button>
          <button
            onClick={() => handleThemeChange('dark')}
            className={`accessibility-button text-xs ${theme === 'dark' ? 'opacity-50' : ''}`}
            aria-label="Ativar tema escuro"
            disabled={theme === 'dark'}
          >
            Escuro
          </button>
          <button
            onClick={() => handleThemeChange('high-contrast')}
            className={`accessibility-button text-xs ${theme === 'high-contrast' ? 'opacity-50' : ''}`}
            aria-label="Ativar tema de alto contraste"
            disabled={theme === 'high-contrast'}
          >
            Alto Contraste
          </button>
        </div>
      </div>
    </div>
  );
}
