'use client'
import React, { useState, FC, ReactNode } from 'react'
import {
  MenuIcon,
  XIcon,
  HomeIcon,
  InfoIcon,
  SettingsIcon,
  PhoneIcon,
} from 'lucide-react'

export default function Navbar(){
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-600">Brand</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              href="#"
              icon={<HomeIcon size={18} />}
              text="Home"
              active
            />
            <NavLink href="#" icon={<InfoIcon size={18} />} text="About" />
            <NavLink
              href="#"
              icon={<SettingsIcon size={18} />}
              text="Services"
            />
            <NavLink href="#" icon={<PhoneIcon size={18} />} text="Contact" />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-2 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              <MobileNavLink
                href="#"
                icon={<HomeIcon size={18} />}
                text="Home"
                active
              />
              <MobileNavLink
                href="#"
                icon={<InfoIcon size={18} />}
                text="About"
              />
              <MobileNavLink
                href="#"
                icon={<SettingsIcon size={18} />}
                text="Services"
              />
              <MobileNavLink
                href="#"
                icon={<PhoneIcon size={18} />}
                text="Contact"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors w-full mt-2">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

interface NavLinkProps {
  href: string
  icon: ReactNode
  text: string
  active?: boolean
}

const NavLink: FC<NavLinkProps> = ({ href, icon, text, active = false }) => {
  return (
    <a
      href={href}
      className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
        active ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
      }`}
    >
      {icon}
      <span>{text}</span>
    </a>
  )
}

const MobileNavLink: FC<NavLinkProps> = ({
  href,
  icon,
  text,
  active = false,
}) => {
  return (
    <a
      href={href}
      className={`flex items-center space-x-2 p-2 rounded-md ${
        active
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
      }`}
    >
      {icon}
      <span>{text}</span>
    </a>
  )
}
