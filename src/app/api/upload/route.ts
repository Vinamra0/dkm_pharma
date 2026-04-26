import { NextRequest, NextResponse } from 'next/server';

// This route proxies upload requests to the backend.
// The backend (Render) handles storage; Vercel's filesystem is read-only.
export async function POST(request: NextRequest) {
    const backendBase = (process.env.NEXT_PUBLIC_API_BASE || process.env.BACKEND_PROXY_TARGET || 'http://localhost:3001').replace(/\/$/, '');
    const targetUrl = `${backendBase}/api/upload`;

    try {
        const body = await request.formData();
        const response = await fetch(targetUrl, {
            method: 'POST',
            body,
        });
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
            const data = await response.json();
            return NextResponse.json(data, { status: response.status });
        }
        const text = await response.text();
        return new NextResponse(text, { status: response.status });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to upload file';
        console.error('Upload proxy error:', error);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

