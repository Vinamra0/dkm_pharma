import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request, { params }) {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(params.id),
            },
        })

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 })
        }

        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching product' }, { status: 500 })
    }
}

export async function PUT(request, { params }) {
    try {
        const body = await request.json()
        const product = await prisma.product.update({
            where: {
                id: parseInt(params.id),
            },
            data: body,
        })
        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json({ error: 'Error updating product' }, { status: 500 })
    }
}

export async function DELETE(request, { params }) {
    try {
        await prisma.product.delete({
            where: {
                id: parseInt(params.id),
            },
        })
        return NextResponse.json({ message: 'Product deleted' })
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting product' }, { status: 500 })
    }
}
