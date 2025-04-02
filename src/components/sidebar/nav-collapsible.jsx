import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({ items, home }) {
  return (
    <>
      <SidebarMenuItem key={home.name}>
        <SidebarMenuButton asChild>
          <Link href={home.url} >
            <div className="flex items-center">
              <home.icon className="mr-2" />
              <span>{home.name}</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      {items.map((item) => (
        <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
          <SidebarMenuItem>
            {item.items?.length ? (
              <CollapsibleTrigger asChild>
                <SidebarMenuButton asChild>
                  <div className="flex items-center w-full justify-between group cursor-pointer">
                    <div className="flex items-center">
                      <item.icon className="mr-2" />
                      <span>{item.title}</span>
                    </div>
                    <ChevronRight className="transition-transform duration-200 group-data-[state=open]:rotate-90" />
                  </div>
                </SidebarMenuButton>
              </CollapsibleTrigger>
            ) : null}
            
            {item.items?.length ? (
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link href={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            ) : null}
          </SidebarMenuItem>
        </Collapsible>
      ))}
    </>
  );
}