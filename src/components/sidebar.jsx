"use client"

import logo from "@/public/logo.avif";
import Image from "next/image";
import { Pencil, Inbox, FolderOpen, House, Contact } from "lucide-react";
import { NavMain } from "@/components/sidebar/nav-collapsible";
import { NavProjects } from "@/components/sidebar/nav-items";
import { NavUser } from "@/components/sidebar/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

const data = {
  home: {
    name: "Tableau de bord",
    url: "/",
    icon: House,
  },
  collapsible: [
    {
      title: "Candidatures",
      icon: FolderOpen,
      items: [
        {
          title: "Formations",
          url: "/candidatures/formations",
        },
        {
          title: "Stages",
          url: "/candidatures/stages",
        },
        {
          title: "Interventions",
          url: "/candidatures/interventions",
        },
      ],
    },
    {
      title: "Gestion",
      icon: Pencil,
      items: [
        {
          title: "Formations",
          url: "/gestion/formations",
        },
        {
          title: "Stages",
          url: "/gestion/stages",
        },
      ],
    }
  ],
  items: [
    {
      name: "Demandes de contact",
      url: "/demandes-contact",
      icon: Contact,
    },
    {
      name: "Base d'emails",
      url: "/emails",
      icon: Inbox,
    }
  ],
  user: {
    name: "Stéphane Gaudard",
    email: "contact@aleozen.fr",
    avatar: "/",
    url: "/profil"
  },
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className={"flex items-center justify-center"}>
            <Image src={logo} alt="Logo" width={200} height={50} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <NavMain items={data.collapsible} home={data.home} />
            <NavProjects items={data.items} />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
