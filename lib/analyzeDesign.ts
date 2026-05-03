export const runtime = 'nodejs'

export async function analyzeDesign(imageUrl: string) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set')

  // Fetch the image
  const imageResponse = await fetch(imageUrl)
  if (!imageResponse.ok) throw new Error('Failed to fetch image: ' + imageResponse.statusText)

  const arrayBuffer = await imageResponse.arrayBuffer()

  // Convert to base64 without Buffer
  const bytes = new Uint8Array(arrayBuffer)
  let binary = ''
  for (let i = 0; i < bytes.length; i += 8192) {
    const chunk = bytes.subarray(i, i + 8192)
    binary += String.fromCharCode(...Array.from(chunk))
  }
  const base64Image = btoa(binary)

  // Detect mime type
  const mimeType = imageUrl.toLowerCase().includes('.png') ? 'image/png' : 'image/jpeg'

  const prompt = `You are a professional graphic designer with 15 years of experience. Analyze this design image carefully.

Return ONLY a valid JSON object. No markdown, no backticks, no explanation. Just raw JSON:
{
  "score": <number>,
  "summary": "<2 sentence overall assessment>",
  "issues": [
    {
      "category": "<e.g. Typography, Color, Spacing, Hierarchy, Contrast>",
      "severity": "<critical | warning | suggestion>",
      "description": "<what is wrong>",
      "fix": "<exactly how to fix it>"
    }
  ]
}`

  // Call Gemini REST API directly - no SDK
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            { inline_data: { mime_type: mimeType, data: base64Image } }
          ]
        }],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 1024,
        }
      })
    }
  )

  if (!response.ok) {
    const err = await response.text()
    throw new Error('Gemini API error: ' + err)
  }

  const data = await response.json()
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
  if (!rawText) throw new Error('Gemini returned empty response')

  console.log('Gemini raw response:', rawText.substring(0, 200))

  // Parse JSON - strip code fences if present
  try {
    return JSON.parse(rawText)
  } catch {
    const cleaned = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim()
    return JSON.parse(cleaned)
  }
}
