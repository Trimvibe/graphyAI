export const runtime = 'nodejs'

import { GoogleGenerativeAI } from '@google/generative-ai'

export interface DesignIssue {
  category: string
  severity: 'critical' | 'warning' | 'suggestion'
  description: string
  fix: string
}

export interface DesignFeedback {
  score: number
  issues: DesignIssue[]
  generated_images?: string[]
}

export async function analyzeDesign(imageUrl: string): Promise<DesignFeedback> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set')
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  // Fetch image from Cloudinary and convert to base64 inline data
  const imageResponse = await fetch(imageUrl)
  if (!imageResponse.ok) {
    throw new Error(`Failed to fetch image from URL: ${imageResponse.status}`)
  }
  const imageBuffer = await imageResponse.arrayBuffer()
  const uint8Array = new Uint8Array(imageBuffer)
  const base64Image = btoa(uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), ''))

  // Detect mime type from the Content-Type header, fallback to image/png
  const contentType = imageResponse.headers.get('content-type') ?? 'image/png'
  const mimeType = contentType.split(';')[0].trim() as 'image/png' | 'image/jpeg' | 'image/webp'

  const prompt = `You are an expert graphic designer and design critic. Analyze this design image and return ONLY a valid JSON object with NO markdown, no backticks, no explanation — just raw JSON in this exact structure:
{
  "score": <number 0-100 representing overall design quality>,
  "issues": [
    {
      "category": "<e.g. Typography, Color, Spacing, Hierarchy, Contrast>",
      "severity": "<critical | warning | suggestion>",
      "description": "<what is wrong>",
      "fix": "<exactly how to fix it>"
    }
  ]
}

Be specific, actionable, and professional. Return only JSON, nothing else.`

  const result = await model.generateContent([
    prompt,
    { inlineData: { data: base64Image, mimeType } },
  ])

  const rawText = result.response.text().trim()
  console.log('Gemini raw response:', rawText.slice(0, 300))

  try {
    return JSON.parse(rawText)
  } catch {
    // Strip markdown code fences if Gemini wrapped the JSON
    const cleaned = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim()
    return JSON.parse(cleaned)
  }
}
