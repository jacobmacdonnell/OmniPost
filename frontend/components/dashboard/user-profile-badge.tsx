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
        <Button variant="ghost" className="flex items-center gap-2 p-1 h-auto rounded-full hover:bg-slate-800">
          <Avatar className="h-8 w-8 border-2 border-slate-700">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> {/* Placeholder image */}
            <AvatarFallback className="bg-slate-700 text-slate-300">
              <UserCircle size={20} />
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline text-sm text-slate-200 font-medium">
            {userName}
          </span>
          <ChevronDown size={16} className="text-slate-400 hidden md:inline" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-slate-850 border-slate-700 text-slate-200" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-white">{userName}</p>
            <p className="text-xs leading-none text-slate-400">
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-700"/>
        <DropdownMenuItem className="hover:bg-slate-700/50 focus:bg-slate-700/50 cursor-pointer">
          <UserCircle className="mr-2 h-4 w-4 text-slate-400" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-slate-700/50 focus:bg-slate-700/50 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4 text-slate-400" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 