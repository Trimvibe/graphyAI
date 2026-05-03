import type { DesignIssue } from '@/lib/analyzeDesign'

export async function generateVariants(originalImageUrl: string, issues: DesignIssue[]): Promise<string[]> {
  try {
    const apiToken = process.env.REPLICATE_API_TOKEN
    if (!apiToken) {
      console.warn('REPLICATE_API_TOKEN not set, skipping variant generation')
      return []
    }

    // Build prompt from issues
    let prompt = 'Redesigned graphic with improved typography, better color contrast, fixed spacing. Professional, clean, modern.'
    const criticalIssues = issues.filter(i => i.severity === 'critical' || i.severity === 'warning')
    if (criticalIssues.length > 0) {
      const fixes = criticalIssues.slice(0, 3).map(i => i.fix).join(', ')
      prompt += ` Specifically: ${fixes}`
    }

    // Step 1: Create prediction via Replicate REST API
    const createResponse = await fetch('https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
        'Prefer': 'wait=30'
      },
      body: JSON.stringify({
        input: {
          prompt,
          num_outputs: 3,
          output_format: 'webp',
          output_quality: 80,
          aspect_ratio: '1:1'
        }
      })
    })

    if (!createResponse.ok) {
      const err = await createResponse.text()
      console.error('Replicate API error:', err)
      return []
    }

    const prediction = await createResponse.json()

    // If already succeeded (Prefer: wait=30 means it waits up to 30s)
    if (prediction.status === 'succeeded' && Array.isArray(prediction.output)) {
      return prediction.output as string[]
    }

    // Step 2: Poll for result if still processing
    const predictionId = prediction.id
    for (let i = 0; i < 30; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000))
      const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
        headers: { 'Authorization': `Bearer ${apiToken}` }
      })
      const result = await pollResponse.json()
      if (result.status === 'succeeded' && Array.isArray(result.output)) {
        return result.output as string[]
      }
      if (result.status === 'failed') {
        console.error('Replicate prediction failed:', result.error)
        return []
      }
    }

    return []
  } catch (error) {
    console.error('generateVariants error:', error)
    return []
  }
}
