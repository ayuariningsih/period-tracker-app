import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputNumber } from "./InputNumber";
import type { InputNumberValueChangeEvent } from "./InputNumber";
import { Field } from "../Field/Field";
import { useState } from "react";

const meta: Meta<typeof InputNumber> = {
  title: "Design System/Components/InputNumber",
  component: InputNumber,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    value: { control: "number" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    showButtons: { control: "boolean" },
    buttonLayout: {
      control: "select",
      options: ["stacked", "horizontal"],
    },
    mode: {
      control: "select",
      options: ["decimal", "currency"],
    },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
  },
  args: {
    showButtons: false,
    buttonLayout: "stacked",
    mode: "decimal",
    disabled: false,
    invalid: false,
  },
};

export default meta;
type Story = StoryObj<typeof InputNumber>;

export const Basic: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<number | null>(10);
    return (
      <div className="w-[300px]">
        <InputNumber
          {...args}
          value={value}
          onValueChange={(e: InputNumberValueChangeEvent) => setValue(e.value)}
        />
      </div>
    );
  },
};

export const WithButtons: Story = {
  args: {
    showButtons: true,
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<number | null>(50);
    return (
      <div className="w-[300px]">
        <Field label="Quantity" description="Select the number of items.">
          <InputNumber
            {...args}
            value={value}
            onValueChange={(e: InputNumberValueChangeEvent) =>
              setValue(e.value)
            }
          />
        </Field>
      </div>
    );
  },
};

export const HorizontalButtons: Story = {
  args: {
    showButtons: true,
    buttonLayout: "horizontal",
    step: 0.5,
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<number | null>(2.5);
    return (
      <div className="w-[300px]">
        <Field label="Weight (kg)" description="Increase by 0.5kg steps.">
          <InputNumber
            {...args}
            value={value}
            onValueChange={(e: InputNumberValueChangeEvent) =>
              setValue(e.value)
            }
          />
        </Field>
      </div>
    );
  },
};

export const Currency: Story = {
  args: {
    mode: "currency",
    currency: "USD",
    locale: "en-US",
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<number | null>(1500);
    return (
      <div className="w-[300px]">
        <Field label="Price" description="Amount in USD.">
          <InputNumber
            {...args}
            value={value}
            onValueChange={(e: InputNumberValueChangeEvent) =>
              setValue(e.value)
            }
          />
        </Field>
      </div>
    );
  },
};

export const PrefixAndSuffix: Story = {
  args: {
    prefix: "Mile: ",
    suffix: " mi",
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<number | null>(20);
    return (
      <div className="w-[300px]">
        <InputNumber
          {...args}
          value={value}
          onValueChange={(e: InputNumberValueChangeEvent) => setValue(e.value)}
        />
      </div>
    );
  },
};

export const Boundaries: Story = {
  args: {
    min: 0,
    max: 100,
    showButtons: true,
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<number | null>(50);
    return (
      <div className="w-[300px]">
        <Field
          label="Percentage"
          description="Value must be between 0 and 100."
        >
          <InputNumber
            {...args}
            value={value}
            onValueChange={(e: InputNumberValueChangeEvent) =>
              setValue(e.value)
            }
          />
        </Field>
      </div>
    );
  },
};
