"use client"

import { useState, useCallback, useRef } from "react"
import { Cloud, FileText, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface UploadZoneProps {
  onAnalyze: (file: File) => Promise<void>
}

type UploadState = "idle" | "selected" | "uploading" | "analyzing" | "error"

interface SelectedFile {
  file: File
  preview?: string
}

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg", "application/pdf"]
const ACCEPTED_EXTENSIONS = [".png", ".jpg", ".jpeg", ".pdf"]

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export function UploadZone({ onAnalyze }: UploadZoneProps) {
  const [state, setState] = useState<UploadState>("idle")
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): boolean => {
    const extension = "." + file.name.split(".").pop()?.toLowerCase()
    const isValidType =
      ACCEPTED_TYPES.includes(file.type) || ACCEPTED_EXTENSIONS.includes(extension)
    const isValidSize = file.size <= 25 * 1024 * 1024

    if (!isValidType) {
      setError("Please upload a PNG, JPG, or PDF file")
      setState("error")
      return false
    }
    if (!isValidSize) {
      setError("File size must be less than 25MB")
      setState("error")
      return false
    }
    return true
  }

  const handleFile = useCallback((file: File) => {
    setError(null)
    if (!validateFile(file)) return

    const preview = file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : undefined
    setSelectedFile({ file, preview })
    setState("selected")
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const handleUpload = async () => {
    if (!selectedFile) return

    setState("uploading")
    setProgress(0)
    setError(null)

    // Simulate 2s upload with animated progress
    const duration = 2000
    const interval = 50
    const steps = duration / interval
    let currentStep = 0

    const progressInterval = setInterval(() => {
      currentStep++
      const newProgress = Math.min((currentStep / steps) * 100, 100)
      setProgress(newProgress)

      if (currentStep >= steps) {
        clearInterval(progressInterval)
      }
    }, interval)

    // Wait for the simulated upload to complete
    await new Promise((resolve) => setTimeout(resolve, duration))
    clearInterval(progressInterval)
    setProgress(100)

    // Transition to analyzing state
    setState("analyzing")

    try {
      await onAnalyze(selectedFile.file)
    } catch {
      setError("Upload failed. Please try again.")
      setState("error")
    }
  }

  const handleReset = () => {
    if (selectedFile?.preview) {
      URL.revokeObjectURL(selectedFile.preview)
    }
    setSelectedFile(null)
    setState("idle")
    setProgress(0)
    setError(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  const canClickToUpload = state === "idle" || state === "error"

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-charcoal-900">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-4 sm:px-8 border-b border-charcoal-800">
        <h1 className="text-lg sm:text-xl font-semibold text-foreground pl-12 lg:pl-0">
          New Submission
        </h1>
        <div className="flex items-center gap-2 sm:gap-4">
          <Badge
            variant="secondary"
            className="bg-brand/20 text-brand text-xs font-bold uppercase tracking-wider"
          >
            Draft Mode
          </Badge>
          <Button
            onClick={handleUpload}
            disabled={state !== "selected"}
            className="bg-brand hover:bg-brand-dark text-primary-foreground text-xs sm:text-sm"
          >
            <span className="hidden sm:inline">Get Instant Feedback</span>
            <span className="sm:hidden">Analyze</span>
          </Button>
        </div>
      </header>

      {/* Upload Area */}
      <div className="flex-1 p-4 sm:p-8 lg:p-12 overflow-y-auto flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full">
          {/* Drop Zone */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => canClickToUpload && inputRef.current?.click()}
            onKeyDown={(e) =>
              e.key === "Enter" && canClickToUpload && inputRef.current?.click()
            }
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={cn(
              "relative group border-2 border-dashed rounded-2xl transition-all duration-300 flex flex-col items-center justify-center py-16 sm:py-24 px-6 sm:px-12",
              canClickToUpload && "cursor-pointer",
              isDragging
                ? "border-brand bg-brand/10"
                : state === "error"
                  ? "border-destructive/60 bg-destructive/5"
                  : "border-brand/40 hover:border-brand bg-charcoal-800/50"
            )}
            aria-label="Upload design file"
          >
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPTED_EXTENSIONS.join(",")}
              onChange={handleInputChange}
              className="hidden"
              aria-hidden="true"
            />

            {/* Idle State */}
            {state === "idle" && (
              <>
                <div className="mb-6 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Cloud className="h-8 w-8 sm:h-10 sm:w-10 text-brand" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 text-center">
                  Drop your design here
                </h2>
                <p className="text-muted-foreground text-center max-w-sm text-sm sm:text-base">
                  Support for PNG, JPG, and PDF files. Click to browse your local
                  files.
                </p>
                <div className="absolute bottom-4 right-4 text-xs text-muted-foreground font-mono">
                  MAX SIZE: 25MB
                </div>
              </>
            )}

            {/* Error State */}
            {state === "error" && (
              <>
                <div className="mb-6 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-destructive/10 flex items-center justify-center">
                  <X className="h-8 w-8 sm:h-10 sm:w-10 text-destructive" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-destructive mb-2 text-center">
                  Upload Error
                </h2>
                <p className="text-destructive text-center max-w-sm text-sm sm:text-base mb-4">
                  {error}
                </p>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleReset()
                  }}
                  className="border-destructive/40 text-destructive hover:bg-destructive/10"
                >
                  Try Again
                </Button>
              </>
            )}

            {/* Selected / Uploading / Analyzing States */}
            {(state === "selected" ||
              state === "uploading" ||
              state === "analyzing") &&
              selectedFile && (
                <div className="w-full max-w-md">
                  {/* File Preview Card */}
                  <div className="flex items-center gap-4 p-4 bg-charcoal-700 rounded-xl">
                    {selectedFile.preview ? (
                      <img
                        src={selectedFile.preview}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-charcoal-600 rounded-lg flex items-center justify-center">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {selectedFile.file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(selectedFile.file.size)}
                      </p>
                    </div>
                    {state === "selected" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleReset()
                        }}
                        className="text-muted-foreground hover:text-foreground"
                        aria-label="Remove file"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    )}
                  </div>

                  {/* Uploading Progress */}
                  {state === "uploading" && (
                    <div className="mt-4 space-y-2">
                      <Progress value={progress} className="h-2" />
                      <p className="text-xs text-muted-foreground text-center">
                        {Math.round(progress)}% uploaded
                      </p>
                    </div>
                  )}

                  {/* Analyzing State */}
                  {state === "analyzing" && (
                    <div className="mt-6 flex flex-col items-center gap-3">
                      <Loader2 className="h-8 w-8 text-brand animate-spin" />
                      <p className="text-sm font-medium text-foreground">
                        Analyzing your design...
                      </p>
                      <p className="text-xs text-muted-foreground">
                        This may take a few moments
                      </p>
                    </div>
                  )}
                </div>
              )}
          </div>

          {/* Quick Tips */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <Card className="bg-charcoal-800 border-charcoal-700">
              <CardContent className="p-4">
                <h4 className="text-xs font-bold text-brand uppercase mb-2">
                  Pro Tip
                </h4>
                <p className="text-sm text-muted-foreground">
                  High-resolution exports lead to more accurate typography
                  analysis.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-charcoal-800 border-charcoal-700">
              <CardContent className="p-4">
                <h4 className="text-xs font-bold text-brand uppercase mb-2">
                  Accessibility
                </h4>
                <p className="text-sm text-muted-foreground">
                  We check color contrast ratios automatically against WCAG
                  guidelines.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-charcoal-800 border-charcoal-700">
              <CardContent className="p-4">
                <h4 className="text-xs font-bold text-brand uppercase mb-2">
                  Layout
                </h4>
                <p className="text-sm text-muted-foreground">
                  Our AI identifies spacing inconsistencies across your grid
                  system.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
