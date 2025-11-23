import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const dosageForm = searchParams.get('dosageForm')

    const where = {}

    if (category && category !== 'All') {
        where.therapeuticCat = category
    }

    if (dosageForm && dosageForm !== 'All') {
        where.dosageForm = dosageForm
    }

    if (search) {
        where.name = {
            contains: search,
        }
    }

    try {
        const products = await prisma.product.findMany({
            where,
            orderBy: {
                createdAt: 'desc',
            },
        })
        return NextResponse.json(products)
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching products' }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const body = await request.json()
        const product = await prisma.product.create({
            data: body,
        })
        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json({ error: 'Error creating product' }, { status: 500 })
    }
}
