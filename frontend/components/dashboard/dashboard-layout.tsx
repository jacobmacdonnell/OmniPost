"use client"

import Sidebar from "./sidebar"
import { ReactNode, useState } from "react"
import UserProfileBadge from "./user-profile-badge"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

interface DashboardLayoutProps {
  children: ReactNode
  // We can add a prop for the page title to be displayed in the top bar
  pageTitle?: string 
}

export default function DashboardLayout({ children, pageTitle = "Dashboard" }: DashboardLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen)
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar isMobileOpen={isMobileSidebarOpen} toggleSidebar={toggleMobileSidebar} />
      <main className="flex-1 sm:ml-64 transition-all">
        {/* Top bar within the main content area */}
        <header className="sticky top-0 z-30 bg-slate-950/75 backdrop-blur-lg border-b border-slate-800">
          <div className="px-4 sm:px-6 py-4 h-16 flex items-center justify-between">
            {/* Hamburger Menu for mobile */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="sm:hidden mr-2 text-slate-300 hover:bg-slate-800 hover:text-white"
              onClick={toggleMobileSidebar}
            >
              <Menu size={24} />
            </Button>
            
            {/* Page Title - ensure it doesn't overlap with hamburger on very small screens if necessary */}
            <h1 className="text-lg sm:text-xl font-semibold text-slate-100 truncate">{pageTitle}</h1>
            
            <div className="ml-auto"> {/* Ensure UserProfileBadge is pushed to the right */}
              <UserProfileBadge />
            </div>
          </div>
        </header>
        
        {/* Page content rendered here */}
        <div className="p-4 sm:p-6">
          {children}
        </div>
      </main>
    </div>
  )
} 