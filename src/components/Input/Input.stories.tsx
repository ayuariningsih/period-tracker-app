import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";
import { Field } from "../Field/Field";
import { useState } from "react";
import { Search, Mail, Lock, AlertCircle } from "lucide-react";

const meta: Meta<typeof Input> = {
  title: "Design System/Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    invalid: { control: "boolean" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    placeholder: "Type something...",
    invalid: false,
    loading: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Basic: Story = {
  args: {
    placeholder: "Basic input",
  },
  render: (args) => (
    <div className="w-[400px]">
      <Field label="Username" description="Please enter your unique username.">
        <Input {...args} />
      </Field>
    </div>
  ),
};

export const WithValidation: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    const isInvalid = value.length > 0 && value.length < 3;

    return (
      <div className="w-[400px]">
        <Field
          label="Display Name"
          description="Must be at least 3 characters long."
          invalid={isInvalid}
          error={isInvalid ? "Name is too short" : undefined}
          required
        >
          <Input
            {...args}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            placeholder="Enter name..."
          />
        </Field>
      </div>
    );
  },
};

export const WithPrefix: Story = {
  args: {
    placeholder: "Search components...",
    prefix: <Search size={16} />,
  },
  render: (args) => (
    <div className="w-[400px]">
      <Field label="Search" description="Search through the design system.">
        <Input {...args} />
      </Field>
    </div>
  ),
};

export const WithSuffix: Story = {
  args: {
    placeholder: "Email address",
    suffix: <Mail size={16} />,
  },
  render: (args) => (
    <div className="w-[400px]">
      <Field label="Email" required>
        <Input {...args} type="email" />
      </Field>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    placeholder: "Validating...",
    loading: true,
  },
  render: (args) => (
    <div className="w-[400px]">
      <Field
        label="Account Status"
        description="Checking your account availability..."
      >
        <Input {...args} />
      </Field>
    </div>
  ),
};

export const Invalid: Story = {
  args: {
    placeholder: "Error state",
    invalid: true,
    suffix: <AlertCircle size={16} className="text-red-500" />,
  },
  render: (args) => (
    <div className="w-[350px]">
      <Input {...args} />
    </div>
  ),
};

export const WithAddons: Story = {
  args: {
    placeholder: "yourname",
    addonBefore: "https://",
    addonAfter: ".com",
  },
  render: (args) => (
    <div className="w-[500px]">
      <Field
        label="Website URL"
        description="Enter your personal portfolio URL."
      >
        <Input {...args} />
      </Field>
    </div>
  ),
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
    prefix: <Lock size={16} />,
  },
  render: (args) => (
    <div className="w-[400px]">
      <Field
        label="Password"
        required
        description="Ensure your password is strong."
      >
        <Input {...args} />
      </Field>
    </div>
  ),
};
