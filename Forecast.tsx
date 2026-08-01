import type { ForecastData } from '@/types';
import { WeatherIcon } from './WeatherIcon';

interface ForecastProps {
  data: ForecastData;
}

export function Forecast({ data }: ForecastProps) {
  return (
    <div className="animate-fade-in-up rounded-3xl border border-white/30 bg-white/50 p-5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/40 sm:p-6">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        5-Day Forecast
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {data.list.map((day, index) => (
          <div
            key={day.date}
            className="glass flex flex-col items-center gap-2 rounded-2xl border border-white/20 p-4 text-center transition-all hover:scale-105 hover:shadow-md dark:border-white/5"
            style={{
              animation: `fade-in-up 0.4s ease-out ${index * 0.08}s both`,
            }}
          >
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {day.day}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {day.date}
            </span>
            <WeatherIcon icon={day.icon} alt={day.condition} size="md" />
            <span className="text-xs capitalize text-slate-500 dark:text-slate-400">
              {day.condition}
            </span>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-slate-700 dark:text-white">
                {day.high}°
              </span>
              <span className="text-slate-400 dark:text-slate-500">
                {day.low}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
