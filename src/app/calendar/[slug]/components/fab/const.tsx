import { Button } from "@/components/ui/button";


export function CircularFab({ children, ...props }: { children: React.ReactNode } & React.ComponentProps<typeof Button>) {
    return (
        <Button {...props} className="p-2 h-16 w-16 text-xl text-gray-200 rounded-full">
            {children}
        </Button>
    );
}