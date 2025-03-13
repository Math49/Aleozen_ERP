'use client';

import { usePathname } from 'next/navigation';
import Sidebar from "@/components/sidebar";
import "@/style/global.css";

export default function Layout({ children }) {
  const pathname = usePathname();
  if (pathname.startsWith('/login') || pathname === '/404') {
    return children;
  }

  return (
    <html lang="en">
      <body>
        <Sidebar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
