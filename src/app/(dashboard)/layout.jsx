import '@/styles/globals.css'
import { AppSidebar } from '@/components/sidebar';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Aléozen | Tableau de bord</title>
      </head>
      <body className='overflow-x-hidden'>
        <SidebarProvider className='flex w-screen'>
          <AppSidebar />
          <SidebarInset className="flex-1 overflow-auto">{children}</SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
