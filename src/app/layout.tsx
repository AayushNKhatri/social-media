'use client'
import Navbar from '@/Component/navbar';
import './globals.css';
import { usePathname } from 'next/navigation';
export default function RootLayout({
    
  children,
}: {
  children: React.ReactNode;
}) {
    const pathname = usePathname()
    const showNav = pathname !== "/Login" && pathname !== "/Register"
  return (
    <html lang="en">
      <body>
        {showNav && <Navbar/>}
        {children}
      </body>
    </html>
  );
}