export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  date: number;
}

export interface ForecastDay {
  day: string;
  date: string;
  icon: string;
  condition: string;
  high: number;
  low: number;
}

export interface ForecastData {
  list: ForecastDay[];
}
