"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { UploadZone } from "@/components/upload-zone"
import { FeedbackPanel } from "@/components/feedback-panel"
import type { DesignFeedback } from "@/lib/analyzeDesign"

export default function Page() {
  const [feedback, setFeedback] = useState<DesignFeedback | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = async (file: File, designId?: string) => {
    if (!designId) {
      console.error("No design ID provided from upload")
      return
    }

    setIsAnalyzing(true)
    setFeedback(null)

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ design_id: designId }),
      })

      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}))
        console.error('Analysis API error:', errorBody)
        throw new Error(errorBody.error || `Analysis failed (HTTP ${res.status})`)
      }

      const data = await res.json()
      setFeedback(data)
    } catch (err) {
      console.error("Failed to analyze design:", err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="h-screen flex overflow-hidden bg-charcoal-900 text-foreground">
      <Sidebar />
      <UploadZone onAnalyze={handleAnalyze} />
      <FeedbackPanel feedback={feedback} isLoading={isAnalyzing} />
    </div>
  )
}
