import { NextRequest, NextResponse } from 'next/server'

// Legacy redirect-based submit endpoint.
// Proxies multipart form submission to backend and then redirects.
export async function POST(request: NextRequest) {
    const backendBase = (process.env.NEXT_PUBLIC_API_BASE || process.env.BACKEND_PROXY_TARGET || 'http://localhost:3001').replace(/\/$/, '')
    const targetUrl = `${backendBase}/api/applications`

    try {
        const body = await request.formData()
        const jobId = String(body.get('jobId') ?? '')

        const response = await fetch(targetUrl, {
            method: 'POST',
            body,
        })

        if (response.ok) {
            const redirectUrl = new URL(`/career/apply/${encodeURIComponent(jobId || 'open-position')}?submitted=1`, request.url)
            return NextResponse.redirect(redirectUrl, 303)
        }

        const retryUrl = new URL(`/career/apply/${encodeURIComponent(jobId || 'open-position')}?submitted=0`, request.url)
        return NextResponse.redirect(retryUrl, 303)
    } catch (error) {
        console.error('Career page application proxy submit failed:', error)
        return NextResponse.redirect(new URL('/career?submitted=0', request.url), 303)
    }
}
