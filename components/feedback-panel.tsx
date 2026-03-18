"use client"

import { useState } from "react"
import { Play, Zap, Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface FeedbackItem {
  id: string
  type: "typography" | "color" | "spacing"
  message: React.ReactNode
  timestamp: string
}

const feedbackItems: FeedbackItem[] = [
  {
    id: "1",
    type: "typography",
    message: (
      <>
        The heading font size seems slightly too large for mobile viewports. Consider reducing it by{" "}
        <span className="text-blue-400 font-bold">4px</span> for better balance.
      </>
    ),
    timestamp: "Just now",
  },
  {
    id: "2",
    type: "color",
    message: (
      <>
        Low contrast detected on secondary buttons. The text{" "}
        <span className="text-pink-400">#A3A3A3</span> against background{" "}
        <span className="text-pink-400">#1E1E21</span> fails AA standards.
      </>
    ),
    timestamp: "2 mins ago",
  },
  {
    id: "3",
    type: "spacing",
    message: (
      <>
        Inconsistent padding in your card components. Left padding is{" "}
        <span className="text-yellow-400">24px</span> while right is{" "}
        <span className="text-yellow-400">20px</span>.
      </>
    ),
    timestamp: "5 mins ago",
  },
]

const typeStyles: Record<string, { border: string; bg: string; text: string }> = {
  typography: {
    border: "border-l-blue-500",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
  },
  color: {
    border: "border-l-pink-500",
    bg: "bg-pink-500/10",
    text: "text-pink-400",
  },
  spacing: {
    border: "border-l-yellow-500",
    bg: "bg-yellow-500/10",
    text: "text-yellow-400",
  },
}

export function FeedbackPanel() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="secondary"
        size="sm"
        className="fixed bottom-4 right-4 z-50 xl:hidden bg-brand text-primary-foreground hover:bg-brand-dark"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close feedback panel" : "Open feedback panel"}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        <span className="ml-2">{isOpen ? "Close" : "Feedback"}</span>
      </Button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <aside
        className={cn(
          "w-80 bg-charcoal-800 border-l border-charcoal-700 flex flex-col overflow-hidden",
          "fixed inset-y-0 right-0 z-40 transform transition-transform duration-200 ease-in-out xl:relative xl:translate-x-0",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-charcoal-700">
          <div className="flex items-center gap-2">
            <Play className="h-5 w-5 text-brand" fill="currentColor" />
            <h3 className="text-lg font-bold text-foreground">AI Feedback</h3>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Real-time analysis based on design principles
          </p>
        </div>

        {/* Feedback List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {feedbackItems.map((item) => {
            const styles = typeStyles[item.type]
            return (
              <div
                key={item.id}
                className={cn(
                  "bg-charcoal-700 p-4 rounded-xl border-l-4 shadow-lg",
                  styles.border
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-[10px] font-bold uppercase",
                      styles.bg,
                      styles.text
                    )}
                  >
                    {item.type}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">{item.timestamp}</span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{item.message}</p>
              </div>
            )
          })}

          {/* Empty State */}
          <div className="border border-charcoal-700 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center">
            <div className="text-charcoal-600 mb-2">
              <Zap className="h-8 w-8 mx-auto" />
            </div>
            <p className="text-xs text-muted-foreground">
              Upload a new version to refresh analysis
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-charcoal-900 border-t border-charcoal-700">
          <Button
            variant="secondary"
            className="w-full bg-charcoal-700 hover:bg-charcoal-600 text-foreground text-xs font-bold uppercase tracking-widest"
          >
            <span>Export Report</span>
            <Download className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </aside>
    </>
  )
}
