import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";
import { Field } from "../Field/Field";
import React, { useState, useCallback } from "react";

const meta: Meta<typeof Checkbox> = {
  title: "Design System/Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: {
      exclude: ["checked"],
    },
  },
  argTypes: {
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    label: { control: "text" },
    description: { control: "text" },
  },
  args: {
    indeterminate: false,
    disabled: false,
    invalid: false,
    label: "Skip TLS cert validation",
    description: "Set to true if you want to skip TLS cert validation",
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Basic: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checked, setChecked] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const onChange = useCallback(
      (e: React.FormEvent<HTMLInputElement>) => setChecked(e.currentTarget.checked),
      [setChecked]
    );

    return <Checkbox {...args} checked={checked} onChange={onChange} />;
  },
};

export const InAField: Story = {
  args: {
    label: "Hidden",
    description:
      "Annotation queries can be toggled on or off at the top of the dashboard. With this option checked this toggle will be hidden.",
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checked, setChecked] = useState(true);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const onChange = useCallback(
      (e: React.FormEvent<HTMLInputElement>) => setChecked(e.currentTarget.checked),
      [setChecked]
    );

    return (
      <div className="w-[400px]">
        <Field {...args}>
          <Checkbox checked={checked} onChange={onChange} />
        </Field>
      </div>
    );
  },
};

export const AllStates: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checked, setChecked] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const onChange = useCallback(
      (e: React.FormEvent<HTMLInputElement>) => setChecked(e.currentTarget.checked),
      [setChecked]
    );

    return (
      <div className="flex flex-col gap-6">
        <Checkbox {...args} checked={checked} onChange={onChange} />
        <Checkbox checked={true} label="Checked" readOnly />
        <Checkbox checked={false} label="Unchecked" readOnly />
        <Checkbox checked={false} indeterminate={true} label="Indeterminate" readOnly />
        <Checkbox checked={false} invalid={true} label="Invalid and unchecked" readOnly />
        <Checkbox checked={true} invalid={true} label="Invalid and checked" readOnly />
      </div>
    );
  },
  args: {
    label: "Props set from controls",
    description: "Set to true if you want to skip TLS cert validation",
  },
};

export const IndeterminateExample: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checked, setChecked] = useState([true, false]);

    const allChecked = checked.every(Boolean);
    const isIndeterminate = checked.some(Boolean) && !allChecked;

    return (
      <div className="flex flex-col gap-2">
        <Checkbox
          label="Parent"
          checked={allChecked}
          indeterminate={isIndeterminate}
          onChange={(e) => setChecked([e.currentTarget.checked, e.currentTarget.checked])}
        />
        <div className="ml-6 flex flex-col gap-2">
          <Checkbox
            label="Child 1"
            checked={checked[0]}
            onChange={(e) => setChecked([e.currentTarget.checked, checked[1]])}
          />
          <Checkbox
            label="Child 2"
            checked={checked[1]}
            onChange={(e) => setChecked([checked[0], e.currentTarget.checked])}
          />
        </div>
      </div>
    );
  },
};