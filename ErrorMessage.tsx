import { MapPinOff } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="animate-scale-in flex flex-col items-center justify-center gap-4 rounded-3xl border border-red-200/50 bg-red-50/60 p-8 text-center backdrop-blur-xl dark:border-red-500/20 dark:bg-red-500/10">
      <div className="rounded-full bg-red-100 p-4 dark:bg-red-500/20">
        <MapPinOff className="h-8 w-8 text-red-500 dark:text-red-400" />
      </div>
      <p className="max-w-sm text-sm text-red-600 dark:text-red-300">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-5 py-2 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg active:scale-95"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
