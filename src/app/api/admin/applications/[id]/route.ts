import { NextRequest, NextResponse } from 'next/server'
import { getApplicationById, deleteApplicationById } from '@/lib/applications-store'

function checkAuth(req: NextRequest) {
    const adminToken = process.env.ADMIN_TOKEN
    if (!adminToken) return true
    const h = req.headers.get('authorization') || ''
    if (!h.startsWith('Bearer ')) return false
    return h.replace('Bearer ', '') === adminToken
}

type RouteContext = {
    params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, context: RouteContext) {
    try {
        if (!checkAuth(request)) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
        const { id } = await context.params
        const item = await getApplicationById(id)
        if (!item) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 })
        return NextResponse.json({ success: true, data: item })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ success: false, message: 'Failed' }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
    try {
        if (!checkAuth(request)) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
        const { id } = await context.params
        const ok = await deleteApplicationById(id)
        if (!ok) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 })
        return NextResponse.json({ success: true })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ success: false, message: 'Failed to delete' }, { status: 500 })
    }
}
