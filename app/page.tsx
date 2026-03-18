"use client"

import { Sidebar } from "@/components/sidebar"
import { UploadZone } from "@/components/upload-zone"
import { FeedbackPanel } from "@/components/feedback-panel"

// Placeholder async function for design analysis
async function analyzeDesign(file: File): Promise<void> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))
  console.log("Analyzing design:", file.name)
  // In a real app, this would upload the file and trigger AI analysis
}

export default function Page() {
  return (
    <div className="h-screen flex overflow-hidden bg-charcoal-900 text-foreground">
      <Sidebar />
      <UploadZone onAnalyze={analyzeDesign} />
      <FeedbackPanel />
    </div>
  )
}
