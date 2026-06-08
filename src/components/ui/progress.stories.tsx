import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "./progress";
import { useState, useEffect } from "react";

/**
 * A thin progress bar component built on top of Radix UI's Progress primitive.
 * Used to indicate the completion status of a task or process.
 */
const meta: Meta<typeof Progress> = {
  title: "Design System/UI/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "The progress value ranging from 0 to 100.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the root container.",
    },
  },
  // Global decorator to constrain the width of the progress bar in the preview
  decorators: [
    (Story) => (
      <div className="w-full max-w-md py-10">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Progress>;

/**
 * Default story showing a standard 50% progress state.
 */
export const Default: Story = {
  args: {
    value: 50,
  },
};

/**
 * State representing a process that has not yet started (0%).
 */
export const Empty: Story = {
  args: {
    value: 0,
  },
};

/**
 * State representing a fully completed process (100%).
 */
export const Full: Story = {
  args: {
    value: 100,
  },
};

/**
 * Demonstrates a dynamic loading state where progress increases over time.
 */
export const LoadingSimulation: Story = {
  render: (args) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 50);
      return () => clearInterval(timer);
    }, []);

    return (
      <div className="space-y-2">
        <Progress {...args} value={progress} />
        <p className="text-xs text-muted-foreground text-center">
          Loading: {progress}%
        </p>
      </div>
    );
  },
};

/**
 * Example of customizing the progress bar height using Tailwind classes.
 */
export const Taller: Story = {
  args: {
    value: 40,
    className: "h-3",
  },
};

/**
 * Demonstrates overriding the indicator color using arbitrary value selectors.
 */
export const CustomColor: Story = {
  args: {
    value: 75,
    className: "[&>[data-slot=progress-indicator]]:bg-green-500",
  },
};
