import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Header() {
  return (
    <Tabs defaultValue="today">
      <TabsList variant="line">
        <TabsTrigger value="yesterday">Yesterday</TabsTrigger>
        <TabsTrigger value="today">Today</TabsTrigger>
        <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
