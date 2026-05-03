export const runtime = 'nodejs'

import { createClient, createServiceClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Get authenticated user
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse uploaded file
    const formData = await request.formData()
    const file = formData.get('file') as File
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type and size
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. PNG, JPG, PDF only.' }, { status: 400 })
    }
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Max 10MB.' }, { status: 400 })
    }

    // Upload to Supabase Storage
    const serviceClient = await createServiceClient()
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}/${Date.now()}.${fileExt}`
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { error: uploadError } = await serviceClient.storage
      .from('designs')
      .upload(fileName, buffer, { contentType: file.type, upsert: false })

    if (uploadError) {
      throw new Error(`Storage upload failed: ${uploadError.message}`)
    }

    // Get public URL
    const { data: { publicUrl } } = serviceClient.storage
      .from('designs')
      .getPublicUrl(fileName)

    // Save to designs table
    const { data: design, error: dbError } = await serviceClient
      .from('designs')
      .insert({ user_id: user.id, s3_url: publicUrl, filename: file.name })
      .select('id')
      .single()

    if (dbError || !design) {
      throw new Error(`Database insert failed: ${dbError?.message}`)
    }

    return NextResponse.json({ design_id: design.id, url: publicUrl })

  } catch (error: any) {
    console.error('Upload error:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
