import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Calendar } from "./Calendar";

const meta: Meta<typeof Calendar> = {
  title: "Design System/Components/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile Calendar component supporting single, multiple, and range date selections. It features a customizable header with month/year navigation, keyboard support, and accessibility features.",
      },
    },
  },
  // Add padding and min-height so the popup doesn't get clipped in the iframe
  decorators: [
    (Story) => (
      <div className="p-4 min-h-[500px] w-full max-w-md flex justify-center items-start">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    selectionMode: {
      control: "radio",
      options: ["single", "multiple", "range"],
      description: "Determines the selection behavior of the calendar.",
      table: {
        type: { summary: "'single' | 'multiple' | 'range'" },
        defaultValue: { summary: "'single'" },
      },
    },
    inline: {
      control: "boolean",
      description:
        "If true, renders the calendar panel directly instead of an input with a popup.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    showIcon: {
      control: "boolean",
      description: "Displays a calendar icon inside the input field.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    showButtonBar: {
      control: "boolean",
      description:
        "Shows 'Today' and 'Clear' buttons at the bottom of the calendar.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    invalid: {
      control: "boolean",
      description: "Applies error styling to the input field.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables interaction with the calendar.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    locale: {
      control: "text",
      description: "Locale for date formatting (e.g., 'en-US', 'id-ID').",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "'en-US'" },
      },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input field.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

// ============================================================================
// STORIES
// ============================================================================

export const SingleSelection: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <Calendar
        {...args}
        selectionMode="single"
        value={value}
        onChange={(e) => setValue(e.value as Date | null)}
      />
    );
  },
  args: {
    showIcon: true,
    placeholder: "Select a date...",
    showButtonBar: true,
  },
};

export const MultipleSelection: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date[]>([]);
    return (
      <Calendar
        {...args}
        selectionMode="multiple"
        value={value}
        onChange={(e) => setValue(e.value as Date[])}
      />
    );
  },
  args: {
    showIcon: true,
    placeholder: "Select multiple dates...",
  },
};

export const RangeSelection: Story = {
  render: (args) => {
    const [value, setValue] = useState<[Date | null, Date | null]>([
      null,
      null,
    ]);
    return (
      <Calendar
        {...args}
        selectionMode="range"
        value={value}
        onChange={(e) => setValue(e.value as [Date | null, Date | null])}
      />
    );
  },
  args: {
    showIcon: true,
    placeholder: "Select a date range...",
    showButtonBar: true,
  },
};

export const InlineView: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | null>(new Date());
    return (
      <Calendar
        {...args}
        selectionMode="single"
        value={value}
        onChange={(e) => setValue(e.value as Date | null)}
      />
    );
  },
  args: {
    inline: true,
    showButtonBar: true,
  },
};

export const MinMaxDates: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);

    // Set min date to 2 days ago, max date to 5 days from now
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 2);

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 5);

    return (
      <Calendar
        {...args}
        selectionMode="single"
        value={value}
        minDate={minDate}
        maxDate={maxDate}
        onChange={(e) => setValue(e.value as Date | null)}
      />
    );
  },
  args: {
    showIcon: true,
    placeholder: "Restricted dates...",
  },
};

export const InvalidState: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <Calendar
        {...args}
        selectionMode="single"
        value={value}
        onChange={(e) => setValue(e.value as Date | null)}
      />
    );
  },
  args: {
    invalid: true,
    showIcon: true,
    placeholder: "Please select a date",
  },
};

export const Localization: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | null>(new Date());
    return (
      <Calendar
        {...args}
        selectionMode="single"
        value={value}
        onChange={(e) => setValue(e.value as Date | null)}
      />
    );
  },
  args: {
    locale: "id-ID", // Indonesian locale as an example
    showIcon: true,
    showButtonBar: true,
    placeholder: "Pilih tanggal...",
  },
};
