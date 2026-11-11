import React from 'react';

/**
 * Script executed synchronously before DOM paint to prevent theme flash.
 */
export function ThemeScript() {
  const code = `
    (function() {
      try {
        var stored = localStorage.getItem('spendwise-theme');
        var isDark = false;
        if (stored === 'dark') {
          isDark = true;
        } else if (stored === 'light') {
          isDark = false;
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          isDark = true;
        }
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
