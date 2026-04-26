import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white shadow-[0_12px_24px_-12px_rgba(37,99,235,0.85)] hover:shadow-[0_16px_30px_-14px_rgba(14,116,144,0.9)] hover:-translate-y-0.5",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm hover:shadow-md",
                outline:
                    "border border-white/80 bg-white/76 backdrop-blur-sm hover:bg-white/90 hover:text-blue-700 shadow-[0_12px_24px_-18px_rgba(15,23,42,0.5)] hover:shadow-[0_16px_30px_-18px_rgba(14,116,144,0.55)]",
                secondary:
                    "border border-white/75 bg-slate-100/75 backdrop-blur-sm text-secondary-foreground hover:bg-slate-100/90 shadow-[0_12px_24px_-18px_rgba(15,23,42,0.4)]",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
                premium: "bg-gradient-to-r from-cyan-500 via-blue-600 to-blue-700 text-white shadow-[0_16px_34px_-16px_rgba(14,116,144,0.95)] hover:shadow-[0_22px_38px_-18px_rgba(37,99,235,0.95)] hover:-translate-y-1 border-0",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
