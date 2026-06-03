import React, { forwardRef, type InputHTMLAttributes, useId } from "react";
import { cn } from "../../lib/helpers/styles";

export interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "type" | "size"
> {
  /** The current state of the switch */
  value?: boolean;
  /** Show an invalid state */
  invalid?: boolean;
  /** The size of the switch */
  size?: "small" | "medium";
  /** The color of the switch when active */
  color?: "primary" | "secondary" | "error";
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      value,
      onChange,
      id: idProp,
      disabled,
      invalid,
      className,
      size = "medium",
      color = "primary",
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const switchId = idProp ?? generatedId;

    const isSmall = size === "small";

    const colorClasses = {
      primary: "peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500",
      secondary: "peer-checked:bg-purple-600 dark:peer-checked:bg-purple-500",
      error: "peer-checked:bg-red-600 dark:peer-checked:bg-red-500",
    };

    return (
      <div
        className={cn(
          "relative inline-flex items-center group cursor-pointer",
          isSmall ? "w-8 h-5" : "w-11 h-6",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        <input
          type="checkbox"
          role="switch"
          id={switchId}
          checked={value}
          disabled={disabled}
          onChange={onChange}
          className="sr-only peer"
          ref={ref}
          {...props}
        />

        {/* Track */}
        <div
          className={cn(
            "absolute inset-0 bg-gray-300 dark:bg-gray-700 rounded-full transition-colors duration-200",
            colorClasses[color],
            invalid &&
              "ring-2 ring-red-500 ring-offset-2 dark:ring-offset-gray-900",
          )}
        />

        {/* Thumb */}
        <div
          className={cn(
            "absolute left-0.5 bg-white rounded-full shadow-md transition-transform duration-200 ease-in-out flex items-center justify-center",
            isSmall ? "w-4 h-4" : "w-5 h-5",
            value && (isSmall ? "translate-x-3" : "translate-x-5"),
          )}
        />

        {/* Hover Effect (MUI Ripple Style) */}
        <div
          className={cn(
            "absolute left-0 rounded-full bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-white/10 transition-colors duration-200",
            isSmall ? "w-8 h-8 -left-2" : "w-10 h-10 -left-2.5",
            value && (isSmall ? "translate-x-3" : "translate-x-5"),
          )}
        />
      </div>
    );
  },
);

Switch.displayName = "Switch";

export interface InlineSwitchProps extends SwitchProps {
  /** Label to show next to the switch */
  label?: string;
  /** Whether to show the label */
  showLabel?: boolean;
}

export const InlineSwitch = forwardRef<HTMLInputElement, InlineSwitchProps>(
  (
    {
      label,
      showLabel = true,
      value,
      disabled,
      invalid,
      className,
      id: idProp,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;

    return (
      <div
        className={cn(
          "inline-flex items-center gap-3 py-1 cursor-pointer transition-opacity",
          disabled && "opacity-50 cursor-not-allowed",
          className,
        )}
      >
        <Switch
          {...props}
          id={id}
          value={value}
          disabled={disabled}
          invalid={invalid}
          ref={ref}
        />
        {showLabel && label && (
          <label
            htmlFor={id}
            className={cn(
              "text-sm font-medium cursor-pointer select-none transition-colors",
              value
                ? "text-gray-900 dark:text-gray-100"
                : "text-gray-500 dark:text-gray-400",
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);

InlineSwitch.displayName = "InlineSwitch";
