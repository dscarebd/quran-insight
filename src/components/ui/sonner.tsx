import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg font-bengali",
          description: "group-[.toast]:text-muted-foreground font-bengali",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-bengali",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-bengali",
          title: "font-bengali",
          success: "font-bengali",
          error: "font-bengali",
          info: "font-bengali",
          warning: "font-bengali",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
