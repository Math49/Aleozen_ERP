"use client";

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

export function AppNavbar({pageName}) {
  return (
    <header className="flex h-24 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-8">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        <p>{pageName}</p>
      </div>
    </header>
  )
}
