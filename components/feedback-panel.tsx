"use client"

import { useState } from "react"
import { Play, Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { FeedbackCard, exampleFeedbackData } from "@/components/feedback-card"

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
          "w-96 bg-charcoal-800 border-l border-charcoal-700 flex flex-col overflow-hidden",
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

        {/* Feedback Cards List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {exampleFeedbackData.map((cardData) => (
            <FeedbackCard key={cardData.id} data={cardData} />
          ))}
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
