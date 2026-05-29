import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field } from "./Field";
import { Input } from "../Input/Input";
import { Search, Mail } from "lucide-react";

const meta: Meta<typeof Field> = {
  title: "Design System/Components/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: { control: "text" },
    description: { control: "text" },
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    error: { control: "text" },
    horizontal: { control: "boolean" },
    noMargin: { control: "boolean" },
  },
  args: {
    label: "Field Label",
    description: "This is a field description providing more context.",
    invalid: false,
    disabled: false,
    required: false,
    error: "This field is required",
    horizontal: false,
    noMargin: false,
  },
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Basic: Story = {
  render: (args) => (
    <div className="w-[400px]">
      <Field {...args}>
        <Input placeholder="Enter some text..." />
      </Field>
    </div>
  ),
};

export const WithPrefix: Story = {
  args: {
    label: "Search",
    description: "Search for specific data points.",
  },
  render: (args) => (
    <div className="w-[400px]">
      <Field {...args}>
        <Input prefix={<Search size={16} />} placeholder="Search..." />
      </Field>
    </div>
  ),
};

export const Required: Story = {
  args: {
    label: "Email Address",
    required: true,
  },
  render: (args) => (
    <div className="w-[400px]">
      <Field {...args}>
        <Input type="email" placeholder="email@example.com" suffix={<Mail size={16} />} />
      </Field>
    </div>
  ),
};

export const Invalid: Story = {
  args: {
    label: "Username",
    invalid: true,
    error: "Username is already taken",
  },
  render: (args) => (
    <div className="w-[400px]">
      <Field {...args}>
        <Input defaultValue="already_taken" />
      </Field>
    </div>
  ),
};

export const Horizontal: Story = {
  args: {
    label: "Enable Notifications",
    description: "Receive push notifications for cycle updates",
    horizontal: true,
  },
  render: (args) => (
    <div className="w-[500px]">
      <Field {...args}>
        <input type="checkbox" className="h-5 w-5 accent-gray-600" />
      </Field>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: "Deactivated Field",
    disabled: true,
    description: "This field cannot be edited at the moment.",
  },
  render: (args) => (
    <div className="w-[400px]">
      <Field {...args}>
        <Input value="Disabled content" readOnly />
      </Field>
    </div>
  ),
};
