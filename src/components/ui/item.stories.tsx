import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ChevronRight,
  Droplet,
  CalendarClock,
  LogOut,
  User,
  CreditCard,
} from "lucide-react";
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
} from "./item";

/**
 * A highly flexible list item component for building menus, logs, and information displays.
 * Follows the shadcn/ui composition pattern with specialized sub-components.
 */
const meta: Meta<typeof Item> = {
  title: "Design System/UI/Item",
  component: Item,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "muted"],
      description: "The visual style of the item container",
    },
    size: {
      control: "select",
      options: ["default", "sm", "xs"],
      description: "The vertical and internal spacing of the item",
    },
    asChild: {
      control: "boolean",
      description:
        "Whether to render the item as a child component (e.g., an <a> tag)",
    },
  },
  args: {
    variant: "default",
    size: "default",
    asChild: false,
  },
};

export default meta;
type Story = StoryObj<typeof Item>;

/**
 * The basic building block of a list, showing a title and optional description.
 */
export const Default: Story = {
  render: (args) => (
    <Item {...args} className="max-w-md">
      <ItemContent>
        <ItemTitle>Basic Item Title</ItemTitle>
        <ItemDescription>A brief description of this item.</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

/**
 * A vertical collection of items, commonly used for settings or navigation menus.
 */
export const ListGroup: Story = {
  render: (args) => (
    <ItemGroup {...args} className="max-w-md">
      <Item>
        <ItemMedia variant="icon">
          <User className="size-4" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Profile Settings</ItemTitle>
          <ItemDescription>Update your personal information</ItemDescription>
        </ItemContent>
        <ItemActions>
          <ChevronRight className="size-4 text-muted-foreground" />
        </ItemActions>
      </Item>

      <ItemSeparator />

      <Item>
        <ItemMedia variant="icon">
          <CreditCard className="size-4" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Subscription</ItemTitle>
          <ItemDescription>Manage your premium plan</ItemDescription>
        </ItemContent>
        <ItemActions>
          <ChevronRight className="size-4 text-muted-foreground" />
        </ItemActions>
      </Item>

      <ItemSeparator />

      <Item variant="muted">
        <ItemMedia variant="icon">
          <LogOut className="size-4 text-destructive" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="text-destructive">Log Out</ItemTitle>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
};

/**
 * Demonstrates a complex card-like layout using Header, Media, and Footer components.
 */
export const InformationCard: Story = {
  render: (args) => (
    <Item {...args} variant="outline" className="max-w-md p-4">
      <ItemHeader>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarClock className="size-3.5" />
          <span>Next Cycle Prediction</span>
        </div>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary uppercase tracking-wider">
          Predicted
        </span>
      </ItemHeader>

      <div className="my-4 flex w-full items-start gap-4">
        <ItemMedia
          variant="icon"
          className="rounded-full bg-red-100 p-2.5 dark:bg-red-900/30"
        >
          <Droplet className="size-5 text-red-500" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="text-base">Expected Period</ItemTitle>
          <ItemDescription className="text-sm">
            Based on your previous 28-day cycle, your next period is expected to
            start on
            <span className="font-medium text-foreground ml-1">
              June 14, 2026
            </span>
            .
          </ItemDescription>
        </ItemContent>
      </div>

      <ItemFooter className="border-t pt-3">
        <p className="text-[10px] text-muted-foreground uppercase tracking-tight">
          Confidence: 94%
        </p>
        <button className="text-xs font-medium text-primary hover:underline">
          View Details
        </button>
      </ItemFooter>
    </Item>
  ),
};

/**
 * Demonstrates the different visual styles available for the item container.
 */
export const VariantShowcase: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-muted-foreground uppercase">
          Default
        </h4>
        <Item variant="default">
          <ItemContent>
            <ItemTitle>Default Item</ItemTitle>
          </ItemContent>
        </Item>
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-medium text-muted-foreground uppercase">
          Outline
        </h4>
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>Outline Item</ItemTitle>
          </ItemContent>
        </Item>
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-medium text-muted-foreground uppercase">
          Muted
        </h4>
        <Item variant="muted">
          <ItemContent>
            <ItemTitle>Muted Item</ItemTitle>
          </ItemContent>
        </Item>
      </div>
    </div>
  ),
};
