import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  targetTime: string;
  label?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function calculateTimeLeft(targetTime: string): TimeLeft {
  const difference = new Date(targetTime).getTime() - new Date().getTime();
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isExpired: false,
  };
}

export function CountdownTimer({ targetTime, label = "Time remaining" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  if (timeLeft.isExpired) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground" data-testid="countdown-expired">
        <Clock className="h-3 w-3" />
        <span>{label}: Expired</span>
      </div>
    );
  }

  const parts = [];
  if (timeLeft.days > 0) parts.push(`${timeLeft.days}d`);
  if (timeLeft.hours > 0 || timeLeft.days > 0) parts.push(`${timeLeft.hours}h`);
  if (timeLeft.minutes > 0 || timeLeft.hours > 0 || timeLeft.days > 0) parts.push(`${timeLeft.minutes}m`);
  parts.push(`${timeLeft.seconds}s`);

  return (
    <div className="flex items-center gap-1.5 text-xs" data-testid="countdown-timer">
      <Clock className="h-3 w-3 text-primary animate-pulse" />
      <span className="font-medium text-primary">{label}: {parts.join(' ')}</span>
    </div>
  );
}
