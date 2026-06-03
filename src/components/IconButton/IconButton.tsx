import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/helpers/styles";
import { type LucideIcon } from "lucide-react";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center transition-colors cursor-pointer focus:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-green-forest-70 text-white hover:bg-green-forest-100 active:bg-green-forest-100/90 dark:bg-green-forest-50 dark:text-green-forest-100",
        secondary:
          "border border-green-forest-70 bg-transparent text-green-forest-70 hover:bg-green-forest-10 active:bg-green-forest-20 dark:border-green-forest-50 dark:text-green-forest-50 dark:hover:bg-green-forest-50/10",
        tertiary:
          "bg-green-forest-10 text-green-forest-70 hover:bg-green-forest-20 active:bg-green-forest-20/80 dark:bg-green-forest-50/10 dark:text-green-forest-50 dark:hover:bg-green-forest-50/20",
      },
      size: {
        xs: "h-7 w-7 rounded-lg",
        sm: "h-9 w-9 rounded-xl",
        md: "h-11 w-11 rounded-2xl",
        lg: "h-13 w-13 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

const iconSizeMap = {
  xs: 14,
  sm: 18,
  md: 22,
  lg: 26,
};

export interface IconButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  icon: LucideIcon;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, icon: Icon, ...props }, ref) => {
    const iconSize =
      size && iconSizeMap[size] ? iconSizeMap[size] : iconSizeMap.md;

    return (
      <button
        ref={ref}
        className={cn(iconButtonVariants({ variant, size, className }))}
        {...props}
      >
        <Icon size={iconSize} strokeWidth={2} />
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
