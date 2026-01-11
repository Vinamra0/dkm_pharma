import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { UPLOAD_CONFIG } from '@/lib/upload-config'
import { addApplication } from '@/lib/applications-store'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const name = String(formData.get('name') ?? '')
        const email = String(formData.get('email') ?? '')
        const phone = String(formData.get('phone') ?? '')
        const education = String(formData.get('education') ?? '')
        const experience = String(formData.get('experience') ?? '')
        const location = String(formData.get('location') ?? '')
        const coverLetter = String(formData.get('coverLetter') ?? '')
        const jobId = String(formData.get('jobId') ?? '')
        const file = formData.get('cv') as File | null

        if (!name || !email) {
            return NextResponse.json({ success: false, message: 'name and email are required' }, { status: 400 })
        }

        if (!file) {
            return NextResponse.json({ success: false, message: 'cv file is required' }, { status: 400 })
        }

        // Validate file type & size
        if (!UPLOAD_CONFIG.allowedCvTypes.includes(file.type as any)) {
            return NextResponse.json({ success: false, message: 'Invalid CV file type' }, { status: 400 })
        }
        if (file.size > UPLOAD_CONFIG.maxCvFileSize) {
            return NextResponse.json({ success: false, message: 'CV file too large' }, { status: 400 })
        }

        // Generate stored filename
        const storedName = UPLOAD_CONFIG.generateFileName(file.name, 'applications')

        // Destination path (non-public storage)
        const destPath = join(process.cwd(), 'storage', 'cvs', storedName)

        // Save file
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        await writeFile(destPath, buffer)

        // Save metadata
        const id = crypto.randomUUID()
        const appliedAt = new Date().toISOString()
        const item = {
            id,
            name,
            email,
            phone: phone || null,
            education: education || null,
            experience: experience || null,
            location: location || null,
            coverLetter: coverLetter || null,
            jobId: jobId || null,
            cvOriginalName: file.name,
            cvStoredName: storedName,
            cvMimeType: file.type,
            cvSize: file.size,
            appliedAt,
            ip: request.ip || null,
        }

        await addApplication(item)

        // Build an absolute download URL for the stored CV so the frontend can fetch
        // the file from the CV backend. Prefer `NEXT_PUBLIC_CV_BACKEND_BASE` or
        // `NEXT_PUBLIC_BACKEND_BASE`, fall back to localhost:3001 for dev.
        const cvBase =
            process.env.NEXT_PUBLIC_CV_BACKEND_BASE || process.env.NEXT_PUBLIC_BACKEND_BASE || 'http://localhost:3001'
        const downloadUrl = `${cvBase.replace(/\/$/, '')}/api/admin/applications/cv/${encodeURIComponent(storedName)}`

        return NextResponse.json({ success: true, id, cvStoredName: storedName, downloadUrl }, { status: 201 })
    } catch (error) {
        console.error('Application upload error:', error)
        return NextResponse.json({ success: false, message: 'Failed to submit application' }, { status: 500 })
    }
}
