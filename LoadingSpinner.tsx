import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-sky-200 dark:border-slate-700" />
        <Loader2 className="absolute inset-0 m-auto h-16 w-16 animate-spin text-sky-500" />
      </div>
      <p className="animate-pulse text-sm font-medium text-slate-500 dark:text-slate-400">
        Fetching the latest weather...
      </p>
    </div>
  );
}
