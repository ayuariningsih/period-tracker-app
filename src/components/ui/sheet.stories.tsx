import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "./sheet";

/**
 * A sheet component built on top of Radix UI Dialog, that slides in from a specified side.
 * Ideal for navigation, menus, or additional content panels.
 */
const meta: Meta = {
  title: "Design System/UI/Sheet",
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "The side from which the sheet slides in.",
      table: {
        type: { summary: "'top' | 'right' | 'bottom' | 'left'" },
        defaultValue: { summary: "'right'" },
      },
    },
    showCloseButton: {
      control: "boolean",
      description:
        "Whether to display the close button in the corner of the sheet.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
  },
  args: {
    side: "right",
    showCloseButton: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open sheet</Button>
      </SheetTrigger>
      <SheetContent {...args}>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you are done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm text-muted-foreground">
            This is where the main content of your sheet would go.
          </p>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const NoCloseButton: Story = {
  args: {
    showCloseButton: false,
  },
  render: (args) => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open sheet (no close button)</Button>
      </SheetTrigger>
      <SheetContent {...args} showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>Sheet without close button</SheetTitle>
          <SheetDescription>
            You must use the footer button or click outside to close.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const SideTop: Story = {
  args: {
    side: "top",
  },
  render: (args) => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open sheet from top</Button>
      </SheetTrigger>
      <SheetContent {...args} side="top">
        <SheetHeader>
          <SheetTitle>Top sheet</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

export const SideBottom: Story = {
  args: {
    side: "bottom",
  },
  render: (args) => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open sheet from bottom</Button>
      </SheetTrigger>
      <SheetContent {...args} side="bottom">
        <SheetHeader>
          <SheetTitle>Bottom sheet</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

export const SideLeft: Story = {
  args: {
    side: "left",
  },
  render: (args) => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open sheet from left</Button>
      </SheetTrigger>
      <SheetContent {...args} side="left">
        <SheetHeader>
          <SheetTitle>Left sheet</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};
