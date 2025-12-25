import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const Spinner = ({ size = "md", className }: SpinnerProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
      {/* Spinning arc */}
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
      {/* Inner glow dot */}
      <div className="absolute inset-[30%] rounded-full bg-primary/30 animate-pulse" />
    </div>
  );
};

interface LoadingOverlayProps {
  message?: string;
  className?: string;
}

export const LoadingOverlay = ({ message = "Loading...", className }: LoadingOverlayProps) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center gap-4 p-8",
      className
    )}>
      <Spinner size="lg" />
      <p className="text-sm text-muted-foreground animate-pulse">{message}</p>
    </div>
  );
};

interface FullPageLoaderProps {
  message?: string;
}

export const FullPageLoader = ({ message = "Loading..." }: FullPageLoaderProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          {/* Outer glow */}
          <div className="absolute inset-0 h-16 w-16 rounded-full bg-primary/20 blur-xl animate-pulse" />
          {/* Main spinner */}
          <Spinner size="xl" />
        </div>
        <p className="text-sm font-medium text-foreground">{message}</p>
      </div>
    </div>
  );
};
