export type SingleValue = Date | null;
export type MultipleValue = Date[];
export type RangeValue = [Date | null, Date | null];

interface BaseCalendarProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> {
  inline?: boolean;
  minDate?: Date;
  maxDate?: Date;
  showIcon?: boolean;
  invalid?: boolean;
  showButtonBar?: boolean;
  locale?: string;
  yearRange?: { start: number; end: number };
}

export interface SingleCalendarProps extends BaseCalendarProps {
  selectionMode?: "single";
  value?: SingleValue;
  onChange?: (e: {
    value: SingleValue;
    originalEvent: React.SyntheticEvent | Event;
  }) => void;
}

export interface MultipleCalendarProps extends BaseCalendarProps {
  selectionMode: "multiple";
  value?: MultipleValue;
  onChange?: (e: {
    value: MultipleValue;
    originalEvent: React.SyntheticEvent | Event;
  }) => void;
}

export interface RangeCalendarProps extends BaseCalendarProps {
  selectionMode: "range";
  value?: RangeValue;
  onChange?: (e: {
    value: RangeValue;
    originalEvent: React.SyntheticEvent | Event;
  }) => void;
}

export type CalendarProps =
  | SingleCalendarProps
  | MultipleCalendarProps
  | RangeCalendarProps;

export interface DayMetadata {
  date: Date;
  currentMonth: boolean;
  today: boolean;
  selected: boolean;
  inRange: boolean;
  disabled: boolean;
}
