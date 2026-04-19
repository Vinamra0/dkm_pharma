import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { UPLOAD_CONFIG } from '@/lib/upload-config'
import { addApplication } from '@/lib/applications-store'

export async function POST(request: NextRequest) {
    try {
        const forwardedFor = request.headers.get('x-forwarded-for')
        const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : null

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
        if (!UPLOAD_CONFIG.allowedCvTypes.includes(file.type as (typeof UPLOAD_CONFIG.allowedCvTypes)[number])) {
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
            ip: clientIp,
        }

        await addApplication(item)

        // Return a local app-relative download URL by default so bytes are served
        // from the same storage this API wrote to. If an explicit CV backend base
        // is configured, keep using that absolute target.
        const explicitCvBase = process.env.NEXT_PUBLIC_CV_BACKEND_BASE || process.env.NEXT_PUBLIC_BACKEND_BASE || ''
        const downloadPath = `/api/admin/applications/cv/${encodeURIComponent(storedName)}`
        const downloadUrl = explicitCvBase
            ? `${explicitCvBase.replace(/\/$/, '')}${downloadPath}`
            : downloadPath

        return NextResponse.json({ success: true, id, cvStoredName: storedName, downloadUrl }, { status: 201 })
    } catch (error) {
        console.error('Application upload error:', error)
        return NextResponse.json({ success: false, message: 'Failed to submit application' }, { status: 500 })
    }
}
