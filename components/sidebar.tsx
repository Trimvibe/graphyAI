"use client"

import { useState } from "react"
import { Upload, LayoutGrid, Clock, Settings, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NavItem {
  icon: React.ReactNode
  label: string
  href: string
  active?: boolean
}

const navItems: NavItem[] = [
  { icon: <Upload className="h-5 w-5" />, label: "Upload", href: "/dashboard", active: true },
  { icon: <LayoutGrid className="h-5 w-5" />, label: "My Designs", href: "/dashboard/designs" },
  { icon: <Clock className="h-5 w-5" />, label: "Feedback History", href: "/dashboard/history" },
  { icon: <Settings className="h-5 w-5" />, label: "Settings", href: "/dashboard/settings" },
]

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden text-foreground"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
      >
        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "w-64 bg-charcoal-800 border-r border-charcoal-700 flex flex-col h-full",
          "fixed inset-y-0 left-0 z-40 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
            <svg
              className="h-5 w-5 text-primary-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">DesignCritiq</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 mt-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-3 rounded-xl transition-all duration-200",
                item.active
                  ? "bg-brand/10 text-brand"
                  : "text-muted-foreground hover:text-foreground hover:bg-charcoal-700"
              )}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 bg-charcoal-700/30 border-t border-charcoal-700">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-charcoal-600 border-2 border-brand overflow-hidden">
              <img
                alt="User Avatar"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgsgxhbfi6L5-IgT4O5zM7L8Zojh-czaFsTA-GtTSEXt1btmNrqCHsbNdxJdb_F1QlkOztf5hfq-1CRO5dkDo-lHoUhgHePYK4zuGQQ0tyiuqcB_VvqZKb_E5giPu6kf5MJDBskR0YtsBFjhD_-inQuMp25o1LbKTibVYERKMnyUlya2qw7XhBmWV1NOSawb7nLH1ag09RqGIfEsGAHYZCGSiCuAQ7vpSmqfjm_ODpga0uOYC-kM6hzaGdkXg7blpZ1-nLpy5gkpE"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-foreground">John Doe</p>
              <p className="text-xs text-muted-foreground">Pro Designer</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
