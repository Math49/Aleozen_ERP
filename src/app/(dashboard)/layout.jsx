import '@/styles/globals.css'
import { AppSidebar } from '@/components/sidebar';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Aléozen | Tableau de bord</title>
      </head>
      <body>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            {children}
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
