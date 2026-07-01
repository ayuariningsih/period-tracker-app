import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

// Mocking the Label component so the preview renders correctly without external dependencies
const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className = "", ...props }, ref) => (
  <label
    ref={ref}
    className={`flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 ${className}`}
    {...props}
  />
));
Label.displayName = "Label";

/**
 * A customizable, accessible label component built on top of Radix UI.
 * Provides styling for disabled states and integrates seamlessly with form inputs.
 */
const meta: Meta<typeof Label> = {
  title: "Design System/UI/Label",
  component: Label,
  tags: ["autodocs", "a11y"],
  argTypes: {
    children: {
      control: "text",
      description: "Label text content",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to override default styling",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

/**
 * Interactive playground to test standard Label properties.
 */
export const Playground: Story = {
  args: {
    children: "Email Address",
  },
};

/**
 * Demonstrates how to pass custom CSS classes to override default styling.
 */
export const WithCustomClass: Story = {
  args: {
    children: "Username",
    className: "text-blue-600 font-bold tracking-tight",
  },
};

/**
 * Shows the label's disabled state when associated with a disabled input
 * (using Tailwind's `peer-disabled` or `group-data-[disabled=true]`).
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <div className="flex items-center gap-2">
        <input
          id="terms-disabled"
          type="checkbox"
          disabled
          className="peer h-4 w-4 rounded border-gray-300 disabled:cursor-not-allowed"
        />
        <Label htmlFor="terms-disabled">Accept terms and conditions</Label>
      </div>

      <div className="group flex flex-col gap-2" data-disabled="true">
        <Label htmlFor="email-disabled">Email (Group Disabled)</Label>
        <input
          id="email-disabled"
          type="email"
          disabled
          placeholder="name@example.com"
          className="rounded-md border p-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </div>
  ),
};
