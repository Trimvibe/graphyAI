"use client"

import { useState } from "react"
import { Play, Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { FeedbackCard, exampleFeedbackData, type FeedbackCardData } from "@/components/feedback-card"
import type { DesignFeedback } from "@/lib/analyzeDesign"
import { Loader2 } from "lucide-react"

interface FeedbackPanelProps {
  feedback?: DesignFeedback | null
  isLoading?: boolean
}

export function FeedbackPanel({ feedback, isLoading }: FeedbackPanelProps) {
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
          {isLoading ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-brand" />
              <p className="text-sm">Analyzing design with AI...</p>
            </div>
          ) : feedback ? (
            // Group issues by category to match the FeedbackCardData structure
            Array.from(new Set(feedback.issues.map((i) => i.category))).map((category, idx) => {
              const categoryIssues = feedback.issues.filter((i) => i.category === category)
              const cardData: FeedbackCardData = {
                id: String(idx),
                category,
                score: feedback.score,
                issues: categoryIssues.map((issue, iIdx) => ({
                  id: `${idx}-${iIdx}`,
                  severity: issue.severity,
                  message: issue.description,
                })),
                howToFix: categoryIssues.map((issue) => issue.fix),
              }
              return <FeedbackCard key={cardData.id} data={cardData} />
            })
          ) : (
            // Default placeholder if no analysis yet
            <div className="opacity-50 pointer-events-none">
              <div className="text-center py-4 mb-2 text-sm text-muted-foreground border-b border-charcoal-700">
                Awaiting your upload...
              </div>
              {exampleFeedbackData.map((cardData) => (
                <div key={cardData.id} className="mb-4">
                  <FeedbackCard data={cardData} />
                </div>
              ))}
            </div>
          )}

          {/* Generated Variants Section */}
          {feedback?.generated_images && feedback.generated_images.length > 0 && (
            <div className="mt-8 pt-6 border-t border-charcoal-700">
              <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
                Generated Variants
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1">
                {feedback.generated_images.map((imgUrl, i) => (
                  <div key={i} className="flex flex-col gap-2 bg-charcoal-800 p-2 rounded-xl border border-charcoal-700">
                    <img 
                      src={imgUrl} 
                      alt={`Variant ${i + 1}`} 
                      className="w-full h-auto aspect-square object-cover rounded-lg"
                    />
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="w-full text-xs font-semibold"
                      asChild
                    >
                      <a href={imgUrl} target="_blank" rel="noreferrer" download>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
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
