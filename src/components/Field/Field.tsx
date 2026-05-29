import React, { useId } from "react";
import { cn } from "../../helpers/styles";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Form input element, i.e Input or Switch */
  children: React.ReactElement<{
    id?: string;
    disabled?: boolean;
    className?: string;
    "aria-invalid"?: boolean;
    "aria-describedby"?: string;
  }>;
  /** Label for the field */
  label?: React.ReactNode;
  /** Description of the field */
  description?: React.ReactNode;
  /** Indicates if field is in invalid state */
  invalid?: boolean;
  /** Indicates if field is disabled */
  disabled?: boolean;
  /** Indicates if field is required */
  required?: boolean;
  /** Error message to display */
  error?: React.ReactNode;
  /** Indicates horizontal layout of the field */
  horizontal?: boolean;
  /** Remove the bottom margin */
  noMargin?: boolean;
}

/**
 * Field is the basic component for rendering form elements together with labels and description.
 * Inspired by Grafana UI Field component.
 */
export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  (
    {
      label,
      description,
      horizontal,
      invalid,
      disabled,
      required,
      error,
      children,
      className,
      noMargin,
      ...otherProps
    },
    ref,
  ) => {
    const generatedId = useId();
    const errorId = useId();

    // Try to get id from child if it exists, otherwise use generated one
    const inputId = children.props.id || generatedId;

    return (
      <div
        className={cn(
          "flex flex-col",
          horizontal && "flex-row items-center justify-between gap-4",
          !noMargin && "mb-4",
          className,
        )}
        {...otherProps}
      >
        <div className={cn("flex flex-col mb-1.5", horizontal && "mb-0")}>
          {label && (
            <label
              htmlFor={inputId}
              className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-1"
            >
              {label}
              {required && <span className="text-red-500">*</span>}
            </label>
          )}
          {description && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {description}
            </span>
          )}
        </div>

        <div className="flex flex-col w-full">
          <div ref={ref}>
            {React.cloneElement(children, {
              id: inputId,
              disabled,
              "aria-invalid": invalid,
              "aria-describedby": invalid && error ? errorId : undefined,
              className: cn(
                children.props.className,
                invalid && "border-red-500 focus:ring-red-500",
              ),
            })}
          </div>
          {invalid && error && (
            <span
              id={errorId}
              className="mt-1 text-xs text-red-500 font-medium animate-in fade-in slide-in-from-top-1"
            >
              {error}
            </span>
          )}
        </div>
      </div>
    );
  },
);

Field.displayName = "Field";
