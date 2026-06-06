import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";
import { ChevronRight, Mail, Loader2, Plus } from "lucide-react";

/**
 * A highly reusable and versatile button component for various user interactions.
 * Built on top of `radix-ui` Slot for maximum flexibility and styled with Tailwind CSS.
 */
const meta: Meta<typeof Button> = {
  title: "Design System/UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      description: "The visual style of the button",
    },
    size: {
      control: "select",
      options: [
        "default",
        "sm",
        "lg",
        "icon",
        "xs",
        "icon-xs",
        "icon-sm",
        "icon-lg",
      ],
      description: "The size of the button",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is interactive",
    },
    asChild: {
      control: "boolean",
      description:
        "Change the rendered element to the child element (e.g., an <a> tag)",
    },
    children: {
      control: "text",
      description: "The content of the button",
    },
  },
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    disabled: false,
    asChild: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * Interactive playground to test all button properties dynamically.
 */
export const Playground: Story = {
  args: {
    children: "Interactive Button",
  },
};

/**
 * Displays all available visual variants side-by-side.
 */
export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button {...args} variant="default">
        Default
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="destructive">
        Destructive
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="link">
        Link
      </Button>
    </div>
  ),
};

/**
 * Showcases all supported button sizes to demonstrate scaling.
 */
export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button {...args} size="xs">
        Extra Small (xs)
      </Button>
      <Button {...args} size="sm">
        Small (sm)
      </Button>
      <Button {...args} size="default">
        Default
      </Button>
      <Button {...args} size="lg">
        Large (lg)
      </Button>
      <div className="flex gap-2 items-center">
        <Button {...args} size="icon-xs">
          <Plus className="size-3" />
        </Button>
        <Button {...args} size="icon-sm">
          <Plus className="size-3.5" />
        </Button>
        <Button {...args} size="icon">
          <Plus className="size-4" />
        </Button>
        <Button {...args} size="icon-lg">
          <Plus className="size-5" />
        </Button>
      </div>
    </div>
  ),
};

/**
 * Demonstrates the disabled state across all variants to verify styling and interaction blocking.
 */
export const DisabledState: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button {...args} variant="default" disabled>
        Default
      </Button>
      <Button {...args} variant="secondary" disabled>
        Secondary
      </Button>
      <Button {...args} variant="outline" disabled>
        Outline
      </Button>
      <Button {...args} variant="destructive" disabled>
        Destructive
      </Button>
      <Button {...args} variant="ghost" disabled>
        Ghost
      </Button>
      <Button {...args} variant="link" disabled>
        Link
      </Button>
    </div>
  ),
};

/**
 * Demonstrates using `asChild` to render the button as a link (`<a>` tag).
 */
export const AsChild: Story = {
  args: {
    asChild: true,
    children: (
      <a href="https://google.com" target="_blank" rel="noopener noreferrer">
        Rendered as Link (a tag)
      </a>
    ),
  },
};

/**
 * Examples of buttons containing icons, demonstrating alignment and spacing.
 */
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button>
        <Mail className="mr-2 h-4 w-4" /> Login with Email
      </Button>
      <Button variant="outline">
        Next Step <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </Button>
    </div>
  ),
};
