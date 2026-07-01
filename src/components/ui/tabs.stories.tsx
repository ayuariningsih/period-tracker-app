import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppWindowIcon, CodeIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

const meta = {
  title: "Design System/UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "The orientation of the tabs.",
    },
    defaultValue: {
      control: "text",
      description:
        "The value of the tab that should be active when initially rendered.",
    },
  },
  decorators: [
    (Story) => (
      <div className="flex w-full items-center justify-center p-6 sm:p-12">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Default (Usage)
export const Default: Story = {
  args: {
    defaultValue: "account",
    className: "w-[400px]",
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent
        value="account"
        className="rounded-xl border p-4 mt-2 text-sm text-muted-foreground"
      >
        Make changes to your account here.
      </TabsContent>
      <TabsContent
        value="password"
        className="rounded-xl border p-4 mt-2 text-sm text-muted-foreground"
      >
        Change your password here.
      </TabsContent>
    </Tabs>
  ),
};

// 2. Line
export const Line: Story = {
  args: {
    defaultValue: "overview",
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent
        value="overview"
        className="text-sm mt-4 text-muted-foreground"
      >
        Overview content panel.
      </TabsContent>
      <TabsContent
        value="analytics"
        className="text-sm mt-4 text-muted-foreground"
      >
        Analytics content panel.
      </TabsContent>
      <TabsContent
        value="reports"
        className="text-sm mt-4 text-muted-foreground"
      >
        Reports content panel.
      </TabsContent>
    </Tabs>
  ),
};

// 3. Vertical
export const Vertical: Story = {
  args: {
    defaultValue: "account",
    orientation: "vertical",
    className: "w-[500px]",
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList className="w-48 items-stretch">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <div className="flex-1 rounded-xl border p-4">
        <TabsContent
          value="account"
          className="m-0 text-sm text-muted-foreground"
        >
          Account settings panel.
        </TabsContent>
        <TabsContent
          value="password"
          className="m-0 text-sm text-muted-foreground"
        >
          Password settings panel.
        </TabsContent>
        <TabsContent
          value="notifications"
          className="m-0 text-sm text-muted-foreground"
        >
          Notification preferences panel.
        </TabsContent>
      </div>
    </Tabs>
  ),
};

// 4. Disabled
export const Disabled: Story = {
  args: {
    defaultValue: "home",
    className: "w-[400px]",
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
      <TabsContent value="home" className="text-sm mt-4 text-muted-foreground">
        Home content panel.
      </TabsContent>
      <TabsContent
        value="disabled"
        className="text-sm mt-4 text-muted-foreground"
      >
        This should not be reachable.
      </TabsContent>
    </Tabs>
  ),
};

// 5. Icons
export const Icons: Story = {
  args: {
    defaultValue: "preview",
    className: "w-[400px]",
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="preview" data-icon="inline-start">
          <AppWindowIcon /> Preview
        </TabsTrigger>
        <TabsTrigger value="code" data-icon="inline-start">
          <CodeIcon /> Code
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="preview"
        className="rounded-xl border p-4 mt-2 text-sm text-muted-foreground"
      >
        Preview panel content.
      </TabsContent>
      <TabsContent
        value="code"
        className="rounded-xl border p-4 mt-2 text-sm text-muted-foreground"
      >
        Source code panel content.
      </TabsContent>
    </Tabs>
  ),
};

// 6. Playground
export const Playground: Story = {
  tags: ["!dev"],
  args: {
    defaultValue: "tab1",
    orientation: "horizontal",
    className: "w-[600px]",
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList className="w-full">
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3" disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="tab1"
        className="rounded-xl border p-4 mt-2 text-sm text-muted-foreground"
      >
        Content for Tab 1
      </TabsContent>
      <TabsContent
        value="tab2"
        className="rounded-xl border p-4 mt-2 text-sm text-muted-foreground"
      >
        Content for Tab 2
      </TabsContent>
      <TabsContent
        value="tab3"
        className="rounded-xl border p-4 mt-2 text-sm text-muted-foreground"
      >
        This should not be reachable.
      </TabsContent>
    </Tabs>
  ),
};
