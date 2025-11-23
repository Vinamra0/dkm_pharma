import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(request) {
    try {
        const token = cookies().get('admin_token')?.value
        const payload = await verifyToken(token)

        if (!payload) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { currentPassword, newPassword } = await request.json()

        const admin = await prisma.admin.findUnique({
            where: { id: payload.id },
        })

        if (!admin) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        const isValid = await bcrypt.compare(currentPassword, admin.password)

        if (!isValid) {
            return NextResponse.json({ error: 'Incorrect current password' }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        await prisma.admin.update({
            where: { id: admin.id },
            data: { password: hashedPassword },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
