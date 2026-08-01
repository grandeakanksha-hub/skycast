import type { ForecastData, ForecastDay, WeatherData } from '@/types';

export class WeatherError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WeatherError';
  }
}

const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const REVERSE_GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';

interface GeoResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country_code: string;
  country?: string;
  admin1?: string;
}

async function geocodeCity(city: string): Promise<GeoResult> {
  const url = `${GEO_URL}?name=${encodeURIComponent(
    city,
  )}&count=1&language=en&format=json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new WeatherError('Something went wrong while searching for the city. Please try again.');
  }

  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    throw new WeatherError('City not found. Please check the spelling and try again.');
  }

  return data.results[0] as GeoResult;
}

async function reverseGeocode(lat: number, lon: number): Promise<string> {
  const url = `${REVERSE_GEO_URL}?latitude=${lat}&longitude=${lon}&count=1&language=en&format=json`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return (data.results[0] as GeoResult).name;
      }
    }
  } catch {
    // fall through to coordinates
  }
  return `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
}

export async function fetchWeatherByCity(city: string): Promise<WeatherData> {
  const geo = await geocodeCity(city);
  return fetchWeatherByCoords(geo.latitude, geo.longitude, geo.name, geo.country_code);
}

export async function fetchWeatherByCoords(
  lat: number,
  lon: number,
  cityName?: string,
  countryCode?: string,
): Promise<WeatherData> {
  const url =
    `${FORECAST_URL}?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,pressure_msl` +
    `&daily=sunrise,sunset` +
    `&timezone=auto&forecast_days=1`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new WeatherError('Something went wrong while fetching the weather. Please try again.');
  }

  const data = await response.json();
  const c = data.current;
  const d = data.daily;

  const resolvedName = cityName ?? (await reverseGeocode(lat, lon));
  const resolvedCountry = countryCode ?? '';

  const sunriseStr = d.sunrise?.[0] as string | undefined;
  const sunsetStr = d.sunset?.[0] as string | undefined;

  return {
    city: resolvedName,
    country: resolvedCountry,
    temperature: Math.round(c.temperature_2m),
    feelsLike: Math.round(c.apparent_temperature),
    condition: weatherCodeToMain(c.weather_code),
    description: weatherCodeToDescription(c.weather_code),
    icon: String(c.weather_code),
    humidity: Math.round(c.relative_humidity_2m),
    windSpeed: Math.round(c.wind_speed_10m),
    pressure: Math.round(c.pressure_msl),
    sunrise: sunriseStr ? Date.parse(sunriseStr) / 1000 : 0,
    sunset: sunsetStr ? Date.parse(sunsetStr) / 1000 : 0,
    date: Date.parse(c.time) / 1000,
  };
}

export async function fetchForecastByCity(city: string): Promise<ForecastData> {
  const geo = await geocodeCity(city);
  return fetchForecastByCoords(geo.latitude, geo.longitude);
}

export async function fetchForecastByCoords(
  lat: number,
  lon: number,
): Promise<ForecastData> {
  const url =
    `${FORECAST_URL}?latitude=${lat}&longitude=${lon}` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
    `&timezone=auto&forecast_days=5`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new WeatherError('Something went wrong while fetching the forecast. Please try again.');
  }

  const data = await response.json();
  const d = data.daily;

  const list: ForecastDay[] = (d.time as string[]).map((iso, i) => {
    const dateObj = new Date(iso);
    return {
      day: dateObj.toLocaleDateString('en-US', { weekday: 'short' }),
      date: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      icon: String(d.weather_code[i]),
      condition: weatherCodeToMain(d.weather_code[i]),
      high: Math.round(d.temperature_2m_max[i]),
      low: Math.round(d.temperature_2m_min[i]),
    };
  });

  return { list };
}

function weatherCodeToMain(code: number): string {
  if (code === 0) return 'Clear';
  if (code <= 3) return 'Clouds';
  if (code <= 48) return 'Fog';
  if (code <= 67) return 'Rain';
  if (code <= 77) return 'Snow';
  if (code <= 82) return 'Rain';
  if (code <= 99) return 'Thunderstorm';
  return 'Unknown';
}

function weatherCodeToDescription(code: number): string {
  const map: Record<number, string> = {
    0: 'clear sky',
    1: 'mainly clear',
    2: 'partly cloudy',
    3: 'overcast',
    45: 'fog',
    48: 'depositing rime fog',
    51: 'light drizzle',
    53: 'moderate drizzle',
    55: 'dense drizzle',
    56: 'light freezing drizzle',
    57: 'dense freezing drizzle',
    61: 'slight rain',
    63: 'moderate rain',
    65: 'heavy rain',
    66: 'light freezing rain',
    67: 'heavy freezing rain',
    71: 'slight snow',
    73: 'moderate snow',
    75: 'heavy snow',
    77: 'snow grains',
    80: 'slight rain showers',
    81: 'moderate rain showers',
    82: 'violent rain showers',
    85: 'slight snow showers',
    86: 'heavy snow showers',
    95: 'thunderstorm',
    96: 'thunderstorm with slight hail',
    99: 'thunderstorm with heavy hail',
  };
  return map[code] ?? 'unknown';
}
