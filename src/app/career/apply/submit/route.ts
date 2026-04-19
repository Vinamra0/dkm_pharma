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
        const stdCode = String(formData.get('stdCode') ?? '+977')
        const phoneRaw = String(formData.get('phone') ?? '')
        const education = String(formData.get('education') ?? '')
        const experience = String(formData.get('experience') ?? '')
        const location = String(formData.get('location') ?? '')
        const coverLetter = String(formData.get('coverLetter') ?? '')
        const jobId = String(formData.get('jobId') ?? '')
        const file = formData.get('cv') as File | null

        if (!name || !email || !jobId) {
            return NextResponse.redirect(new URL('/career', request.url), 303)
        }

        if (!file) {
            return NextResponse.redirect(new URL(`/career/apply/${encodeURIComponent(jobId)}`, request.url), 303)
        }

        if (!UPLOAD_CONFIG.allowedCvTypes.includes(file.type as (typeof UPLOAD_CONFIG.allowedCvTypes)[number])) {
            return NextResponse.redirect(new URL(`/career/apply/${encodeURIComponent(jobId)}`, request.url), 303)
        }

        if (file.size > UPLOAD_CONFIG.maxCvFileSize) {
            return NextResponse.redirect(new URL(`/career/apply/${encodeURIComponent(jobId)}`, request.url), 303)
        }

        const storedName = UPLOAD_CONFIG.generateFileName(file.name, 'applications')
        const destPath = join(process.cwd(), 'storage', 'cvs', storedName)
        const bytes = await file.arrayBuffer()
        await writeFile(destPath, Buffer.from(bytes))

        const id = crypto.randomUUID()
        const appliedAt = new Date().toISOString()
        const phone = phoneRaw ? `${stdCode}-${phoneRaw}` : null

        await addApplication({
            id,
            name,
            email,
            phone,
            education: education || null,
            experience: experience || null,
            location: location || null,
            coverLetter: coverLetter || null,
            jobId,
            cvOriginalName: file.name,
            cvStoredName: storedName,
            cvMimeType: file.type,
            cvSize: file.size,
            appliedAt,
            ip: clientIp,
        })

        const redirectUrl = new URL(`/career/apply/${encodeURIComponent(jobId)}?submitted=1`, request.url)
        return NextResponse.redirect(redirectUrl, 303)
    } catch (error) {
        console.error('Career page application submit failed:', error)
        return NextResponse.redirect(new URL('/career', request.url), 303)
    }
}
