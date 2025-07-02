'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Home, Search, MessageCircle, User, Settings, ChevronDown } from 'lucide-react';


// Define the types for the NavBar component's props
const NavBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLoggedIn , setIsLoggedIn] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const showNav = pathname !== "/Login" && pathname !== "/Register";
  if(!showNav) return null
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
 
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  // Toggle profile dropdown
  const toggleProfileDropdown = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setIsProfileDropdownOpen((prev) => !prev);
  };

  // Handle logout action
  const handleLogout = () => {
    console.log("Logging out...");
    setIsProfileDropdownOpen(false); // Close dropdown immediately
    // In a real application, you would handle actual logout logic here (e.g., clear tokens, redirect)
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
            <span className="text-sm font-bold text-white">S</span>
          </div>
          <span className="hidden bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-xl font-bold text-transparent sm:inline-block">
            SoCiesta
          </span>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="relative mx-8 hidden flex-1 md:flex max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black" />
          <input
            type="text"
            placeholder="Search people, posts, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border-0 bg-gray-100 py-2 pl-10 pr-4 text-black focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        {/* Navigation Icons */}
        <div className="flex items-center space-x-2">
          {/* Mobile Search Button */}
          <button className="rounded-md p-2 transition-colors hover:bg-gray-100 md:hidden">
            <Search className="h-5 w-5" />
          </button>

          {/* Home Link */}
          <Link href="/" className="relative rounded-md p-2 transition-colors hover:bg-gray-100">
            <Home color="black" className="h-5 w-5" />
          </Link>

          {/* Messages Link */}
          <Link href="/messages" className="relative rounded-md p-2 transition-colors hover:bg-gray-100">
            <MessageCircle color="black" className="h-5 w-5" />
          </Link>

          {/* Notifications Link */}
          <Link href="/notifications" className="relative rounded-md p-2 transition-colors hover:bg-gray-100">
            <Bell color="black" className="h-5 w-5" />
          </Link>

          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}> {/* Attach ref to the parent div */}
            <button
              onClick={toggleProfileDropdown}
              className="flex items-center space-x-1 rounded-full p-1 transition-colors hover:bg-gray-100"
            >
              <img
                src="https://github.com/shadcn.png"
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>

            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-lg border bg-white py-1 text-black shadow-lg z-50">
                {isLoggedIn ? (
                  <>
                    {/* User is logged in */}
                    <div className="border-b px-4 py-3">
                      {/* You can add user info here if available, e.g., user.name */}
                      <span className="text-sm font-semibold">John Doe</span>
                      <p className="text-xs text-gray-500">johndoe@example.com</p>
                    </div>
                    <Link href="/user-profile" className="flex w-full items-center px-4 py-2 text-sm transition-colors hover:bg-gray-50">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                    <Link href="/settings" className="flex w-full items-center px-4 py-2 text-sm transition-colors hover:bg-gray-50">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 transition-colors hover:bg-gray-50"
                    >
                      <span>Log out</span>
                    </button>
                  </>
                ) : (
                  <>
                    {/* User is not logged in */}
                    <Link href="/login" className="flex w-full items-center px-4 py-2 text-sm transition-colors hover:bg-gray-50">
                      <span>Log In</span>
                    </Link>
                    <Link href="/register" className="flex w-full items-center px-4 py-2 text-sm transition-colors hover:bg-gray-50">
                      <span>Sign Up</span>
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;