import React, {
  forwardRef,
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { cn } from "../../helpers/styles";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  X,
} from "lucide-react";

import {
  startOfDay,
  isSameDay,
  getDaysInMonth,
  getFirstDayOfMonth,
  formatNativeDate,
} from "../../utils/calendar.utils";
import type {
  CalendarProps,
  DayMetadata,
  MultipleCalendarProps,
  MultipleValue,
  RangeCalendarProps,
  RangeValue,
  SingleCalendarProps,
  SingleValue,
} from "../../types/calendar.types";

import useOutsideClick from "../../hooks/useOutsideClick";

export const Calendar = forwardRef<HTMLInputElement, CalendarProps>(
  (props, ref) => {
    const {
      value,
      onChange,
      selectionMode = "single",
      inline = false,
      minDate,
      maxDate,
      showIcon = false,
      invalid = false,
      disabled = false,
      showButtonBar = false,
      locale = "en-US",
      yearRange = {
        start: new Date().getFullYear() - 50,
        end: new Date().getFullYear() + 50,
      },
      className,
      ...inputProps
    } = props;

    // --- State ---
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const [viewDate, setViewDate] = useState<Date>(() => {
      if (value instanceof Date) return value;
      if (Array.isArray(value) && value[0] instanceof Date) return value[0];
      return new Date();
    });

    // Track the previous value to detect external changes
    const [prevValue, setPrevValue] = useState(value);

    // Sync viewDate when external value changes
    useEffect(() => {
      if (value !== prevValue) {
        setPrevValue(value);

        const targetDate = Array.isArray(value) ? value[0] : value;
        if (targetDate instanceof Date) {
          setViewDate(targetDate);
        }
      }
    }, [value, prevValue]);

    useOutsideClick(containerRef, () => setIsOpen(false));

    // --- Formatters & Helpers ---
    const displayValue = useMemo(() => {
      if (!value) return "";
      if (selectionMode === "single" && value instanceof Date) {
        return formatNativeDate(value, locale);
      }
      if (selectionMode === "range" && Array.isArray(value)) {
        const [start, end] = value;
        return `${start ? formatNativeDate(start, locale) : ""}${
          end ? ` - ${formatNativeDate(end, locale)}` : ""
        }`;
      }
      if (selectionMode === "multiple" && Array.isArray(value)) {
        return (value as Date[])
          .map((d) => formatNativeDate(d, locale))
          .join(", ");
      }
      return "";
    }, [value, selectionMode, locale]);

    // --- Precompute Calendar Grid Metadata ---
    const calendarDays: DayMetadata[] = useMemo(() => {
      const year = viewDate.getFullYear();
      const month = viewDate.getMonth();
      const totalDays = getDaysInMonth(year, month);
      const startOffset = getFirstDayOfMonth(year, month);

      const prevMonthYear = month === 0 ? year - 1 : year;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevMonthDays = getDaysInMonth(prevMonthYear, prevMonth);

      const days: DayMetadata[] = [];
      const today = startOfDay(new Date());

      // Helper to check selection states safely
      const checkSelected = (d: Date) => {
        if (!value) return false;
        if (selectionMode === "single" && value instanceof Date)
          return isSameDay(d, value);
        if (selectionMode === "range" && Array.isArray(value)) {
          return (
            (value[0] && isSameDay(d, value[0])) ||
            (value[1] && isSameDay(d, value[1]))
          );
        }
        if (selectionMode === "multiple" && Array.isArray(value)) {
          return value.some((v) => v && isSameDay(v, d));
        }
        return false;
      };

      const checkInRange = (d: Date) => {
        if (selectionMode !== "range" || !Array.isArray(value)) return false;
        const [start, end] = value;
        if (!start || !end) return false;
        const current = startOfDay(d).getTime();
        return (
          current > startOfDay(start).getTime() &&
          current < startOfDay(end).getTime()
        );
      };

      const checkDisabled = (d: Date) => {
        const current = startOfDay(d).getTime();
        if (minDate && current < startOfDay(minDate).getTime()) return true;
        if (maxDate && current > startOfDay(maxDate).getTime()) return true;
        return false;
      };

      // Generate grid cells
      const pushDay = (d: Date, currentMonth: boolean) => {
        days.push({
          date: d,
          currentMonth,
          today: isSameDay(d, today),
          selected: checkSelected(d),
          inRange: checkInRange(d),
          disabled: checkDisabled(d),
        });
      };

      // Previous month padding
      for (let i = startOffset - 1; i >= 0; i--) {
        pushDay(new Date(prevMonthYear, prevMonth, prevMonthDays - i), false);
      }
      // Current month
      for (let i = 1; i <= totalDays; i++) {
        pushDay(new Date(year, month, i), true);
      }
      // Next month padding
      const remaining = 42 - days.length;
      for (let i = 1; i <= remaining; i++) {
        pushDay(
          new Date(month === 11 ? year + 1 : year, (month + 1) % 12, i),
          false,
        );
      }

      return days;
    }, [viewDate, value, selectionMode, minDate, maxDate]);

    // --- Handlers ---
    const buildNextValue = useCallback(
      (
        currentSelectionMode: string,
        currentValue: SingleValue | MultipleValue | RangeValue,
        date: Date,
      ) => {
        if (currentSelectionMode === "single") return date;

        if (currentSelectionMode === "multiple") {
          const current = Array.isArray(currentValue) ? [...currentValue] : [];
          const index = current.findIndex((d) => isSameDay(d, date));
          if (index > -1) {
            current.splice(index, 1);
            return current;
          }
          return [...current, date];
        }

        if (currentSelectionMode === "range") {
          const [start, end] = Array.isArray(currentValue)
            ? currentValue
            : [null, null];
          if (!start || end) return [date, null]; // Start new range
          if (startOfDay(date) < startOfDay(start)) return [date, null]; // Restart if backwards
          return [start, date]; // Complete range
        }

        return date;
      },
      [],
    );

    const handleDateSelect = useCallback(
      (date: Date, event: React.MouseEvent) => {
        if (disabled) return;

        const nextValue = buildNextValue(selectionMode, value, date);

        // TypeScript assertion required here due to the dynamic nature of onChange being a discriminated union
        if (selectionMode === "single") {
          (onChange as SingleCalendarProps["onChange"])?.({
            value: nextValue as SingleValue,
            originalEvent: event,
          });
        } else if (selectionMode === "multiple") {
          (onChange as MultipleCalendarProps["onChange"])?.({
            value: nextValue as MultipleValue,
            originalEvent: event,
          });
        } else if (selectionMode === "range") {
          (onChange as RangeCalendarProps["onChange"])?.({
            value: nextValue as RangeValue,
            originalEvent: event,
          });
        }

        if (
          !inline &&
          (selectionMode === "single" ||
            (selectionMode === "range" &&
              Array.isArray(nextValue) &&
              nextValue[1] !== null))
        ) {
          setIsOpen(false);
        }
      },
      [disabled, buildNextValue, selectionMode, value, onChange, inline],
    );

    // --- Renderers ---
    const renderCalendarPanel = () => (
      <div
        className={cn(
          "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4 w-72",
          inline ? "border-none shadow-none" : "absolute z-50 mt-1",
        )}
        role="dialog"
        aria-label="Calendar"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() =>
              setViewDate(
                new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1),
              )
            }
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full focus-visible:ring-2 focus-visible:ring-blue-600 outline-none"
            aria-label="Previous Month"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-1">
            <select
              value={viewDate.getMonth()}
              onChange={(e) =>
                setViewDate(
                  new Date(viewDate.getFullYear(), parseInt(e.target.value), 1),
                )
              }
              className="appearance-none bg-transparent border-none outline-none focus:ring-0 cursor-pointer font-semibold text-gray-900 dark:text-gray-100 p-0 text-sm hover:text-blue-600 transition-colors"
              aria-label="Select Month"
            >
              {Array.from({ length: 12 }, (_, i) => {
                const date = new Date(2000, i, 1);
                const monthName = new Intl.DateTimeFormat(locale, {
                  month: "long",
                }).format(date);
                return (
                  <option
                    key={i}
                    value={i}
                    className="bg-white dark:bg-gray-900"
                  >
                    {monthName}
                  </option>
                );
              })}
            </select>

            <select
              value={viewDate.getFullYear()}
              onChange={(e) =>
                setViewDate(
                  new Date(parseInt(e.target.value), viewDate.getMonth(), 1),
                )
              }
              className="appearance-none bg-transparent border-none outline-none focus:ring-0 cursor-pointer font-semibold text-gray-900 dark:text-gray-100 p-0 text-sm hover:text-blue-600 transition-colors"
              aria-label="Select Year"
            >
              {Array.from(
                { length: yearRange.end - yearRange.start + 1 },
                (_, i) => {
                  const year = yearRange.start + i;
                  return (
                    <option
                      key={year}
                      value={year}
                      className="bg-white dark:bg-gray-900"
                    >
                      {year}
                    </option>
                  );
                },
              )}
            </select>
          </div>

          <button
            type="button"
            onClick={() =>
              setViewDate(
                new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1),
              )
            }
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full focus-visible:ring-2 focus-visible:ring-blue-600 outline-none"
            aria-label="Next Month"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2" role="row">
          {Array.from({ length: 7 }, (_, i) => {
            // Start from Sunday (Jan 2, 2000 was a Sunday)
            const d = new Date(2000, 0, 2 + i);
            const dayName = new Intl.DateTimeFormat(locale, {
              weekday: "short",
            }).format(d);
            return (
              <div
                key={i}
                className="text-xs font-bold text-gray-400 uppercase"
                role="columnheader"
              >
                {dayName}
              </div>
            );
          })}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1" role="grid">
          {calendarDays.map((meta) => (
            <button
              key={meta.date.getTime()}
              type="button"
              disabled={meta.disabled}
              onClick={(e) => handleDateSelect(meta.date, e)}
              role="gridcell"
              aria-selected={meta.selected}
              aria-label={formatNativeDate(meta.date, locale)}
              className={cn(
                "h-8 w-8 text-sm rounded-full flex items-center justify-center transition-all relative focus-visible:ring-2 focus-visible:ring-blue-600 outline-none",
                !meta.currentMonth && "text-gray-300 dark:text-gray-600",
                meta.currentMonth &&
                  "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30",
                meta.today &&
                  "font-bold text-blue-600 dark:text-blue-400 underline decoration-2 underline-offset-4",
                meta.selected &&
                  "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600",
                meta.inRange && "bg-blue-100 dark:bg-blue-900/50 rounded-none",
                meta.disabled && "opacity-25 cursor-not-allowed line-through",
              )}
            >
              {meta.date.getDate()}
            </button>
          ))}
        </div>

        {/* Footer */}
        {showButtonBar && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={(e) => handleDateSelect(new Date(), e)}
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm"
            >
              Today
            </button>
            <button
              type="button"
              onClick={(e) => {
                if (selectionMode === "single") {
                  (onChange as SingleCalendarProps["onChange"])?.({
                    value: null,
                    originalEvent: e,
                  });
                } else if (selectionMode === "multiple") {
                  (onChange as MultipleCalendarProps["onChange"])?.({
                    value: [],
                    originalEvent: e,
                  });
                } else if (selectionMode === "range") {
                  (onChange as RangeCalendarProps["onChange"])?.({
                    value: [null, null],
                    originalEvent: e,
                  });
                }
              }}
              className="text-sm font-medium text-gray-500 hover:underline outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded-sm"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    );

    if (inline) return renderCalendarPanel();

    return (
      <div ref={containerRef} className={cn("relative w-full", className)}>
        <div className="relative group">
          <input
            {...inputProps}
            ref={ref}
            readOnly
            value={displayValue}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            aria-expanded={isOpen}
            aria-haspopup="dialog"
            className={cn(
              "flex h-10 w-full border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md pr-10 dark:border-gray-600 dark:bg-gray-900 dark:ring-offset-gray-900 dark:placeholder:text-gray-500 dark:text-gray-100 cursor-pointer",
              invalid &&
                "border-red-500 focus-visible:ring-red-500 dark:border-red-500",
            )}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400 pointer-events-none">
            {showIcon && <CalendarIcon size={16} />}
          </div>
          {value && !disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (selectionMode === "single") {
                  (onChange as SingleCalendarProps["onChange"])?.({
                    value: null,
                    originalEvent: e,
                  });
                } else if (selectionMode === "multiple") {
                  (onChange as MultipleCalendarProps["onChange"])?.({
                    value: [],
                    originalEvent: e,
                  });
                } else if (selectionMode === "range") {
                  (onChange as RangeCalendarProps["onChange"])?.({
                    value: [null, null],
                    originalEvent: e,
                  });
                }
              }}
              aria-label="Clear selection"
              className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 outline-none rounded-sm"
            >
              <X size={14} />
            </button>
          )}
        </div>
        {isOpen && renderCalendarPanel()}
      </div>
    );
  },
);

Calendar.displayName = "Calendar";
