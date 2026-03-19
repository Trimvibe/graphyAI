const fs = require('fs')
const path = require('path')

async function test() {
  const filePath = path.join(__dirname, 'public', 'test-design.png')
  const fileBuffer = fs.readFileSync(filePath)
  const blob = new Blob([fileBuffer], { type: 'image/png' })

  const formData = new FormData()
  formData.append('file', blob, 'test-design.png')

  console.log('Testing /api/upload ...')
  const uploadRes = await fetch('http://localhost:3000/api/upload', {
    method: 'POST',
    body: formData,
  })

  const uploadText = await uploadRes.text()
  console.log(`Upload status: ${uploadRes.status}`)
  console.log(`Upload body: ${uploadText}`)

  if (uploadRes.ok) {
    const uploadData = JSON.parse(uploadText)
    const designId = uploadData.design_id

    console.log(`\nTesting /api/analyze with design_id: ${designId} ...`)
    const analyzeRes = await fetch('http://localhost:3000/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ design_id: designId }),
    })

    const analyzeText = await analyzeRes.text()
    console.log(`Analyze status: ${analyzeRes.status}`)
    console.log(`Analyze body (first 800 chars): ${analyzeText.slice(0, 800)}`)
  }
}

test().catch(console.error)
