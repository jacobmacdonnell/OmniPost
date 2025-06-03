"use client"

import Sidebar from "./sidebar"
import { ReactNode } from "react"
import UserProfileBadge from "./user-profile-badge"

interface DashboardLayoutProps {
  children: ReactNode
  // We can add a prop for the page title to be displayed in the top bar
  pageTitle?: string 
}

export default function DashboardLayout({ children, pageTitle = "Dashboard" }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />
      <main className="flex-1 sm:ml-64 transition-all">
        {/* Top bar within the main content area */}
        <header className="sticky top-0 z-30 bg-slate-950/75 backdrop-blur-lg border-b border-slate-800">
          <div className="px-6 py-4 h-16 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-slate-100">{pageTitle}</h1>
            {/* User profile/actions can go here later */}
            <div>
              <UserProfileBadge />
            </div>
          </div>
        </header>
        
        {/* Page content rendered here */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
} 