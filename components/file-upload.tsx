'use client'

import * as React from 'react'
import { useState, useRef, useCallback } from 'react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type UploadState = 'idle' | 'selected' | 'uploading' | 'success'

interface FileInfo {
  name: string
  size: number
  type: string
}

const ACCEPTED_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'application/pdf',
  'application/x-figma',
  'image/fig',
]

const ACCEPTED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.pdf', '.fig']

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function FileIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

export function FileUpload() {
  const [uploadState, setUploadState] = useState<UploadState>('idle')
  const [file, setFile] = useState<FileInfo | null>(null)
  const [progress, setProgress] = useState(0)
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const isValidFile = useCallback((file: File): boolean => {
    const extension = '.' + file.name.split('.').pop()?.toLowerCase()
    return (
      ACCEPTED_TYPES.includes(file.type) ||
      ACCEPTED_EXTENSIONS.includes(extension)
    )
  }, [])

  const handleFile = useCallback(
    (selectedFile: File) => {
      setError(null)

      if (!isValidFile(selectedFile)) {
        setError('Please upload a PNG, JPG, PDF, or Figma file')
        return
      }

      setFile({
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
      })
      setUploadState('selected')
    },
    [isValidFile]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile) {
        handleFile(droppedFile)
      }
    },
    [handleFile]
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0]
      if (selectedFile) {
        handleFile(selectedFile)
      }
    },
    [handleFile]
  )

  const handleUpload = useCallback(() => {
    setUploadState('uploading')
    setProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploadState('success')
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 200)
  }, [])

  const handleReset = useCallback(() => {
    setUploadState('idle')
    setFile(null)
    setProgress(0)
    setError(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }, [])

  const handleClick = useCallback(() => {
    inputRef.current?.click()
  }, [])

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        ref={inputRef}
        type="file"
        accept=".png,.jpg,.jpeg,.pdf,.fig"
        onChange={handleInputChange}
        className="hidden"
        aria-label="File upload input"
      />

      {/* Idle State - Drop Zone */}
      {uploadState === 'idle' && (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'relative cursor-pointer rounded-lg border-2 border-dashed p-8 transition-all duration-200',
            'hover:border-primary hover:bg-primary/5',
            isDragOver
              ? 'border-primary bg-primary/10 scale-[1.02]'
              : 'border-muted-foreground/30 bg-background'
          )}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleClick()
            }
          }}
          aria-label="Upload file drop zone"
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <div
              className={cn(
                'rounded-full p-4 transition-colors',
                isDragOver ? 'bg-primary/20' : 'bg-muted'
              )}
            >
              <UploadIcon
                className={cn(
                  'size-8 transition-colors',
                  isDragOver ? 'text-primary' : 'text-muted-foreground'
                )}
              />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                Drop your file here, or{' '}
                <span className="text-primary">browse</span>
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, PDF, or Figma exports
              </p>
            </div>
          </div>

          {error && (
            <p className="mt-4 text-sm text-destructive text-center">{error}</p>
          )}
        </div>
      )}

      {/* Selected State - File Preview */}
      {uploadState === 'selected' && file && (
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 rounded-lg bg-primary/10 p-3">
              <FileIcon className="size-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {file.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(file.size)}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleReset}
              aria-label="Remove file"
            >
              <XIcon className="size-4" />
            </Button>
          </div>

          <div className="mt-4 flex gap-2">
            <Button onClick={handleUpload} className="flex-1">
              Upload File
            </Button>
            <Button variant="outline" onClick={handleReset}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Uploading State - Progress Bar */}
      {uploadState === 'uploading' && file && (
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 rounded-lg bg-primary/10 p-3">
              <FileIcon className="size-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {file.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(file.size)}
              </p>
            </div>
            <span className="text-sm font-medium text-primary">
              {Math.min(Math.round(progress), 100)}%
            </span>
          </div>

          <div className="mt-4">
            <Progress
              value={Math.min(progress, 100)}
              className="h-2 transition-all duration-300"
            />
            <p className="mt-2 text-xs text-muted-foreground text-center">
              Uploading...
            </p>
          </div>
        </div>
      )}

      {/* Success State */}
      {uploadState === 'success' && (
        <div className="rounded-lg border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/50 p-6 shadow-sm">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="rounded-full bg-green-100 dark:bg-green-900/50 p-3 animate-in zoom-in-50 duration-300">
              <CheckCircleIcon className="size-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-green-700 dark:text-green-300">
                Upload complete!
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-2 justify-center">
                <span className="inline-block size-1.5 rounded-full bg-green-500 animate-pulse" />
                Analyzing your design...
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="mt-2"
            >
              Upload Another
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
