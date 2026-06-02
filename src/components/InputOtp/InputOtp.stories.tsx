import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputOtp } from "./InputOtp";
import type { InputOtpChangeEvent } from "./InputOtp";
import { Field } from "../Field/Field";
import { useState } from "react";

const meta: Meta<typeof InputOtp> = {
  title: "Design System/Components/InputOtp",
  component: InputOtp,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    length: { control: { type: "number", min: 1, max: 10 } },
    mask: { control: "boolean" },
    integerOnly: { control: "boolean" },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
  },
  args: {
    length: 4,
    mask: false,
    integerOnly: false,
    disabled: false,
    invalid: false,
  },
};

export default meta;
type Story = StoryObj<typeof InputOtp>;

export const Basic: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState("");
    return (
      <InputOtp
        {...args}
        value={value}
        onChange={(e: InputOtpChangeEvent) => setValue(e.value)}
      />
    );
  },
};

export const SixDigits: Story = {
  args: {
    length: 6,
    integerOnly: true,
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState("");
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Enter the 6-digit code sent to your email
        </p>
        <InputOtp
          {...args}
          value={value}
          onChange={(e: InputOtpChangeEvent) => setValue(e.value)}
        />
      </div>
    );
  },
};

export const Masked: Story = {
  args: {
    mask: true,
    length: 4,
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState("");
    return (
      <Field label="Security PIN" description="Enter your 4-digit secret PIN.">
        <InputOtp
          {...args}
          value={value}
          onChange={(e: InputOtpChangeEvent) => setValue(e.value)}
        />
      </Field>
    );
  },
};

export const InAField: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState("");
    return (
      <div className="w-[400px]">
        <Field
          label="Verification Code"
          description="Check your SMS for the code."
          invalid={args.invalid}
          error={args.invalid ? "Invalid code. Please try again." : undefined}
          required
        >
          <InputOtp
            {...args}
            value={value}
            onChange={(e: InputOtpChangeEvent) => setValue(e.value)}
          />
        </Field>
      </div>
    );
  },
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500">Disabled</span>
        <InputOtp length={4} value="1234" disabled />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500">Invalid</span>
        <InputOtp length={4} value="12" invalid />
      </div>
    </div>
  ),
};
