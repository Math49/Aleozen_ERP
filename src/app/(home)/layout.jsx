'use client';

import { usePathname } from 'next/navigation';
import Navbar from "@/components/navbar";
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
        <div>
          <Sidebar />
        </div>
        <div>
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
