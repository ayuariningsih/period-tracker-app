import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "prefix" | "size"
> {
  /** Show an invalid state around the input */
  invalid?: boolean;
  /** Show an icon or text as a prefix inside the input */
  prefix?: ReactNode;
  /** Show an icon or text as a suffix inside the input */
  suffix?: ReactNode;
  /** Show a loading indicator as a suffix */
  loading?: boolean;
  /** Add a component as an addon before the input */
  addonBefore?: ReactNode;
  /** Add a component as an addon after the input */
  addonAfter?: ReactNode;
  /** Additional classes for the outer wrapper div */
  wrapperClassName?: string;
  /** Change the rendered element to the child element */
  asChild?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClassName,
      type,
      invalid,
      prefix,
      suffix,
      loading,
      addonBefore,
      addonAfter,
      disabled,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot.Root : "input";

    return (
      <div className={cn("flex w-full group", wrapperClassName)}>
        {/* Addon Before */}
        {addonBefore && (
          <div className="flex items-center justify-center px-3 text-sm text-muted-foreground bg-muted border border-border border-r-0 rounded-l-md shrink-0">
            {addonBefore}
          </div>
        )}

        <div className="relative flex grow items-center min-w-0">
          {/* Prefix */}
          {prefix && (
            <div
              className="absolute left-3 z-10 flex items-center justify-center text-muted-foreground pointer-events-none"
              aria-hidden="true"
            >
              {prefix}
            </div>
          )}

          <Comp
            type={type}
            ref={ref}
            disabled={disabled}
            data-slot="input"
            className={cn(
              "flex h-10 w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              prefix && "pl-10",
              (suffix || loading) && "pr-10",
              invalid && "border-destructive focus-visible:ring-destructive",
              addonBefore && "rounded-l-none",
              addonAfter && "rounded-r-none",
              !addonBefore && !addonAfter && "rounded-md",
              addonBefore && !addonAfter && "rounded-r-md",
              !addonBefore && addonAfter && "rounded-l-md",
              className,
            )}
            {...props}
          />

          {/* Suffix or Loading */}
          {(suffix || loading) && (
            <div
              className="absolute right-3 z-10 flex items-center justify-center text-muted-foreground pointer-events-none"
              aria-hidden="true"
            >
              {loading ? (
                <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                suffix
              )}
            </div>
          )}
        </div>

        {/* Addon After */}
        {addonAfter && (
          <div className="flex items-center justify-center px-3 text-sm text-muted-foreground bg-muted border border-border border-l-0 rounded-r-md shrink-0">
            {addonAfter}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
