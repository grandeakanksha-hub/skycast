import { Clock, Droplets, Gauge, Sunrise, Sunset, Wind } from 'lucide-react';
import type { WeatherData } from '@/types';
import { WeatherIcon } from './WeatherIcon';

interface CurrentWeatherProps {
  data: WeatherData;
}

function formatTime(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDateTime(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function CurrentWeather({ data }: CurrentWeatherProps) {
  const stats = [
    {
      icon: <Droplets className="h-5 w-5" />,
      label: 'Humidity',
      value: `${data.humidity}%`,
    },
    {
      icon: <Wind className="h-5 w-5" />,
      label: 'Wind',
      value: `${data.windSpeed} km/h`,
    },
    {
      icon: <Gauge className="h-5 w-5" />,
      label: 'Pressure',
      value: `${data.pressure} hPa`,
    },
    {
      icon: <Sunrise className="h-5 w-5" />,
      label: 'Sunrise',
      value: formatTime(data.sunrise),
    },
    {
      icon: <Sunset className="h-5 w-5" />,
      label: 'Sunset',
      value: formatTime(data.sunset),
    },
  ];

  return (
    <div className="glass-strong animate-scale-in rounded-3xl border border-white/30 p-6 shadow-xl dark:border-white/10 sm:p-8">
      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
        <Clock className="h-4 w-4" />
        <span className="text-sm font-medium">{formatDateTime(data.date)}</span>
      </div>

      <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white sm:text-3xl">
            {data.city}, {data.country}
          </h2>
          <p className="mt-1 text-sm capitalize text-slate-500 dark:text-slate-400">
            {data.description}
          </p>
          <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
            Feels like {data.feelsLike}°
          </p>
        </div>
        <div className="flex items-center gap-3">
          <WeatherIcon icon={data.icon} alt={data.condition} size="xl" />
          <span className="text-6xl font-extralight text-slate-800 dark:text-white sm:text-7xl">
            {data.temperature}°
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="glass flex flex-col items-center gap-1.5 rounded-2xl border border-white/20 p-3 text-center transition-transform hover:scale-105 dark:border-white/5"
          >
            <span className="text-sky-500 dark:text-sky-400">{stat.icon}</span>
            <span className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
              {stat.label}
            </span>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
