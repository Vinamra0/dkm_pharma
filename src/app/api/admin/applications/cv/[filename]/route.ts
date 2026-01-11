import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'
import { getApplicationByStoredName, STORAGE_DIR } from '@/lib/applications-store'

function checkAuth(req: NextRequest) {
    const adminToken = process.env.ADMIN_TOKEN
    if (!adminToken) return true
    const h = req.headers.get('authorization') || ''
    if (!h.startsWith('Bearer ')) return false
    return h.replace('Bearer ', '') === adminToken
}

export async function GET(request: NextRequest, context: { params: any }) {
    try {
        if (!checkAuth(request)) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
        // In some Next versions `context.params` may be a Promise — unwrap safely.
        const params = context.params ? await context.params : {}
        const filename = params?.filename
        if (!filename || typeof filename !== 'string' || filename.includes('..') || filename.includes('/')) {
            return NextResponse.json({ success: false, message: 'Invalid filename' }, { status: 400 })
        }

        const app = await getApplicationByStoredName(filename)
        if (!app) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 })

        const filePath = path.join(STORAGE_DIR, filename)
        const buf = await readFile(filePath)

        const headers = new Headers()
        headers.set('Content-Type', app.cvMimeType || 'application/octet-stream')
        headers.set('Content-Disposition', `attachment; filename="${app.cvOriginalName.replace(/"/g, '')}"`)

        return new NextResponse(buf, { status: 200, headers })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ success: false, message: 'Failed to read file' }, { status: 500 })
    }
}
