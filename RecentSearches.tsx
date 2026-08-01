import { History, Trash2 } from 'lucide-react';

interface RecentSearchesProps {
  history: string[];
  onSelect: (city: string) => void;
  onClear: () => void;
}

export function RecentSearches({
  history,
  onSelect,
  onClear,
}: RecentSearchesProps) {
  if (history.length === 0) return null;

  return (
    <div className="animate-fade-in flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        <History className="h-3.5 w-3.5" />
        Recent
      </div>
      {history.map((city) => (
        <button
          key={city}
          onClick={() => onSelect(city)}
          className="glass rounded-full border border-white/30 px-3 py-1.5 text-sm font-medium text-slate-600 transition-all hover:scale-105 hover:text-sky-600 dark:border-white/10 dark:text-slate-300 dark:hover:text-sky-400"
        >
          {city}
        </button>
      ))}
      <button
        onClick={onClear}
        className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-red-100/50 hover:text-red-500 dark:hover:bg-red-500/10"
        aria-label="Clear recent searches"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
