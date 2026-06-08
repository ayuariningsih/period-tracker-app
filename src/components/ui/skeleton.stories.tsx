import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./skeleton";

const meta = {
  title: "Design System/UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Basic usage
export const Default: Story = {
  render: () => <Skeleton className="h-4 w-[250px]" />,
};

// 2. Settings Menu Item Loading State
// Mimics the layout of the `<Item>` components we built earlier
export const SettingsRow: Story = {
  render: () => (
    <div className="flex w-full max-w-md items-center gap-4">
      <Skeleton className="size-10 shrink-0 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-[140px]" />
        <Skeleton className="h-3 w-[200px]" />
      </div>
      <Skeleton className="size-4 shrink-0" />
    </div>
  ),
};

// 3. Cycle History Card Loading State
// Prevents layout shift while IndexedDB queries past periods
export const CycleHistoryCard: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4 rounded-xl border p-4">
      {/* Header Area */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-[100px]" />
        <Skeleton className="h-4 w-[60px] rounded-full" />
      </div>

      {/* Content Area */}
      <div className="flex items-start gap-3 mt-2">
        <Skeleton className="size-10 shrink-0 rounded-full" />
        <div className="flex flex-1 flex-col gap-2 pt-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>

      {/* Footer Area */}
      <Skeleton className="mt-2 h-3 w-[120px]" />
    </div>
  ),
};

// 4. Dashboard Insights Loading State
// Mimics the top-level stats shown on the home tab
export const DashboardStats: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-md">
      <div className="flex flex-col gap-2 rounded-xl border p-4">
        <Skeleton className="h-3 w-[80px]" />
        <Skeleton className="h-8 w-[60px]" />
      </div>
      <div className="flex flex-col gap-2 rounded-xl border p-4">
        <Skeleton className="h-3 w-[80px]" />
        <Skeleton className="h-8 w-[60px]" />
      </div>
    </div>
  ),
};
