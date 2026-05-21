import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from "./Button";

// ==========================================
// Meta Configuration
// ==========================================
const meta: Meta<typeof Button> = {
  title: "Design System/Components/Button",
  component: Button,
  tags: ["autodocs"], // Automatically generates a docs page
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The core Button component used across the application. Supports multiple variants, sizes, and states. Ensure contrast ratios meet WCAG standards in both light and dark modes.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "link"],
      description: "The visual style of the button",
    },
    theme: {
      control: "select",
      options: ["default", "danger", "success"],
      description: "The semantic color theme applied to the variant",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "The physical footprint and padding",
    },
    fullWidth: {
      control: "boolean",
      description: "Whether the button spans the full width of its container",
    },
    loading: {
      control: "boolean",
      description: "Replaces text with a spinner and disables interaction",
    },
    disabled: {
      control: "boolean",
      description: "Prevents interaction and applies deactivated styling",
    },
    onClick: { action: "clicked" },
  },
  args: {
    children: "Button Text",
    variant: "primary",
    theme: "default",
    size: "md",
    fullWidth: false,
    loading: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ==========================================
// Base Variants
// ==========================================

export const Primary: Story = {
  args: {
    variant: "primary",
    theme: "default",
    children: "Primary Action",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Action",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    children: "Tertiary Action",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link Action",
  },
};

// ==========================================
// States (Interactive & Edge Cases)
// ==========================================

export const Loading: Story = {
  args: {
    variant: "primary",
    loading: true,
    children: "Submitting...",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    disabled: true,
    children: "Not Allowed",
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: "Block Level Button",
  },
  parameters: {
    layout: "padded", // Changes layout so full-width is visible
  },
};

// ==========================================
// Size Matrix (Visual Regression Testing)
// ==========================================

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Button {...args} size="xs">Extra Small</Button>
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "A comparison of all available button sizes side-by-side to ensure padding and typography scale harmoniously.",
      },
    },
  },
};