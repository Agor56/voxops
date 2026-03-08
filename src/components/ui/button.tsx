import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 btn-magnetic",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-[rgba(255,255,255,0.2)] bg-transparent hover:border-[rgba(201,169,110,0.4)] text-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Primary CTA - white bg, black text
        hero: "bg-white text-black hover:bg-white/90 hover:scale-[1.02] hover:-translate-y-px border border-[rgba(201,169,110,0.3)] shadow-[0_0_15px_rgba(201,169,110,0.25),0_0_40px_rgba(201,169,110,0.1)] hover:shadow-[0_0_20px_rgba(201,169,110,0.4),0_0_50px_rgba(201,169,110,0.15)] transition-all duration-300 ease-in-out",
        heroSecondary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_rgba(201,169,110,0.2)]",
        // Glassmorphism secondary
        heroGlass: "relative bg-[rgba(255,255,255,0.06)] backdrop-blur-xl border border-[rgba(255,255,255,0.1)] text-foreground hover:bg-[rgba(255,255,255,0.1)] overflow-hidden transition-all duration-300 hover:border-[rgba(201,169,110,0.4)] hover:shadow-[0_8px_40px_rgba(201,169,110,0.12)]",
        // Glass variant
        glass: "relative bg-[rgba(255,255,255,0.06)] backdrop-blur-xl border border-[rgba(255,255,255,0.1)] text-foreground hover:bg-[rgba(255,255,255,0.1)] overflow-hidden transition-all duration-300 hover:border-[rgba(201,169,110,0.4)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-8",
        xl: "h-14 rounded-xl px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
