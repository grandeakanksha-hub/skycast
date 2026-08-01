import { Cloud, CloudFog, CloudLightning, CloudRain, CloudSnow, CloudSun, Cloudy, Moon, Sun, type LucideIcon } from 'lucide-react';

interface WeatherIconProps {
  icon: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: 'h-7 w-7',
  md: 'h-12 w-12',
  lg: 'h-20 w-20',
  xl: 'h-28 w-28',
};

function iconForCode(codeStr: string): { Icon: LucideIcon; color: string } {
  const code = Number(codeStr);
  if (code === 0) return { Icon: Sun, color: 'text-amber-400' };
  if (code === 1) return { Icon: CloudSun, color: 'text-amber-300' };
  if (code === 2) return { Icon: CloudSun, color: 'text-slate-300' };
  if (code === 3) return { Icon: Cloudy, color: 'text-slate-300' };
  if (code === 45 || code === 48) return { Icon: CloudFog, color: 'text-slate-400' };
  if (code >= 51 && code <= 67) return { Icon: CloudRain, color: 'text-sky-400' };
  if (code >= 71 && code <= 77) return { Icon: CloudSnow, color: 'text-sky-200' };
  if (code >= 80 && code <= 82) return { Icon: CloudRain, color: 'text-sky-400' };
  if (code >= 85 && code <= 86) return { Icon: CloudSnow, color: 'text-sky-200' };
  if (code >= 95) return { Icon: CloudLightning, color: 'text-indigo-300' };
  return { Icon: Cloud, color: 'text-slate-300' };
}

export function WeatherIcon({
  icon,
  alt,
  size = 'md',
  className = '',
}: WeatherIconProps) {
  const { Icon, color } = iconForCode(icon);
  return (
    <span
      role="img"
      aria-label={alt}
      className={`inline-flex ${sizeMap[size]} ${color} ${className} drop-shadow-lg`}
    >
      <Icon className="h-full w-full" strokeWidth={1.5} />
    </span>
  );
}

export function WeatherMoonIcon({ className = '' }: { className?: string }) {
  return <Moon className={className} />;
}
