import { useState, useEffect } from 'react';
import { UploadButton } from './UploadButton';

interface HeaderProps {
  setCurrentView: (view: string) => void;
}

export const Header = ({ setCurrentView }: HeaderProps) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const stored = localStorage.getItem('harmonyhub-theme');
      return stored === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('harmonyhub-theme', 'light');
      } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('harmonyhub-theme', 'dark');
      }
    } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <header className="w-full bg-transparent px-6 py-3 border-b border-gray-900 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={() => setCurrentView('browse')} className="text-2xl font-bold text-white hover:opacity-90">
          Harmony Hub
        </button>
        <div className="hidden sm:block text-sm text-gray-400">Your music, simplified</div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:block">
          <UploadButton />
        </div>
        <button onClick={toggleTheme} title="Toggle theme" className="p-2 rounded-full hover:bg-gray-800 transition-colors">
          {theme === 'dark' ? (
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM4.22 4.22a1 1 0 011.42 0l.71.71a1 1 0 11-1.42 1.42l-.71-.71a1 1 0 010-1.42zM2 10a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zM4.22 15.78a1 1 0 010-1.42l.71-.71a1 1 0 011.42 1.42l-.71.71a1 1 0 01-1.42 0zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM15.78 15.78a1 1 0 01-1.42 0l-.71-.71a1 1 0 011.42-1.42l.71.71a1 1 0 010 1.42zM17 10a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM15.78 4.22a1 1 0 000 1.42l.71.71a1 1 0 101.42-1.42l-.71-.71a1 1 0 00-1.42 0z" />
              <path d="M10 5a5 5 0 100 10A5 5 0 0010 5z" />
            </svg>
          )}
        </button>

        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold">
          U
        </div>
      </div>
    </header>
  );
};

export default Header;
