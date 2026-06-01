import React, { forwardRef, type InputHTMLAttributes, useId } from "react";
import { cn } from "../../helpers/styles";
import { Check, Minus } from "lucide-react";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Indeterminate state of the checkbox */
  indeterminate?: boolean;
  /** Show an invalid state */
  invalid?: boolean;
  /** Label for the checkbox */
  label?: React.ReactNode;
  /** Description of the checkbox */
  description?: React.ReactNode;
}

/**
 * Checkbox component inspired by Material UI and Grafana UI.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      indeterminate,
      onChange,
      id: idProp,
      disabled,
      invalid,
      className,
      label,
      description,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const checkboxId = idProp ?? generatedId;

    return (
      <div
        className={cn(
          "inline-flex items-start group cursor-pointer select-none",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        <div className="relative flex items-center h-5 mt-0.5">
          <input
            type="checkbox"
            id={checkboxId}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            className="sr-only peer"
            ref={ref}
            {...props}
          />

          {/* Box / Track */}
          <div
            className={cn(
              "w-4.5 h-4.5 rounded border transition-all duration-200 flex items-center justify-center",
              "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-blue-600 peer-focus-visible:ring-offset-2 dark:peer-focus-visible:ring-offset-gray-900",
              (checked || indeterminate) && "bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500",
              invalid && "border-red-500 dark:border-red-500",
              !checked && !indeterminate && !invalid && "group-hover:border-gray-400 dark:group-hover:border-gray-500",
            )}
          >
            {indeterminate ? (
              <Minus size={14} className="text-white" strokeWidth={4} />
            ) : (
              <Check
                size={14}
                className={cn(
                  "text-white transition-transform duration-200 scale-0",
                  checked && "scale-100"
                )}
                strokeWidth={4}
              />
            )}
          </div>

          {/* Hover Effect (MUI Ripple Style) */}
          <div
            className={cn(
              "absolute -inset-2 rounded-full bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-white/10 transition-colors duration-200",
            )}
          />
        </div>

        {(label || description) && (
          <div className="ml-2.5 flex flex-col">
            {label && (
              <label
                htmlFor={checkboxId}
                className={cn(
                  "text-sm font-medium transition-colors",
                  checked || indeterminate ? "text-gray-900 dark:text-gray-100" : "text-gray-600 dark:text-gray-400"
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";