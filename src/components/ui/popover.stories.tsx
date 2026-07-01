// /Users/ayuariningsihsupardigmail.com/Work/Personal Works/Period Tracker App/web-period-tracker-app/src/components/ui/popover.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
} from "./popover";
import { Button } from "./button";
import { Input } from "./input";
import { X } from "lucide-react";
import { Label } from "./label";

/**
 * A floating UI component that displays rich content in a portal, triggered by a button.
 * Built on Radix UI primitives for accessibility and keyboard navigation.
 */
const meta: Meta<typeof Popover> = {
  title: "Design System/UI/Popover",
  component: Popover,
  tags: ["autodocs", "a11y"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Popover>;

/**
 * Interactive playground to test all Popover properties.
 */
export const Playground: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <PopoverHeader>
          <PopoverTitle>Edit Dimensions</PopoverTitle>
          <PopoverDescription>
            Make changes to the dimensions here. Click outside or press Escape
            to close.
          </PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="width">Width</Label>
              <Input id="width" defaultValue="100%" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="height">Height</Label>
              <Input id="height" defaultValue="25px" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * Demonstrates different alignment options (start, center, end).
 */
export const Alignment: Story = {
  render: () => (
    <div className="flex gap-4 justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Align Start</Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <PopoverHeader>
            <PopoverTitle>Start Aligned</PopoverTitle>
          </PopoverHeader>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Align Center</Button>
        </PopoverTrigger>
        <PopoverContent align="center">
          <PopoverHeader>
            <PopoverTitle>Center Aligned</PopoverTitle>
          </PopoverHeader>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Align End</Button>
        </PopoverTrigger>
        <PopoverContent align="end">
          <PopoverHeader>
            <PopoverTitle>End Aligned</PopoverTitle>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

/**
 * Demonstrates different side positioning (top, bottom, left, right).
 */
export const SidePositioning: Story = {
  render: () => (
    <div className="flex gap-4 justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Top</Button>
        </PopoverTrigger>
        <PopoverContent side="top">
          <PopoverHeader>
            <PopoverTitle>Top Position</PopoverTitle>
          </PopoverHeader>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </PopoverTrigger>
        <PopoverContent side="bottom">
          <PopoverHeader>
            <PopoverTitle>Bottom Position</PopoverTitle>
          </PopoverHeader>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Left</Button>
        </PopoverTrigger>
        <PopoverContent side="left">
          <PopoverHeader>
            <PopoverTitle>Left Position</PopoverTitle>
          </PopoverHeader>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Right</Button>
        </PopoverTrigger>
        <PopoverContent side="right">
          <PopoverHeader>
            <PopoverTitle>Right Position</PopoverTitle>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

/**
 * Demonstrates with a custom close button.
 */
export const WithCloseButton: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex justify-between items-start">
          <PopoverHeader>
            <PopoverTitle>Popover with Close</PopoverTitle>
            <PopoverDescription>Click the X to close.</PopoverDescription>
          </PopoverHeader>
          <PopoverClose asChild>
            <Button variant="ghost" size="icon-sm" className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
