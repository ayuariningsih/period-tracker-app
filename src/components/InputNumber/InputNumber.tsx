import React, {
  forwardRef,
  useId,
  useState,
  useEffect,
  useCallback,
} from "react";
import { cn } from "../../lib/helpers/styles";
import { ChevronUp, ChevronDown, Plus, Minus } from "lucide-react";

export interface InputNumberValueChangeEvent {
  value: number | null;
  originalEvent: React.SyntheticEvent;
}

export interface InputNumberProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value" | "prefix"
> {
  /** Current value of the input */
  value?: number | null;
  /** Callback to invoke when the value changes */
  onValueChange?: (e: InputNumberValueChangeEvent) => void;
  /** Minimum value allowed */
  min?: number;
  /** Maximum value allowed */
  max?: number;
  /** Step amount for increment/decrement */
  step?: number;
  /** Whether to show increment/decrement buttons */
  showButtons?: boolean;
  /** Layout of the buttons: 'stacked' or 'horizontal' */
  buttonLayout?: "stacked" | "horizontal";
  /** Custom text to display before the value */
  prefix?: string;
  /** Custom text to display after the value */
  suffix?: string;
  /** Whether the input is invalid */
  invalid?: boolean;
  /** Number of fraction digits to display */
  minFractionDigits?: number;
  /** Maximum number of fraction digits to display */
  maxFractionDigits?: number;
  /** Locale for formatting */
  locale?: string;
  /** Mode of the input: 'decimal' or 'currency' */
  mode?: "decimal" | "currency";
  /** Currency code (ISO 4217) for currency mode */
  currency?: string;
}

/**
 * InputNumber component for numerical input with support for constraints and formatting.
 * Inspired by PrimeReact's InputNumber.
 */
export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      value = null,
      onValueChange,
      min,
      max,
      step = 1,
      showButtons = false,
      buttonLayout = "stacked",
      prefix,
      suffix,
      invalid,
      disabled,
      className,
      minFractionDigits = 0,
      maxFractionDigits,
      locale,
      mode = "decimal",
      currency,
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState<string>("");
    const generatedId = useId();
    const inputId = props.id || generatedId;

    const formatValue = useCallback(
      (val: number | null): string => {
        if (val === null) return "";

        try {
          const options: Intl.NumberFormatOptions = {
            minimumFractionDigits: minFractionDigits,
            maximumFractionDigits:
              maxFractionDigits ?? Math.max(minFractionDigits, 20),
          };

          if (mode === "currency" && currency) {
            options.style = "currency";
            options.currency = currency;
          }

          let formatted = new Intl.NumberFormat(locale, options).format(val);

          if (mode !== "currency") {
            if (prefix) formatted = prefix + formatted;
            if (suffix) formatted = formatted + suffix;
          }

          return formatted;
        } catch {
          return val.toString();
        }
      },
      [
        locale,
        minFractionDigits,
        maxFractionDigits,
        mode,
        currency,
        prefix,
        suffix,
      ],
    );

    useEffect(() => {
      setInputValue(formatValue(value));
    }, [value, formatValue]);

    const updateValue = (
      newVal: number | null,
      event: React.SyntheticEvent,
    ) => {
      if (disabled) return;

      let finalVal = newVal;
      if (finalVal !== null) {
        if (min !== undefined) finalVal = Math.max(min, finalVal);
        if (max !== undefined) finalVal = Math.min(max, finalVal);
      }

      onValueChange?.({ value: finalVal, originalEvent: event });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      setInputValue(rawValue);

      // Basic numeric extraction
      const numericValue = parseFloat(rawValue.replace(/[^0-9.-]/g, ""));
      if (!isNaN(numericValue)) {
        updateValue(numericValue, e);
      } else if (rawValue === "") {
        updateValue(null, e);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setInputValue(formatValue(value));
      props.onBlur?.(e);
    };

    const increment = (e: React.MouseEvent | React.KeyboardEvent) => {
      e.preventDefault();
      updateValue((value ?? 0) + step, e);
    };

    const decrement = (e: React.MouseEvent | React.KeyboardEvent) => {
      e.preventDefault();
      updateValue((value ?? 0) - step, e);
    };

    const isHorizontal = showButtons && buttonLayout === "horizontal";

    return (
      <div className={cn("flex w-full group relative", className)}>
        {isHorizontal && (
          <button
            type="button"
            disabled={disabled}
            onClick={decrement}
            className="flex items-center justify-center w-10 h-10 border border-r-0 border-gray-300 bg-gray-50 rounded-l-md hover:bg-gray-100 disabled:opacity-50 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
          >
            <Minus size={16} className="text-gray-600 dark:text-gray-400" />
          </button>
        )}

        <div className="relative flex grow items-center">
          <input
            {...props}
            ref={ref}
            id={inputId}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            disabled={disabled}
            className={cn(
              "flex h-10 w-full border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-900 dark:ring-offset-gray-900 dark:placeholder:text-gray-500 dark:focus-visible:ring-blue-500 dark:text-gray-100",
              showButtons && buttonLayout === "stacked" && "pr-10",
              isHorizontal && "rounded-none",
              !isHorizontal && !showButtons && "rounded-md",
              !isHorizontal &&
                showButtons &&
                buttonLayout === "stacked" &&
                "rounded-md",
              invalid &&
                "border-red-500 focus-visible:ring-red-500 dark:border-red-500",
            )}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") increment(e);
              if (e.key === "ArrowDown") decrement(e);
              props.onKeyDown?.(e);
            }}
          />

          {showButtons && buttonLayout === "stacked" && (
            <div className="absolute right-0 flex flex-col h-full border-l border-gray-300 dark:border-gray-600">
              <button
                type="button"
                disabled={disabled}
                onClick={increment}
                className="flex items-center justify-center h-1/2 w-8 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-tr-md transition-colors"
              >
                <ChevronUp size={14} className="text-gray-500" />
              </button>
              <button
                type="button"
                disabled={disabled}
                onClick={decrement}
                className="flex items-center justify-center h-1/2 w-8 border-t border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-br-md transition-colors"
              >
                <ChevronDown size={14} className="text-gray-500" />
              </button>
            </div>
          )}
        </div>

        {isHorizontal && (
          <button
            type="button"
            disabled={disabled}
            onClick={increment}
            className="flex items-center justify-center w-10 h-10 border border-l-0 border-gray-300 bg-gray-50 rounded-r-md hover:bg-gray-100 disabled:opacity-50 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
          >
            <Plus size={16} className="text-gray-600 dark:text-gray-400" />
          </button>
        )}
      </div>
    );
  },
);

InputNumber.displayName = "InputNumber";
