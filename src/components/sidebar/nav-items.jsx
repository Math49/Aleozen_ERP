import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import Link from "next/link";
import Image from "next/image";

export function NavProjects({ items }) {
  return (
    <>
      {items.map((item) => (
        <SidebarMenuItem key={item.name}>
          <SidebarMenuButton asChild>
            <Link href={item.url} >
              <div className="flex items-center">
                <item.icon className="mr-2" />
                <span>{item.name}</span>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
}
