import type { SidebarContextProps } from "@/components/ui/sidebar";
import { useContext } from "react";

export function useSidebar({
  SidebarContext,
}: {
  SidebarContext: React.Context<SidebarContextProps>;
}) {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}
