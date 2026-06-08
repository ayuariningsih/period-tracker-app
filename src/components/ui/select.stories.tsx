import type { Args, Meta, StoryObj } from "@storybook/react-vite";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select";

/**
 * A flexible select component built on top of Radix UI's Select primitive.
 * It provides a list of options for the user to choose from, appearing in a custom overlay.
 * Refactored to meet WCAG 2.1 AA touch target requirements (44px min height).
 */
const meta: Meta<typeof Select> = {
  title: "Design-System/UI/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description:
        "When true, prevents the user from interacting with the select.",
    },
    required: {
      control: "boolean",
      description:
        "When true, indicates that the user must select a value before submitting the form.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const SelectTemplate = (args: Args) => (
  <Select {...args}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
);

/**
 * The default state of the select component with a placeholder.
 */
export const Default: Story = {
  render: (args) => <SelectTemplate {...args} />,
};

/**
 * Select with a pre-defined value.
 */
export const WithValue: Story = {
  args: {
    defaultValue: "apple",
  },
  render: (args) => <SelectTemplate {...args} />,
};

/**
 * Demonstrates the select in a disabled state.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => <SelectTemplate {...args} />,
};

/**
 * Demonstrates the error state using `aria-invalid` on the Trigger.
 * Also verifies that the touch target meets the 44px minimum height.
 */
export const Invalid: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-[180px]" aria-invalid="true">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/**
 * A smaller size variant of the select trigger.
 */
export const SmallSize: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-[180px]" size="sm">
        <SelectValue placeholder="Small select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/**
 * Select organized with groups, labels, and separators.
 */
export const Grouped: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
          <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
          <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
          <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Europe & Africa</SelectLabel>
          <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
          <SelectItem value="cet">Central European Time (CET)</SelectItem>
          <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
          <SelectItem value="west">
            Western European Summer Time (WEST)
          </SelectItem>
          <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

/**
 * Demonstrates the `popper` position variant with a scrollable list.
 */
export const PopperPosition: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a number" />
      </SelectTrigger>
      <SelectContent position="popper">
        {Array.from({ length: 20 }, (_, i) => (
          <SelectItem key={i} value={`option-${i}`}>
            Option {i + 1}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
};
