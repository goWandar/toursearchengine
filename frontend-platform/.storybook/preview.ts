import type { Preview } from '@storybook/nextjs-vite';
import './storybook.css';
import React from 'react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo',
    },

    backgrounds: {
      disable: true,
    },

    docs: {
      // Enable docs instead of disabling them
      canvas: {
        sourceState: 'hidden',
      },
      story: {
        inline: false,
        iframeHeight: 400,
      },
    },
  },

  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'circlehollow', title: 'Light' },
          { value: 'dark', icon: 'circle', title: 'Dark' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';

      React.useEffect(() => {
        const root = document.documentElement;
        const body = document.body;
        
        // Remove existing theme classes
        root.classList.remove('light', 'dark');
        body.classList.remove('light', 'dark');
        
        // Add new theme class
        root.classList.add(theme);
        body.classList.add(theme);
        root.setAttribute('data-theme', theme);
        
        // Force update CSS variables for immediate effect
        if (theme === 'dark') {
          root.style.setProperty('--color-background', 'hsl(0 0% 3.9%)');
          root.style.setProperty('--color-foreground', 'hsl(0 0% 98%)');
        } else {
          root.style.setProperty('--color-background', 'hsl(0 0% 100%)');
          root.style.setProperty('--color-foreground', 'hsl(0 0% 3.9%)');
        }
      }, [theme]);

      return React.createElement(
        'div',
        { 
          className: `${theme} min-h-screen`,
          style: { 
            minHeight: '100vh',
            backgroundColor: 'var(--color-background)',
            color: 'var(--color-foreground)',
            '--fallback-bg': theme === 'dark' ? '#0a0a0a' : '#ffffff',
            '--fallback-fg': theme === 'dark' ? '#fafafa' : '#0a0a0a',
          } as React.CSSProperties
        },
        React.createElement(
          'div',
          { className: 'p-4' },
          React.createElement(Story, null)
        )
      );
    },
  ],
};

export default preview;
