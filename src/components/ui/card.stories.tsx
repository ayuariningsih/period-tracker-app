import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "./card";
import { Button } from "./button";
import { MoreVertical, Share2, Bell } from "lucide-react";

/**
 * A flexible container for grouping related content and actions.
 * Cards are highly customizable and support headers, footers, titles, and actions.
 */
const meta: Meta<typeof Card> = {
  title: "Design System/UI/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
      description: "The padding size of the card content",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the root container",
    },
  },
  args: {
    size: "default",
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

/**
 * Basic card containing only simple content.
 */
export const Basic: Story = {
  render: (args) => (
    <Card {...args} className="max-w-md">
      <CardContent>
        <p className="text-muted-foreground">
          This is a basic card with only content. It uses the default padding
          and styling provided by the Card component.
        </p>
      </CardContent>
    </Card>
  ),
};

/**
 * Card featuring a header with a title and description.
 */
export const WithHeader: Story = {
  render: (args) => (
    <Card {...args} className="max-w-md">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          This is a brief description explaining the card's purpose.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Main content area for the card details and information.</p>
      </CardContent>
    </Card>
  ),
};

/**
 * Full composition including header, action button, content, and footer.
 */
export const FullComposition: Story = {
  render: (args) => (
    <Card {...args} className="max-w-md">
      <CardHeader>
        <CardAction>
          <Button variant="ghost" size="icon-sm">
            <MoreVertical className="size-4" />
          </Button>
        </CardAction>
        <CardTitle>Project Status</CardTitle>
        <CardDescription>Updated 2 hours ago</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>Your weekly summary is ready to review.</p>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-primary" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline" size="sm">
          View Report
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon-xs">
            <Share2 className="size-3.5" />
          </Button>
          <Button variant="ghost" size="icon-xs">
            <Bell className="size-3.5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  ),
};

/**
 * Small size variant for compact layouts.
 */
export const SmallSize: Story = {
  args: {
    size: "sm",
  },
  render: (args) => (
    <Card {...args} className="max-w-xs">
      <CardHeader>
        <CardTitle>Compact Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs">
          This card uses the 'sm' size variant, which reduces the internal
          spacing.
        </p>
      </CardContent>
    </Card>
  ),
};

/**
 * Example demonstrating an image integrated into the card structure.
 * The card automatically handles border rounding for images at the top or bottom.
 */
export const WithImage: Story = {
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <img
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
        alt="Abstract background"
        className="aspect-video object-cover"
      />
      <CardHeader>
        <CardTitle>Visual Content</CardTitle>
        <CardDescription>Cards can host images seamlessly.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          The first child image automatically gets top-rounded corners to match
          the card.
        </p>
      </CardContent>
    </Card>
  ),
};

/**
 * Custom styling example using Tailwind classes.
 */
export const CustomStyling: Story = {
  render: (args) => (
    <Card
      {...args}
      className="max-w-md border-primary/20 bg-primary/5 shadow-lg"
    >
      <CardHeader>
        <CardTitle className="text-primary font-bold">Featured Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm italic">
          You can apply custom classes to any subcomponent to match specific
          design requirements.
        </p>
      </CardContent>
      <CardFooter className="bg-primary/10 border-t-primary/20">
        <Button className="w-full">Get Started</Button>
      </CardFooter>
    </Card>
  ),
};
