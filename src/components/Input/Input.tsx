import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../helpers/styles";

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
}

/**
 * A flexible Input component supporting prefixes, suffixes, and addons.
 * Inspired by Grafana UI's Input component.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      invalid,
      prefix,
      suffix,
      loading,
      addonBefore,
      addonAfter,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("flex w-full group", className)}>
        {/* Addon Before */}
        {addonBefore && (
          <div className="flex items-center justify-center px-3 text-sm text-gray-600 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
            {addonBefore}
          </div>
        )}

        <div className="relative flex grow items-center">
          {/* Prefix */}
          {prefix && (
            <div className="absolute left-3 z-10 flex items-center justify-center text-gray-500 dark:text-gray-400 pointer-events-none">
              {prefix}
            </div>
          )}

          <input
            ref={ref}
            disabled={disabled}
            className={cn(
              "flex h-10 w-full border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-900 dark:ring-offset-gray-900 dark:placeholder:text-gray-500 dark:focus-visible:ring-blue-500 dark:text-gray-100",
              prefix && "pl-10",
              (suffix || loading) && "pr-10",
              invalid && "border-red-500 focus-visible:ring-red-500 dark:border-red-500",
              addonBefore && "rounded-l-none",
              addonAfter && "rounded-r-none",
              !addonBefore && !addonAfter && "rounded-md",
              addonBefore && !addonAfter && "rounded-r-md",
              !addonBefore && addonAfter && "rounded-l-md",
            )}
            {...props}
          />

          {/* Suffix or Loading */}
          {(suffix || loading) && (
            <div className="absolute right-3 z-10 flex items-center justify-center text-gray-500 dark:text-gray-400">
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent dark:border-blue-500" />
              ) : (
                suffix
              )}
            </div>
          )}
        </div>

        {/* Addon After */}
        {addonAfter && (
          <div className="flex items-center justify-center px-3 text-sm text-gray-600 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
            {addonAfter}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
