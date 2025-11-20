import { Vote, Shield, Lock } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

export function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
    xl: "text-4xl"
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative shine-effect">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl blur-sm opacity-75"></div>
        <div className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 p-2 rounded-xl shadow-lg">
          <Vote className={`${sizeClasses[size]} text-white`} strokeWidth={2.5} />
        </div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <h1 className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-700 dark:from-yellow-400 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent`}>
            VaultVote
          </h1>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Shield className="h-3 w-3" />
            <span>Private FHE Voting</span>
          </p>
        </div>
      )}
    </div>
  );
}

interface IconBadgeProps {
  icon: React.ReactNode;
  label: string;
  color?: "yellow" | "green" | "blue" | "purple" | "red";
}

export function IconBadge({ icon, label, color = "yellow" }: IconBadgeProps) {
  const colorClasses = {
    yellow: "from-yellow-400 to-amber-500",
    green: "from-green-400 to-emerald-500",
    blue: "from-blue-400 to-cyan-500",
    purple: "from-purple-400 to-fuchsia-500",
    red: "from-red-400 to-rose-500"
  };

  return (
    <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-yellow-200 dark:border-yellow-500/30 shadow-sm">
      <div className={`p-1 rounded-full bg-gradient-to-br ${colorClasses[color]}`}>
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
