"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, UserCircle, Settings, LogOut, Sparkles, X } from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Generator", icon: LayoutDashboard },
  { href: "/dashboard/account", label: "Account", icon: UserCircle },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

interface SidebarProps {
  isMobileOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isMobileOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Overlay for mobile to close sidebar on click outside */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 sm:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      <aside 
        className={cn(
          "fixed top-0 left-0 z-40 w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          "sm:translate-x-0" // Ensures it's always visible on sm+ screens
        )}
      >
        <div className="h-full px-3 py-4 overflow-y-auto flex flex-col">
          <div className="flex items-center justify-between ps-2.5 mb-10">
            <Link href="/dashboard" className="flex items-center">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-green-400 to-cyan-500 flex items-center justify-center shadow-md mr-3">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
                OmniPost
              </span>
            </Link>
            <Button variant="ghost" size="icon" className="sm:hidden text-slate-400 hover:bg-slate-800/80 hover:text-white" onClick={toggleSidebar}>
              <X size={20}/>
            </Button>
          </div>
          <nav className="space-y-2 flex-grow">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard')
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => { if (isMobileOpen) toggleSidebar() }}
                  className={cn(
                    "flex items-center p-3 rounded-lg text-slate-300 hover:bg-slate-800/60 hover:text-white group relative font-medium",
                    isActive && "bg-gradient-to-r from-green-500/20 to-cyan-500/20 text-white shadow-inner"
                  )}
                >
                  {isActive && <div className="absolute left-0 top-0 h-full w-1 bg-green-400 rounded-r-full"></div>}
                  <item.icon
                    className={cn(
                      "w-5 h-5 text-slate-400 transition duration-75 group-hover:text-white",
                      isActive && "text-green-300"
                    )}
                  />
                  <span className="ms-4">{item.label}</span>
                </Link>
              )
            })}
          </nav>
          <div className="mt-auto">
            <Button variant="ghost" className="w-full justify-start text-slate-400 hover:bg-slate-800/60 hover:text-white p-3 font-medium">
              <LogOut className="w-5 h-5 mr-4 text-slate-500" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
} 