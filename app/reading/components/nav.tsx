"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "READING", href: "/reading" },
  { label: "LISTENING", href: "/listening" },
  { label: "WRITING", href: "/writing" },
  { label: "SPEAKING", href: "/speaking" },
  { label: "PROFILE", href: "/profile" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className=" w-full flex flex-col md:flex-row justify-center border-b pb-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href 
              ? "border-2 border-primary text-primary"
              : "text-muted-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}