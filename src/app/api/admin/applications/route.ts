import { NextRequest, NextResponse } from 'next/server'
import { loadApplications } from '@/lib/applications-store'

function checkAuth(req: NextRequest) {
    const adminToken = process.env.ADMIN_TOKEN
    if (!adminToken) return true
    const h = req.headers.get('authorization') || ''
    if (!h.startsWith('Bearer ')) return false
    return h.replace('Bearer ', '') === adminToken
}

export async function GET(request: NextRequest) {
    try {
        if (!checkAuth(request)) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
        const items = await loadApplications()
        return NextResponse.json({ success: true, data: items })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ success: false, message: 'Failed to load applications' }, { status: 500 })
    }
}
