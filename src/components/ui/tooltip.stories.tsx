import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const meta = {
  title: "Design System/UI/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // Automatically wrap all stories with the TooltipProvider
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

// A simple button class to make our triggers look decent in Storybook
const triggerClass =
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 border border-slate-200 bg-white px-4 py-2 hover:bg-slate-100 text-slate-900";

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger className={triggerClass}>Hover me</TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const PlacementSides: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger className={triggerClass}>Top</TooltipTrigger>
        <TooltipContent side="top">
          <p>Top tooltip</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger className={triggerClass}>Bottom</TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Bottom tooltip</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger className={triggerClass}>Left</TooltipTrigger>
        <TooltipContent side="left">
          <p>Left tooltip</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger className={triggerClass}>Right</TooltipTrigger>
        <TooltipContent side="right">
          <p>Right tooltip</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const CustomOffset: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger className={triggerClass}>Offset Tooltip</TooltipTrigger>
      <TooltipContent side="top" sideOffset={20}>
        <p>This tooltip is 20px away</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithKeyboardShortcut: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger className={triggerClass}>Print</TooltipTrigger>
      <TooltipContent className="flex items-center gap-4">
        <span>Print Document</span>
        {/* Testing your specific tailwind selector `**:data-[slot=kbd]` */}
        <kbd
          data-slot="kbd"
          className="bg-slate-800 text-slate-100 px-1.5 py-0.5 text-[10px] font-mono"
        >
          ⌘P
        </kbd>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Delayed: Story = {
  render: () => (
    <Tooltip delayDuration={1000}>
      <TooltipTrigger className={triggerClass}>
        Hover for 1 second
      </TooltipTrigger>
      <TooltipContent>
        <p>Thanks for waiting!</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="text-sm underline"
            onClick={() => setOpen(!open)}
          >
            Toggle Tooltip Externally
          </button>
        </div>

        <Tooltip open={open} onOpenChange={setOpen}>
          <TooltipTrigger className={triggerClass}>
            I am controlled
          </TooltipTrigger>
          <TooltipContent>
            <p>I can be controlled via state</p>
          </TooltipContent>
        </Tooltip>
      </div>
    );
  },
};

export const RichContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger className={triggerClass}>User Info</TooltipTrigger>
      <TooltipContent className="max-w-[200px] p-4">
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-sm">Jane Doe</h4>
          <p className="text-xs opacity-80 leading-relaxed">
            Lead Designer at Acme Corp. Specializes in UI/UX and design systems.
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  ),
};
