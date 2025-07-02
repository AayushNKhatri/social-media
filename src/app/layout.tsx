'use client'; // This layout is a Client Component

import Navbar from '@/Component/navbar'; // Ensure Navbar itself is a Client Component
import './globals.css'; // Global styles
import { usePathname } from 'next/navigation'; // Hook for client-side path


export default function RootLayout({
  children,
}: {
  children: React.ReactNode; // Type definition for children prop
}) {
  const pathname = usePathname(); // Get the current pathname

  // Determine if the Navbar should be shown
  // Navbar is hidden for /Login and /Register routes
  const showNav = pathname !== "/Login" && pathname !== "/Register";

  return (
    <html lang="en" className='bg-white text-black min-h-screen'>
      <body>
        {/* Conditionally render the Navbar */}
      
        {showNav && (
          <Navbar/>
        )}
        {/* Render the page content */}
        {children}
      
      </body>
    </html>
  );
}