import { useCallback, useEffect, useState } from 'react';
import { CurrentWeather } from '@/components/CurrentWeather';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Forecast } from '@/components/Forecast';
import { Header } from '@/components/Header';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { RecentSearches } from '@/components/RecentSearches';
import { SearchBar } from '@/components/SearchBar';
import { useSearchHistory } from '@/hooks/useSearchHistory';
import { useTheme } from '@/hooks/useTheme';
import {
  fetchForecastByCity,
  fetchWeatherByCity,
  WeatherError,
} from '@/services/weatherService';
import type { ForecastData, WeatherData } from '@/types';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { history, addCity, clearHistory } = useSearchHistory();

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchedCity, setSearchedCity] = useState<string | null>(null);

  const handleSearch = useCallback(
    async (city: string) => {
      setLoading(true);
      setError(null);
      setSearchedCity(city);
      try {
        const weatherData = await fetchWeatherByCity(city);
        setWeather(weatherData);
        const forecastData = await fetchForecastByCity(city);
        setForecast(forecastData);
        addCity(city);
      } catch (err) {
        if (err instanceof WeatherError) {
          setError(err.message);
        } else {
          setError('Something went wrong. Please check your connection and try again.');
        }
        setWeather(null);
        setForecast(null);
      } finally {
        setLoading(false);
      }
    },
    [addCity],
  );

  useEffect(() => {
    handleSearch('London');
  }, [handleSearch]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 transition-colors duration-500 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Decorative blurred orbs */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/20 blur-3xl dark:bg-sky-500/10" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-300/20 blur-3xl dark:bg-indigo-500/10" />

      <main className="relative z-10 mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
        <Header theme={theme} onToggleTheme={toggleTheme} />

        <div className="mt-6 space-y-4">
          <SearchBar onSearch={handleSearch} loading={loading} />

          <RecentSearches
            history={history}
            onSelect={handleSearch}
            onClear={clearHistory}
          />

          {loading && <LoadingSpinner />}

          {!loading && error && (
            <ErrorMessage
              message={error}
              onRetry={searchedCity ? () => handleSearch(searchedCity) : undefined}
            />
          )}

          {!loading && !error && weather && (
            <div className="space-y-4">
              <CurrentWeather data={weather} />
              {forecast && <Forecast data={forecast} />}
            </div>
          )}
        </div>

        <footer className="mt-8 text-center text-xs text-white/60 dark:text-slate-500">
          Weather data by Open-Meteo
        </footer>
      </main>
    </div>
  );
}
