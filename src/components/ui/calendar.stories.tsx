import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, useEffect } from "react";
import { Calendar } from "./calendar";
import { addDays } from "date-fns";
import type { DateRange } from "react-day-picker";

/**
 * A calendar component that allows users to select a date or a range of dates.
 * Built on top of React DayPicker and styled with Tailwind CSS.
 */
const meta: Meta<typeof Calendar> = {
  title: "Design System/UI/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile Calendar component built on React DayPicker, supporting single, multiple, and range date selections with customizable styling and accessibility features.",
      },
    },
  },
  argTypes: {
    mode: {
      control: "radio",
      options: ["single", "multiple", "range"],
      description: "The selection mode of the calendar",
      table: {
        type: { summary: "'single' | 'multiple' | 'range'" },
        defaultValue: { summary: "'single'" },
      },
    },
    showOutsideDays: {
      control: "boolean",
      description: "Show days from adjacent months",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    captionLayout: {
      control: "radio",
      options: ["label", "dropdown"],
      description: "The layout of the month/year caption",
      table: {
        defaultValue: { summary: "'label'" },
      },
    },
    numberOfMonths: {
      control: { type: "number", min: 1, max: 3 },
      description: "Number of months to display",
    },
    showWeekNumber: {
      control: "boolean",
      description: "Show week numbers",
    },
    fixedWeeks: {
      control: "boolean",
      description: "Show fixed number of weeks per month",
    },
    buttonVariant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      description: "The button variant for navigation controls",
    },
  },
  args: {
    showOutsideDays: true,
    captionLayout: "label",
    buttonVariant: "ghost",
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

/**
 * Interactive playground to test all calendar properties dynamically.
 */
export const Playground: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="rounded-lg border p-4">
        <Calendar {...args} mode="single" selected={date} onSelect={setDate} />
      </div>
    );
  },
};

/**
 * Basic calendar with single date selection.
 */
export const SingleSelection: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="rounded-lg border p-4">
        <Calendar {...args} mode="single" selected={date} onSelect={setDate} />
      </div>
    );
  },
};

/**
 * Calendar with range date selection.
 */
export const RangeSelection: Story = {
  render: (args) => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: addDays(new Date(), 7),
    });
    return (
      <div className="rounded-lg border p-4">
        <Calendar
          {...args}
          mode="range"
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
        />
      </div>
    );
  },
};

/**
 * Calendar with multiple date selection.
 */
export const MultipleSelection: Story = {
  render: (args) => {
    const [dates, setDates] = useState<Date[] | undefined>([
      new Date(),
      addDays(new Date(), 3),
      addDays(new Date(), 7),
    ]);
    return (
      <div className="rounded-lg border p-4">
        <Calendar
          {...args}
          mode="multiple"
          selected={dates}
          onSelect={setDates}
        />
      </div>
    );
  },
};

/**
 * Calendar with month and year dropdown selectors.
 */
export const CaptionDropdown: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="rounded-lg border p-4">
        <Calendar
          {...args}
          mode="single"
          selected={date}
          onSelect={setDate}
          captionLayout="dropdown"
        />
      </div>
    );
  },
};

/**
 * Calendar with disabled dates (past and future restrictions).
 */
export const DisabledDates: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    const today = new Date();
    return (
      <div className="rounded-lg border p-4">
        <Calendar
          {...args}
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(date) => date < today || date > addDays(today, 30)}
        />
      </div>
    );
  },
  args: {
    defaultMonth: new Date(),
  },
};

/**
 * Calendar showing week numbers.
 */
export const WithWeekNumbers: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="rounded-lg border p-4">
        <Calendar
          {...args}
          mode="single"
          selected={date}
          onSelect={setDate}
          showWeekNumber
        />
      </div>
    );
  },
};

/**
 * Calendar with fixed weeks (consistent height).
 */
export const FixedWeeks: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="rounded-lg border p-4">
        <Calendar
          {...args}
          mode="single"
          selected={date}
          onSelect={setDate}
          fixedWeeks
        />
      </div>
    );
  },
};

/**
 * Calendar hiding outside days.
 */
export const NoOutsideDays: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="rounded-lg border p-4">
        <Calendar
          {...args}
          mode="single"
          selected={date}
          onSelect={setDate}
          showOutsideDays={false}
        />
      </div>
    );
  },
};

/**
 * Calendar with timezone support.
 */
export const WithTimezone: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [timeZone, setTimeZone] = useState<string | undefined>(undefined);

    useEffect(() => {
      setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    }, []);

    return (
      <div className="rounded-lg border p-4">
        <Calendar
          {...args}
          mode="single"
          selected={date}
          onSelect={setDate}
          timeZone={timeZone}
        />
      </div>
    );
  },
};
