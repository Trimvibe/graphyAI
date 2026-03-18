import { FileUpload } from '@/components/file-upload'

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">
            Upload Your Design
          </h1>
          <p className="text-sm text-muted-foreground">
            Upload your design files and we&apos;ll analyze them for you
          </p>
        </div>

        <FileUpload />
      </div>
    </main>
  )
}
