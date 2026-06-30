import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "./sidebar";
import {
  Calendar,
  Home,
  Inbox,
  Plus,
  Search,
  Settings,
  Trash2,
  User,
} from "lucide-react";
import { TooltipProvider } from "./tooltip";

/**
 * A comprehensive sidebar component for navigation and app structure.
 * Built with Radix UI primitives and styled with Tailwind CSS.
 */
const meta: Meta<typeof Sidebar> = {
  title: "Design System/UI/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    side: {
      control: "select",
      options: ["left", "right"],
      description: "Side of the screen where the sidebar appears",
    },
    variant: {
      control: "select",
      options: ["sidebar", "floating", "inset"],
      description: "Visual variant of the sidebar",
    },
    collapsible: {
      control: "select",
      options: ["offcanvas", "icon", "none"],
      description: "Collapsible behavior of the sidebar",
    },
  },
  args: {
    side: "left",
    variant: "sidebar",
    collapsible: "offcanvas",
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

const SidebarDemo = ({
  defaultOpen = true,
  ...args
}: {
  defaultOpen?: boolean;
} & React.ComponentProps<typeof Sidebar>) => {
  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <Sidebar {...args}>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2 py-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-accent">
                <Calendar className="h-5 w-5 text-sidebar-accent-foreground" />
              </div>
              <span className="text-lg font-semibold text-sidebar-foreground">
                Period Tracker
              </span>
            </div>
            <SidebarInput
              placeholder="Search..."
              prefix={<Search className="h-4 w-4 text-sidebar-foreground/50" />}
            />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive tooltip="Home">
                      <a href="#">
                        <Home />
                        <span>Home</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Inbox">
                      <a href="#">
                        <Inbox />
                        <span>Inbox</span>
                        <SidebarMenuBadge>3</SidebarMenuBadge>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Calendar">
                      <a href="#">
                        <Calendar />
                        <span>Calendar</span>
                      </a>
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <a href="#">
                            <span>This Month</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <a href="#">
                            <span>Next Month</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Other</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Settings">
                      <a href="#">
                        <Settings />
                        <span>Settings</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Profile">
                      <a href="#">
                        <User />
                        <span>Profile</span>
                      </a>
                    </SidebarMenuButton>
                    <SidebarMenuAction showOnHover>
                      <Trash2 className="h-4 w-4" />
                    </SidebarMenuAction>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Plus />
                  <span>Add Item</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="text-sm font-medium">Main Content</div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-6">
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-semibold mb-2">Content Area</h2>
              <p className="text-muted-foreground">
                The sidebar is fully functional and responsive. Try toggling it
                with the trigger button or using the keyboard shortcut (⌘/Ctrl +
                B).
              </p>
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
};

/**
 * The default sidebar state, fully expanded with all navigation items.
 */
export const Default: Story = {
  render: (args) => <SidebarDemo {...args} />,
};

/**
 * Sidebar in collapsed (icon-only) state, demonstrating compact layout.
 */
export const Collapsed: Story = {
  render: (args) => <SidebarDemo {...args} defaultOpen={false} />,
};

/**
 * Sidebar with active navigation item highlighting the currently selected route.
 */
export const WithActiveItem: Story = {
  render: (args) => <SidebarDemo {...args} />,
};

/**
 * Sidebar demonstrating floating variant styling.
 */
export const FloatingVariant: Story = {
  render: (args) => <SidebarDemo {...args} variant="floating" />,
};

/**
 * Sidebar demonstrating inset variant styling.
 */
export const InsetVariant: Story = {
  render: (args) => <SidebarDemo {...args} variant="inset" />,
};

/**
 * Sidebar with icon-only collapsible behavior.
 */
export const IconCollapsible: Story = {
  render: (args) => <SidebarDemo {...args} collapsible="icon" />,
};

/**
 * Sidebar without collapsible functionality (always expanded).
 */
export const NonCollapsible: Story = {
  render: (args) => <SidebarDemo {...args} collapsible="none" />,
};

/**
 * Sidebar positioned on the right side of the screen.
 */
export const RightSide: Story = {
  render: (args) => <SidebarDemo {...args} side="right" />,
};

/**
 * Sidebar demonstrating loading states with skeletons.
 */
export const LoadingState: Story = {
  render: (args) => (
    <TooltipProvider>
      <SidebarProvider>
        <Sidebar {...args}>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2 py-1">
              <div className="h-8 w-8 rounded-md bg-sidebar-accent" />
              <div className="h-5 w-24 rounded bg-sidebar-accent" />
            </div>
            <SidebarInput disabled placeholder="Search..." />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuSkeleton showIcon />
                  <SidebarMenuSkeleton showIcon />
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Other</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuSkeleton showIcon />
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuSkeleton showIcon />
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-6">
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="h-6 w-48 rounded bg-muted mb-2" />
              <div className="h-4 w-full rounded bg-muted" />
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  ),
};

/**
 * Sidebar with long navigation item text that triggers truncation.
 */
export const LongTextTruncation: Story = {
  render: (args) => (
    <TooltipProvider>
      <SidebarProvider>
        <Sidebar {...args}>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2 py-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-accent">
                <Calendar className="h-5 w-5 text-sidebar-accent-foreground" />
              </div>
              <span className="text-lg font-semibold text-sidebar-foreground">
                Period Tracker
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      tooltip="This is a really long navigation item that should truncate"
                    >
                      <a href="#">
                        <Home />
                        <span>
                          This is a really long navigation item that should
                          truncate
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      tooltip="Another extremely long menu item that demonstrates text truncation behavior"
                    >
                      <a href="#">
                        <Inbox />
                        <span>
                          Another extremely long menu item that demonstrates
                          text truncation behavior
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
          </header>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  ),
};

/**
 * Sidebar with empty navigation groups to test edge case rendering.
 */
export const EmptyNavigation: Story = {
  render: (args) => (
    <TooltipProvider>
      <SidebarProvider>
        <Sidebar {...args}>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2 py-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-accent">
                <Calendar className="h-5 w-5 text-sidebar-accent-foreground" />
              </div>
              <span className="text-lg font-semibold text-sidebar-foreground">
                Period Tracker
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Empty Group</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu />
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Another Empty Group</SidebarGroupLabel>
              <SidebarGroupContent />
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
          </header>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  ),
};
