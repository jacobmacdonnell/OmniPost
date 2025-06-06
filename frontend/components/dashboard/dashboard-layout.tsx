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
    <div className="flex min-h-screen w-full bg-slate-950 text-white">
      <Sidebar isMobileOpen={isMobileSidebarOpen} toggleSidebar={toggleMobileSidebar} />
      <div className="flex flex-col flex-1 sm:ml-64 transition-all duration-300 ease-in-out">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-slate-800 bg-slate-950/75 px-4 sm:px-6 backdrop-blur-lg">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden text-slate-400 hover:bg-slate-800/80 hover:text-white"
              onClick={toggleMobileSidebar}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold text-slate-100">{pageTitle}</h1>
          </div>
          <UserProfileBadge />
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
} 