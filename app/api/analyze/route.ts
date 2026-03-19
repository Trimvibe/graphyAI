import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { analyzeDesign } from '@/lib/analyzeDesign'
import { generateVariants } from '@/lib/generateVariants'

export async function POST(request: Request) {
  try {
    const { design_id } = await request.json()

    if (!design_id) {
      return NextResponse.json({ error: 'design_id is required' }, { status: 400 })
    }

    // 1. Authenticate user
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Fetch the design from Supabase to get the Cloudinary URL
    const { data: design, error: designError } = await supabase
      .from('designs')
      .select('s3_url')
      .eq('id', design_id)
      .eq('user_id', user.id) // Ensure the user actually owns this design
      .single()

    if (designError || !design) {
      console.error('Fetch design error:', designError)
      return NextResponse.json({ error: 'Design not found or access denied.' }, { status: 404 })
    }

    if (!design.s3_url) {
      return NextResponse.json({ error: 'Design URL not found.' }, { status: 400 })
    }

    // 3. Call the OpenAI GPT-4o Vision wrapper
    let feedback
    try {
      feedback = await analyzeDesign(design.s3_url)
    } catch (aiError: any) {
      console.error('AI Analysis failed:', aiError)
      return NextResponse.json({ error: 'Failed to analyze design with AI.' }, { status: 500 })
    }

    // 4. Generate visual variants with Replicate using the issues found
    let generatedImages: string[] = []
    try {
      generatedImages = await generateVariants(design.s3_url, feedback.issues)
    } catch (genError) {
      console.error('Variant generation failed:', genError)
      // Non-fatal, proceed with analysis feedback
    }

    // 5. Save the feedback results into the Supabase 'feedback' table
    const { data: savedFeedback, error: feedbackError } = await supabase
      .from('feedback')
      .insert({
        design_id,
        score: feedback.score,
        issues: feedback.issues,
        generated_images: generatedImages,
        status: 'completed'
      })
      .select('*')
      .single()

    if (feedbackError || !savedFeedback) {
      console.error('Failed to save feedback:', feedbackError)
      // We still return the feedback so the user gets it, even if saving failed.
      // But ideally we'd log this heavily.
    }

    // 6. Return the JSON payload
    return NextResponse.json({
      ...feedback,
      generated_images: generatedImages,
    }, { status: 200 })

  } catch (err: any) {
    console.error('Unhandled analysis error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
