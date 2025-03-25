import { Button } from "@/components/ui/button";

export function CircularFab({
  children,
  ...props
}: { children: React.ReactNode } & React.ComponentProps<typeof Button>) {
  return (
    <Button
      {...props}
      className="h-16 w-16 rounded-full p-2 text-xl text-gray-200"
    >
      {children}
    </Button>
  );
}
