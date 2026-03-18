import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { uploadDesign } from '@/lib/cloudinary'

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export async function POST(request: Request) {
  try {
    // 1. Authenticate user
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    // During local dev, we might not want to perfectly block this if testing without auth
    // But per requirements, this should be tied to user_id.
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // 3. Validate file
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PNG, JPG, and PDF are allowed.' },
        { status: 400 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit.' },
        { status: 400 }
      )
    }

    // 4. Convert to Buffer and upload to Cloudinary
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    let secureUrl: string
    try {
      secureUrl = await uploadDesign(buffer, file.name)
    } catch (uploadError: any) {
      console.error('Cloudinary upload err:', uploadError)
      return NextResponse.json(
        { error: 'Failed to upload to storage provider.' },
        { status: 500 }
      )
    }

    // 5. Save record to Supabase designs table
    const { data: designData, error: dbError } = await supabase
      .from('designs')
      .insert({
        user_id: user.id,
        s3_url: secureUrl, // Storing Cloudinary URL in the s3_url column as per schema
        filename: file.name
      })
      .select('id')
      .single()

    if (dbError || !designData) {
      console.error('Database insert err:', dbError)
      return NextResponse.json(
        { error: 'Failed to record design in database.' },
        { status: 500 }
      )
    }

    // 6. Return the design_id and URL
    return NextResponse.json({ 
      design_id: designData.id, 
      url: secureUrl 
    }, { status: 200 })

  } catch (err: any) {
    console.error('Unhandled upload error:', err)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}
