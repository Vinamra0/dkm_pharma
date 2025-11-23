import { NextResponse } from 'next/server'
import { verifyToken } from './lib/auth'

export async function middleware(request) {
    const path = request.nextUrl.pathname

    // Protect /admin routes
    if (path.startsWith('/admin')) {
        const token = request.cookies.get('admin_token')?.value
        const verified = token && (await verifyToken(token))

        if (!verified) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*'],
}
