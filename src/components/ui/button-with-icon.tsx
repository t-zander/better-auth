import { Button, ButtonProps } from "@/components/ui/button";

export function ButtonWithIcon({
  icon,
  children,
  ...props
}: { icon: React.ReactNode } & ButtonProps) {
  return (
    <Button {...props}>
      {icon} {children}
    </Button>
  );
}
