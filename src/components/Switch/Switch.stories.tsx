import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch, InlineSwitch } from "./Switch";
import { Field } from "../Field/Field";
import React, { useState } from 'react';

const meta: Meta<typeof Switch> = {
  title: "Design System/Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    value: { control: "boolean" },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    size: {
      control: "select",
      options: ["small", "medium"],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "error"],
    },
  },
  args: {
    value: false,
    disabled: false,
    invalid: false,
    size: "medium",
    color: "primary",
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Basic: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checked, setChecked] = useState(args.value ?? false);
    return (
      <Switch
        {...args}
        value={checked}
        onChange={(e) => setChecked(e.currentTarget.checked)}
      />
    );
  },
};

export const WithField: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checked, setChecked] = useState(args.value ?? false);
    return (
      <div className="w-[300px]">
        <Field label="MUI Style Toggle" description="This switch is inspired by Material UI's design language.">
          <Switch
            {...args}
            value={checked}
            onChange={(e) => setChecked(e.currentTarget.checked)}
          />
        </Field>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Switch {...args} size="small" value={false} readOnly />
        <span className="text-xs text-gray-500">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Switch {...args} size="medium" value={false} readOnly />
        <span className="text-xs text-gray-500">Medium</span>
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Switch {...args} color="primary" value={true} readOnly />
        <span className="text-xs text-gray-500">Primary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Switch {...args} color="secondary" value={true} readOnly />
        <span className="text-xs text-gray-500">Secondary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Switch {...args} color="error" value={true} readOnly />
        <span className="text-xs text-gray-500">Error</span>
      </div>
    </div>
  ),
};

export const Inline: StoryObj<typeof InlineSwitch> = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checked, setChecked] = useState(false);
    return (
      <InlineSwitch
        {...args}
        label="Enable Push Notifications"
        value={checked}
        onChange={(e) => setChecked(e.currentTarget.checked)}
      />
    );
  },
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="text-sm w-24">Off</span>
        <Switch value={false} readOnly />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm w-24">On</span>
        <Switch value={true} readOnly />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm w-24">Disabled Off</span>
        <Switch disabled value={false} readOnly />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm w-24">Disabled On</span>
        <Switch disabled value={true} readOnly />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm w-24">Invalid</span>
        <Switch invalid value={false} readOnly />
      </div>
    </div>
  ),
};