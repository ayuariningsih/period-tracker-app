import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./input";

/**
 * A highly reusable and accessible input component.
 * Supports prefixes, suffixes, loading states, and contextual addons.
 */
const meta: Meta<typeof Input> = {
  title: "Design System/UI/Input",
  component: Input,
  tags: ["autodocs"],
  // Global decorators for layout, accessibility, and theme support
  decorators: [
    (Story) => (
      <div className="flex flex-col gap-2 max-w-lg w-full">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-foreground">
            Input Label
          </span>
          <Story />
        </label>
      </div>
    ),
  ],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number"],
      description: "The HTML input type",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    prefix: {
      control: "text",
      description: "Content rendered inside the input (left)",
    },
    suffix: {
      control: "text",
      description: "Content rendered inside the input (right)",
    },
    addonBefore: {
      control: "text",
      description: "Content rendered outside the input (left)",
    },
    addonAfter: {
      control: "text",
      description: "Content rendered outside the input (right)",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    invalid: {
      control: "boolean",
      description: "Whether the input has a validation error",
    },
    loading: {
      control: "boolean",
      description: "Whether the input is in a loading state",
    },
  },
  args: {
    type: "text",
    placeholder: "Type something...",
    disabled: false,
    invalid: false,
    loading: false,
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

/**
 * 1. Playground: Interactive control over all major props.
 */
export const Playground: Story = {};

/**
 * 2. Default: Base text input with no extra props.
 */
export const Default: Story = {
  args: {
    placeholder: "",
  },
};

/**
 * 3. With value: Pre-populated state.
 */
export const WithValue: Story = {
  args: {
    placeholder: "Enter username",
    defaultValue: "johndoe",
  },
};

/**
 * 4. Disabled: Interaction blocked.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "I am disabled",
  },
};

/**
 * 5. Invalid: Error state styling.
 */
export const Invalid: Story = {
  args: {
    invalid: true,
    defaultValue: "Invalid entry",
  },
};

/**
 * 6. Read-only: Prevent edits while maintaining styling.
 */
export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: "I am read-only",
  },
};

/**
 * 7. With prefix: Icon or character inside the left edge.
 */
export const WithPrefix: Story = {
  args: {
    prefix: "🔍",
    placeholder: "Search...",
  },
};

/**
 * 8. With suffix: Indicator inside the right edge.
 */
export const WithSuffix: Story = {
  args: {
    suffix: "⌘K",
    placeholder: "Type to search",
  },
};

/**
 * 9. With loading spinner: Built-in processing indicator.
 */
export const WithLoading: Story = {
  args: {
    loading: true,
    placeholder: "Processing...",
  },
};

/**
 * 10. With addons: Contextual elements outside the input edges.
 */
export const WithAddons: Story = {
  args: {
    addonBefore: "https://",
    addonAfter: ".com",
    placeholder: "example",
  },
};

/**
 * 11. Full composition: Combining all complex features.
 */
export const FullComposition: Story = {
  args: {
    prefix: "📧",
    suffix: "✓",
    addonBefore: "user:",
    addonAfter: "@company.com",
    invalid: true,
    placeholder: "username",
  },
};
