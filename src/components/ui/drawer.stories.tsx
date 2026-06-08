import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "./drawer";
import { Button } from "./button";
import React, { useState } from "react";

/**
 * A drawer component built on top of `vaul`, providing a mobile-friendly
 * swipeable panel that can slide in from any direction.
 */
const meta: Meta<typeof Drawer> = {
  title: "Design System/UI/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["bottom", "top", "left", "right"],
      description: "The direction from which the drawer slides in.",
    },
    dismissible: {
      control: "boolean",
      description:
        "Whether the drawer can be dismissed by clicking outside or swiping.",
    },
    shouldScaleBackground: {
      control: "boolean",
      description:
        "Whether the body background should scale down when the drawer opens.",
    },
    open: {
      control: "boolean",
      description: "Controlled open state of the drawer.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

const DrawerTemplate = (args: React.ComponentProps<typeof Drawer>) => (
  <Drawer {...args}>
    <DrawerTrigger asChild>
      <Button variant="outline">
        Open Drawer ({args.direction || "bottom"})
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>
            This is a description of the drawer content. You can put any
            component here.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pb-0">
          <div className="flex items-center justify-center space-x-2">
            <div className="flex-1 text-center">
              <div className="text-5xl font-bold tracking-tighter">44</div>
              <div className="text-[0.70rem] uppercase text-muted-foreground">
                Example Metric
              </div>
            </div>
          </div>
          <div className="mt-3 h-[120px] rounded-t-lg bg-muted flex items-center justify-center text-muted-foreground italic">
            Chart or custom content area
          </div>
        </div>
        <DrawerFooter>
          <Button>Submit Action</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
);

/**
 * The default drawer sliding in from the bottom.
 */
export const Default: Story = {
  render: (args) => <DrawerTemplate {...args} />,
  args: {
    direction: "bottom",
  },
};

/**
 * Drawer sliding in from the left side.
 */
export const LeftPosition: Story = {
  render: (args) => <DrawerTemplate {...args} />,
  args: {
    direction: "left",
  },
};

/**
 * Drawer sliding in from the right side.
 */
export const RightPosition: Story = {
  render: (args) => <DrawerTemplate {...args} />,
  args: {
    direction: "right",
  },
};

/**
 * Drawer sliding in from the top.
 */
export const TopPosition: Story = {
  render: (args) => <DrawerTemplate {...args} />,
  args: {
    direction: "top",
  },
};

/**
 * Demonstrates a controlled drawer state where the parent component
 * manages the `open` state.
 */
export const Controlled: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-muted-foreground">
          Current state: {open ? "Open" : "Closed"}
        </p>
        <Button onClick={() => setOpen(true)}>Open via External State</Button>
        <Drawer {...args} open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Controlled Drawer</DrawerTitle>
              <DrawerDescription>
                This drawer's visibility is managed by React state.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-6">
              <Button className="w-full" onClick={() => setOpen(false)}>
                Close via State
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    );
  },
};

/**
 * Example of a drawer with custom styling applied to its sub-components.
 */
export const CustomContent: Story = {
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button variant="destructive">Open Danger Zone</Button>
      </DrawerTrigger>
      <DrawerContent className="bg-red-50 dark:bg-red-950">
        <DrawerHeader>
          <DrawerTitle className="text-red-600">
            Are you absolutely sure?
          </DrawerTitle>
          <DrawerDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button variant="destructive">Delete Account</Button>
          <DrawerClose asChild>
            <Button variant="ghost">Keep Account</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
