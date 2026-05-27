import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from "./IconButton";
import { Plus, Search, Settings, Heart, Bell } from "lucide-react";

const meta: Meta<typeof IconButton> = {
  title: "Design System/Components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
    onClick: { action: "clicked" },
  },
  args: {
    variant: "primary",
    size: "md",
    icon: Plus,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  args: {
    variant: "primary",
    icon: Plus,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    icon: Search,
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    icon: Settings,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <IconButton {...args} size="xs" icon={Heart} />
      <IconButton {...args} size="sm" icon={Heart} />
      <IconButton {...args} size="md" icon={Heart} />
      <IconButton {...args} size="lg" icon={Heart} />
    </div>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <IconButton {...args} variant="primary" icon={Bell} />
      <IconButton {...args} variant="secondary" icon={Bell} />
      <IconButton {...args} variant="tertiary" icon={Bell} />
    </div>
  ),
};