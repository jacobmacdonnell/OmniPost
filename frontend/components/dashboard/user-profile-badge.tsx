"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, UserCircle, LogOut } from "lucide-react"

export default function UserProfileBadge() {
  // Placeholder user data - replace with actual data from auth context later
  const userName = "User Name"
  const userEmail = "user@example.com"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 p-1 h-auto rounded-full hover:bg-slate-800/80 transition-colors">
          <Avatar className="h-9 w-9 border-2 border-slate-700/80 group-hover:border-slate-600 transition-all">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> {/* Placeholder image */}
            <AvatarFallback className="bg-slate-700 text-slate-300">
              <UserCircle size={24} />
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start mr-2">
            <span className="text-sm text-slate-200 font-semibold leading-none">
              {userName}
            </span>
            <span className="text-xs text-slate-400 leading-none mt-1">
              Pro Plan
            </span>
          </div>
          <ChevronDown size={18} className="text-slate-500 hidden md:inline" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 bg-slate-900/90 border-slate-700 text-slate-200 backdrop-blur-lg shadow-2xl" align="end">
        <DropdownMenuLabel className="font-normal p-3">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold leading-none text-white">{userName}</p>
            <p className="text-xs leading-none text-slate-400">
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-700/80"/>
        <DropdownMenuItem className="hover:bg-slate-800/60 focus:bg-slate-800/60 cursor-pointer p-3 text-sm">
          <UserCircle className="mr-3 h-5 w-5 text-slate-400" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-slate-800/60 focus:bg-slate-800/60 cursor-pointer p-3 text-sm text-red-400 hover:text-red-300 focus:text-red-300">
          <LogOut className="mr-3 h-5 w-5" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 