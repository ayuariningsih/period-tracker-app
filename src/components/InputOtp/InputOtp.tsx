import React, { forwardRef, useCallback, useRef, useEffect } from "react";
import { cn } from "../../lib/helpers/styles";

export interface InputOtpChangeEvent {
  value: string;
  originalEvent: React.SyntheticEvent;
}

export interface InputOtpProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange" | "value"
> {
  /** Current value of the input */
  value?: string;
  /** Callback to invoke when the value changes */
  onChange?: (e: InputOtpChangeEvent) => void;
  /** Number of characters to display */
  length?: number;
  /** Whether to hide the values in the input fields */
  mask?: boolean;
  /** When present, only integers can be accepted as input */
  integerOnly?: boolean;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is invalid */
  invalid?: boolean;
  /** Custom class name for the input elements */
  inputClassName?: string;
}

/**
 * InputOtp component for one-time password input.
 * Inspired by PrimeReact's InputOtp.
 */
export const InputOtp = forwardRef<HTMLDivElement, InputOtpProps>(
  (
    {
      value = "",
      onChange,
      length = 4,
      mask = false,
      integerOnly = false,
      disabled = false,
      invalid = false,
      className,
      inputClassName,
      ...props
    },
    ref,
  ) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
      inputRefs.current = inputRefs.current.slice(0, length);
    }, [length]);

    const updateValue = useCallback(
      (newValue: string, event: React.SyntheticEvent) => {
        if (disabled) return;
        onChange?.({ value: newValue, originalEvent: event });
      },
      [disabled, onChange],
    );

    const onInputChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number,
    ) => {
      const val = e.target.value;
      const char = val.charAt(val.length - 1);

      if (integerOnly && char && !/^\d+$/.test(char)) {
        return;
      }

      const newValue = value.split("");
      newValue[index] = char;
      const finalValue = newValue.join("").slice(0, length);

      updateValue(finalValue, e);

      if (char && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const onKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      index: number,
    ) => {
      if (e.key === "Backspace" && !value[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === "ArrowRight" && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const onPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
      e.preventDefault();
      const pasteData = e.clipboardData.getData("text").slice(0, length);

      if (integerOnly && !/^\d+$/.test(pasteData)) {
        return;
      }

      updateValue(pasteData, e);

      const lastIndex = Math.min(pasteData.length, length - 1);
      inputRefs.current[lastIndex]?.focus();
    };

    return (
      <div
        {...props}
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        onPaste={onPaste}
      >
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type={mask ? "password" : "text"}
            value={value[i] || ""}
            onChange={(e) => onInputChange(e, i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            disabled={disabled}
            maxLength={1}
            autoComplete="one-time-code"
            className={cn(
              "flex h-10 w-8.75 text-center border border-gray-300 bg-white text-lg font-semibold rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:focus-visible:ring-blue-500",
              invalid &&
                "border-red-500 focus-visible:ring-red-500 dark:border-red-500",
              inputClassName,
            )}
          />
        ))}
      </div>
    );
  },
);

InputOtp.displayName = "InputOtp";
