import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../helpers/styles";
import clsx from "clsx";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-4xl transition-colors cursor-pointer focus:outline-none disabled:pointer-events-none disabled:cursor-not-allowed",
  {
    variants: {
      variant: { primary: "", secondary: "", tertiary: "", link: "" },
      theme: { default: "", danger: "", success: "" },
      size: {
        xs: "px-2.5 py-1 text-xs",
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-md",
        lg: "px-[18px] py-2.5 text-lg",
      },
      fullWidth: { true: "w-full flex", false: "" },
    },
    compoundVariants: [
      {
        variant: "primary",
        theme: "default",
        className: clsx(
          // Light Mode
          "bg-green-forest-70 text-white hover:bg-green-forest-100 active:bg-green-forest-100/90 ",
          "disabled:bg-green-forest-20 disabled:text-green-forest-100/50 ", // Fixed contrast
          // Dark Mode
          "dark:bg-green-forest-50",
          "dark:disabled:bg-white/10 dark:disabled:text-white/30",
        ),
      },

      {
        variant: "secondary",
        theme: "default",
        className:
          // Light Mode
          "border border-green-forest-70 bg-transparent text-green-forest-70 hover:bg-green-forest-10 active:bg-green-forest-20 " +
          "disabled:opacity-50 disabled:bg-transparent " +
          // Dark Mode
          "dark:border-green-forest-50 dark:text-green-forest-50 dark:hover:bg-green-forest-50/10 dark:active:bg-green-forest-50/20",
      },

      {
        variant: "tertiary", // The "Ghost" Button
        theme: "default",
        className:
          // Light Mode
          "bg-transparent text-green-forest-70 bg-green-forest-10 hover:bg-green-forest-10/30 active:bg-green-forest-20 " +
          "disabled:opacity-50 disabled:bg-transparent " +
          // Dark Mode
          "dark:text-green-forest-50 dark:bg-green-forest-50/10 dark:hover:bg-green-forest-50/20 dark:active:bg-green-forest-50/20",
      },

      {
        variant: "link",
        theme: "default",
        className:
          // Light Mode
          "bg-transparent text-green-forest-70 underline-offset-4 hover:underline hover:text-green-forest-100 " +
          "disabled:opacity-50 disabled:no-underline " +
          // Dark Mode
          "dark:text-green-forest-50 dark:hover:text-green-forest-20",
      },
    ],
    defaultVariants: {
      variant: "primary",
      theme: "default",
      size: "md",
      fullWidth: false,
    },
  },
);

export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
export type ButtonTheme = VariantProps<typeof buttonVariants>["theme"];
export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

export interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      disabled,
      fullWidth = false,
      loading,
      size,
      theme,
      type = "button",
      variant,
      ...restProps
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;
    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(
          buttonVariants({ variant, theme, size, fullWidth }),
          loading && "cursor-wait text-transparent transition-none",
          className,
        )}
        {...restProps}
      >
        {loading && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-current">
            <Spinner />
          </div>
        )}
        <span
          className={cn(
            "inline-flex items-center gap-2",
            loading && "opacity-0",
          )}
        >
          {children}
        </span>
      </button>
    );
  },
);

Button.displayName = "Button";

function Spinner() {
  return (
    <svg
      className="h-5 w-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
