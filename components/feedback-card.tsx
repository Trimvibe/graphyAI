"use client"

import { useState } from "react"
import { ChevronDown, Wrench } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

// Types
export type Severity = "critical" | "warning" | "suggestion"

export interface Issue {
  id: string
  severity: Severity
  message: string
}

export interface FeedbackCardData {
  id: string
  category: string
  score: number
  issues: Issue[]
  howToFix: string[]
}

interface FeedbackCardProps {
  data: FeedbackCardData
}

// Severity badge styles
const severityStyles: Record<Severity, { bg: string; text: string; label: string }> = {
  critical: {
    bg: "bg-red-500/20",
    text: "text-red-400",
    label: "Critical",
  },
  warning: {
    bg: "bg-yellow-500/20",
    text: "text-yellow-400",
    label: "Warning",
  },
  suggestion: {
    bg: "bg-blue-500/20",
    text: "text-blue-400",
    label: "Suggestion",
  },
}

// Score color based on value
function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-400"
  if (score >= 50) return "text-yellow-400"
  return "text-red-400"
}

function getScoreBgColor(score: number): string {
  if (score >= 80) return "bg-green-500/20"
  if (score >= 50) return "bg-yellow-500/20"
  return "bg-red-500/20"
}

export function FeedbackCard({ data }: FeedbackCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const scoreColor = getScoreColor(data.score)
  const scoreBgColor = getScoreBgColor(data.score)

  return (
    <Card className="bg-charcoal-800 border-charcoal-700 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <h3 className="text-base font-semibold text-foreground">{data.category}</h3>
          <div
            className={cn(
              "flex items-center justify-center min-w-[52px] px-2 py-1 rounded-lg font-bold text-sm",
              scoreBgColor,
              scoreColor
            )}
          >
            {data.score}/100
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Issues list */}
        <ul className="space-y-3">
          {data.issues.map((issue) => {
            const styles = severityStyles[issue.severity]
            return (
              <li key={issue.id} className="flex items-start gap-3">
                <Badge
                  variant="secondary"
                  className={cn(
                    "text-[10px] font-bold uppercase shrink-0 mt-0.5",
                    styles.bg,
                    styles.text
                  )}
                >
                  {styles.label}
                </Badge>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {issue.message}
                </p>
              </li>
            )
          })}
        </ul>

        {/* Collapsible How to Fix section */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="flex items-center gap-2 w-full py-2 px-3 rounded-lg bg-charcoal-700 hover:bg-charcoal-600 transition-colors group">
            <Wrench className="h-4 w-4 text-brand" />
            <span className="text-sm font-medium text-foreground">How to fix</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 ml-auto text-muted-foreground transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
            <ul className="mt-3 space-y-2 pl-4 border-l-2 border-brand/30">
              {data.howToFix.map((step, index) => (
                <li
                  key={index}
                  className="text-sm text-muted-foreground leading-relaxed"
                >
                  <span className="text-brand font-medium mr-2">{index + 1}.</span>
                  {step}
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}

// Example data for demonstration
export const exampleFeedbackData: FeedbackCardData[] = [
  {
    id: "1",
    category: "Typography",
    score: 72,
    issues: [
      {
        id: "t1",
        severity: "warning",
        message: "Heading font size (32px) is too large for mobile viewports under 375px width.",
      },
      {
        id: "t2",
        severity: "suggestion",
        message: "Consider increasing line-height from 1.2 to 1.4 for better readability in body text.",
      },
      {
        id: "t3",
        severity: "critical",
        message: "Font weight 300 is too light for body text, causing readability issues.",
      },
    ],
    howToFix: [
      "Use responsive font sizes with clamp() or media queries for headings.",
      "Set line-height to at least 1.4 for paragraphs longer than 2 lines.",
      "Increase body font weight to 400 (regular) for optimal legibility.",
    ],
  },
  {
    id: "2",
    category: "Color Contrast",
    score: 45,
    issues: [
      {
        id: "c1",
        severity: "critical",
        message: "Text color #A3A3A3 on background #1E1E21 has a contrast ratio of 3.8:1, failing WCAG AA (4.5:1 required).",
      },
      {
        id: "c2",
        severity: "critical",
        message: "Button text #666666 on #2A2A2E background fails accessibility standards.",
      },
      {
        id: "c3",
        severity: "warning",
        message: "Link color is not distinguishable from regular text without underline.",
      },
    ],
    howToFix: [
      "Lighten text color to #D1D1D1 or higher for 4.5:1 contrast ratio.",
      "Use #FFFFFF or #E0E0E0 for button text on dark backgrounds.",
      "Add underline or distinct color (like brand color) to links.",
      "Test all color combinations with a contrast checker tool.",
    ],
  },
  {
    id: "3",
    category: "Spacing & Layout",
    score: 88,
    issues: [
      {
        id: "s1",
        severity: "suggestion",
        message: "Card padding is inconsistent: left is 24px while right is 20px.",
      },
      {
        id: "s2",
        severity: "suggestion",
        message: "Consider adding more vertical spacing between sections for visual breathing room.",
      },
    ],
    howToFix: [
      "Standardize card padding to 24px on all sides using a spacing token.",
      "Add 48px or 64px vertical margin between major page sections.",
    ],
  },
]
