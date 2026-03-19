import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

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
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: `You are an expert graphic designer and design critic. Analyze the provided design image and return ONLY a valid JSON object with this exact structure:
{
  "score": number (0-100 overall design quality),
  "issues": [
    {
      "category": string (e.g. Typography, Color, Spacing, Hierarchy, Contrast),
      "severity": "critical" | "warning" | "suggestion",
      "description": string (what is wrong),
      "fix": string (exactly how to fix it)
    }
  ]
}
Be specific, actionable, and professional. Return only JSON, no other text.`,
      },
      {
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: {
              url: imageUrl,
            },
          },
        ],
      },
    ],
  })

  const content = response.choices[0]?.message?.content

  if (!content) {
    throw new Error('Failed to generate analysis from OpenAI')
  }

  try {
    const parsed: DesignFeedback = JSON.parse(content)
    return parsed
  } catch (error) {
    console.error('Failed to parse OpenAI JSON response:', content)
    throw new Error('Invalid JSON received from OpenAI')
  }
}
