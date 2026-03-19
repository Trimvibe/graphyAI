import Replicate from 'replicate'
import type { DesignIssue } from '@/lib/analyzeDesign'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

/**
 * Generates 3 variant designs using Replicate Flux model based on feedback issues.
 * @param originalImageUrl The URL of the original uploaded image (currently unused by flux-schnell text-to-image, but kept for future img2img support).
 * @param issues The list of categorized design issues to fix.
 * @returns Array of 3 generated WebP image URLs.
 */
export async function generateVariants(originalImageUrl: string, issues: DesignIssue[]): Promise<string[]> {
  try {
    // 1. Build an enhanced prompt describing the fixed graphic
    let promptStr = 'Redesigned graphic with improved typography, better color contrast, fixed spacing. Professional, clean, modern.'
    
    // Optionally append some context from the actual issues if available
    const criticalIssues = issues.filter(i => i.severity === 'critical' || i.severity === 'warning')
    if (criticalIssues.length > 0) {
      const fixes = criticalIssues.map(i => i.fix).join(', ')
      // Ensure prompt doesn't get ridiculously long, just adding a bit of flavor
      promptStr += ` specifically addressing: ${fixes}`
    }

    // 2. Call Replicate's black-forest-labs/flux-schnell model
    // flux-schnell is extremely fast text-to-image
    const output = await replicate.run(
      'black-forest-labs/flux-schnell',
      {
        input: {
          prompt: promptStr,
          num_outputs: 3,
          output_format: 'webp',
          output_quality: 80,
          aspect_ratio: '1:1',
        },
      }
    )

    // Ensure output is casted properly (Replicate run returns unknown, but for image models it's usually string[])
    // For flux-schnell returning multiple outputs, 'output' is an array of URL strings.
    if (Array.isArray(output)) {
      return output as string[]
    }

    return []
  } catch (error) {
    console.error('Failed to generate variants with Replicate:', error)
    return [] // Return empty array so the main flow doesn't completely crash if variant gen fails
  }
}
