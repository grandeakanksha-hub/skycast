import { Moon, Sun, CloudSun } from 'lucide-react';
import type { Theme } from '@/hooks/useTheme';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 p-2.5 shadow-lg">
          <CloudSun className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-800 dark:text-white sm:text-xl">
            Weather Forecast
          </h1>
          <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
            Real-time conditions & 5-day outlook
          </p>
        </div>
      </div>
      <button
        onClick={onToggleTheme}
        className="glass-strong flex items-center gap-2 rounded-xl border border-white/30 px-3 py-2 text-sm font-medium text-slate-600 shadow-md transition-all hover:scale-105 active:scale-95 dark:border-white/10 dark:text-slate-300"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <>
            <Sun className="h-4 w-4" />
            <span className="hidden sm:inline">Light</span>
          </>
        ) : (
          <>
            <Moon className="h-4 w-4" />
            <span className="hidden sm:inline">Dark</span>
          </>
        )}
      </button>
    </header>
  );
}
