import { useState, type FormEvent } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

export function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed && !loading) {
      onSearch(trimmed);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="glass-strong flex items-center gap-2 rounded-2xl border border-white/30 px-4 py-3 shadow-lg transition-all focus-within:border-sky-400/60 focus-within:shadow-sky-400/20 dark:border-white/10 dark:focus-within:border-sky-500/50">
        <Search className="h-5 w-5 shrink-0 text-slate-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search for a city..."
          className="w-full bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none dark:text-slate-200 dark:placeholder-slate-500 sm:text-base"
          aria-label="City name"
        />
        {value && (
          <button
            type="button"
            onClick={() => setValue('')}
            className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-200/50 hover:text-slate-600 dark:hover:bg-slate-700/50"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <button
          type="submit"
          disabled={loading || !value.trim()}
          className="rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:from-sky-600 hover:to-blue-700 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5"
        >
          Search
        </button>
      </div>
    </form>
  );
}
